import { createClient } from '@/utils/supabase/server';
import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';
import { isMarketOpen } from '@/utils/isMarketOpen';

/**
 * GPT-4 API 키를 사용하여 OpenAI 클라이언트를 초기화합니다.
 */
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * 특정 주식에 대한 AI 보고서를 생성
 * @param stockSymbol - 보고서를 생성할 주식 Symbol
 * @returns - AI가 생성한 요약본과 상세 데이터를 포함한 리포트
 */
export const generateStockReport = async (stockSymbol: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a stock analyst.',
        },
        {
          role: 'user',
          content: `Generate a detailed report for the stock symbol: ${stockSymbol}.`,
        },
        {
          role: 'assistant',
          content: `The report should include a concise summary and detailed data suitable for a radar chart. The summary should be about a paragraph long. The detailed data should be comprehensive and must include detailed explanations for the following fields: stockPrice, investmentIndex, interestLevel, growth, and profitability. Each section should provide an in-depth analysis. Ensure the response includes these sections clearly labeled in strict JSON format. The format should be:

          {
            "summary": "Your concise summary here.",
            "detailedData": {
              "stockPrice": { "currentPrice": "value", "52WeekHigh": "value", "52WeekLow": "value", "analysis": "detailed analysis" },
              "investmentIndex": { "rating": "value", "analysis": "detailed analysis" },
              "interestLevel": { "institutionalOwnership": "value", "retailOwnership": "value", "analysis": "detailed analysis" },
              "growth": { "revenueGrowth": "value", "earningsGrowth": "value", "analysis": "detailed analysis" },
              "profitability": { "profitMargin": "value", "returnOnEquity": "value", "analysis": "detailed analysis" }
            }
          }`,
        },
      ],
      max_tokens: 1500,
      temperature: 0.7,
      top_p: 0.9,
    });

    const fullResponse = response.choices[0]?.message.content;

    if (!fullResponse) {
      throw new Error('No response content');
    }

    const jsonResponseMatch = fullResponse.match(/\{[\s\S]*\}/);
    if (!jsonResponseMatch) {
      throw new Error('Failed to extract JSON from the response');
    }

    const jsonResponse = jsonResponseMatch[0];

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(jsonResponse);
    } catch (error) {
      throw new Error('Failed to parse JSON from the response');
    }

    const { summary, detailedData } = parsedResponse;

    const requiredFields = [
      'stockPrice',
      'investmentIndex',
      'interestLevel',
      'growth',
      'profitability',
    ];

    const missingFields = requiredFields.filter(
      (field) => !detailedData[field],
    );

    if (!summary || !detailedData || missingFields.length > 0) {
      throw new Error(
        `Incomplete response data. Missing fields: ${missingFields.join(
          ', ',
        )}`,
      );
    }

    return { summary, detailedData };
  } catch (error) {
    console.error('Error generating stock report:', error);
    return {
      summary:
        'Sorry, I am unable to process your request at the moment.',
      detailedData: null,
    };
  }
};

/**
 * 리포트를 생성하는 API 핸들러
 * @returns AI가 생성한 리포트 응답
 */
export async function POST(req: NextRequest) {
  const { userId, stockSymbol } = await req.json();

  if (!userId || !stockSymbol) {
    return NextResponse.json(
      { error: 'User ID and stock symbol are required' },
      { status: 400 },
    );
  }

  // OpenAI API를 사용하여 리포트 생성
  const aiResponse = await generateStockReport(stockSymbol);
  const { summary, detailedData } = aiResponse;

  if (!summary || !detailedData) {
    return new NextResponse('No response from AI', { status: 500 });
  }

  // 생성된 리포트를 Supabase의 report 테이블에 저장
  const supabase = createClient();
  const { data, error } = await supabase
    .from('stock')
    .update({
      report: summary,
      detailed_data: detailedData,
    })
    .eq('stock_code', stockSymbol)
    .select();

  if (error) {
    console.error('Supabase 오류:', error);
    return new NextResponse('보고서 업데이트에 실패했습니다.', {
      status: 500,
    });
  }

  return NextResponse.json({
    message: '보고서가 성공적으로 업데이트되었습니다.',
    updatedReport: data,
  });
}

/**
 * AI를 사용하여 리포트에서 주가, 투자지수, 관심도, 성장성, 수익성의 퍼센트와 증가 여부를 분석
 * @description
 * - system: 모델의 행동을 설정하고 맥락을 제공
 * - assistant: 시스템의 지침에 따라 분석을 수행, 시스템이 설정한 맥락 내에서 사용자 요청을 처리
 *   - 그렇기에  "Analyze the following stock report..." 내용이 포함
 * - user: 실제 사용자의 입력을 제공 및 분석할 리포트를 전달
 * - N/A: Not Available or Not Applicable 의 약자 (해당 데이터가 제공되지 않거나 의미가 없음)
 * @param report - 분석할 주식 리포트
 * @returns - 각 항목의 퍼센트와 증가 여부를 포함한 JSON
 */
const analyzeReportWithAI = async (report: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an expert financial analyst.',
        },
        {
          role: 'assistant',
          content: `Analyze the following stock report and provide the percentage and trend (true/false for increase/decrease) for the following categories: stockPrice, investmentIndex, interestLevel, growth, and profitability. 
                    Ensure that each category has a percentage and trend. If data for a category is missing or unavailable, provide your best estimate. Format the response as a JSON object. Never include miscellaneous information such as comments in the JSON data format!`,
        },
        {
          role: 'user',
          content: `Report: ${report}`,
        },
      ],
      max_tokens: 1500,
      temperature: 0.7,
      top_p: 0.9,
    });

    const aiResponse =
      response.choices[0]?.message?.content?.trim() as string;

    const jsonStartIndex = aiResponse.indexOf('{');
    const jsonEndIndex = aiResponse.lastIndexOf('}') + 1;
    const jsonResponse = aiResponse.substring(
      jsonStartIndex,
      jsonEndIndex,
    );

    let result;
    try {
      result = JSON.parse(jsonResponse);
    } catch (error) {
      console.error('Failed to parse AI response as JSON:', error);
      return null;
    }
    const categories = [
      'stockPrice',
      'investmentIndex',
      'interestLevel',
      'growth',
      'profitability',
    ];
    const validatedResult: any = {};

    categories.forEach((category) => {
      const { percentage, trend } = result[category];
      const percentageType = typeof percentage;
      const isStr = percentageType === 'string';
      const isNum = percentageType === 'number';

      if (
        result[category] &&
        (isNum || (isStr && percentage.substr(-1) === '%')) &&
        typeof trend === 'boolean'
      ) {
        if (isStr && percentage.substr(-1) === '%') {
          const regex = /[^0-9]/g;
          const number = percentage.replace(regex, '');
          validatedResult[category] = {
            ...result[category],
            percentage: number,
          };
        } else {
          validatedResult[category] = result[category];
        }
      } else {
        validatedResult[category] = {
          percentage: 0,
          trend: false,
        };
      }
    });
    return validatedResult;
  } catch (error) {
    console.error('Error analyzing report with AI:', error);
    return null;
  }
};

/**
 * 리포트에서 퍼센트와 증가 여부를 계산하는 API 핸들러
 * @returns 분석된 퍼센트와 증가 여부를 포함한 JSON 응답
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const stockId = searchParams.get('stockId');

  if (!stockId) {
    return NextResponse.json(
      { error: 'Stock ID is required' },
      { status: 400 },
    );
  }

  const supabase = createClient();

  if (isMarketOpen()) {
    const { data: reportData, error } = await supabase
      .from('stock')
      .select('detailed_data')
      .eq('stock_id', stockId)
      .single();

    if (error || !reportData) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 },
      );
    }

    const report = reportData.detailed_data;

    /** AI를 사용하여 퍼센트와 증가 여부를 분석 */
    const analysisResult = await analyzeReportWithAI(report);

    if (!analysisResult) {
      return NextResponse.json(
        { error: 'Failed to analyze the report' },
        { status: 500 },
      );
    }

    const { error: updateError } = await supabase
      .from('stock')
      .update({ analysis_result: analysisResult })
      .eq('stock_id', stockId);

    if (updateError) {
      return NextResponse.json(
        { error: 'Failed to save analysis result' },
        { status: 500 },
      );
    }

    return NextResponse.json({ analysisResult });
  } else {
    const { data: storedData, error: storedError } = await supabase
      .from('stock')
      .select('analysis_result')
      .eq('stock_id', stockId)
      .single();

    if (storedError || !storedData) {
      return NextResponse.json(
        { error: 'Analysis result not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({
      analysisResult: storedData.analysis_result,
    });
  }
}
