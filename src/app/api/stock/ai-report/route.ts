import { createClient } from '@/utils/supabase/server';
import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

interface DetailedData {
  [key: string]: string; // 미리 정의되지 않은 추가 키 허용
}

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
          content: `Generate a detailed report for the stock symbol: ${stockSymbol}. The report should include a concise summary and detailed data suitable for a radar chart. The summary should be about a paragraph long, and the detailed data should be comprehensive.`,
        },
      ],
      max_tokens: 1500,
      temperature: 0.7,
      top_p: 0.9,
    });

    const fullResponse = response.choices[0]?.message
      .content as string;

    const summaryMatch = fullResponse.match(
      /Summary:\s*([\s\S]*?)(?=\n\nDetailed Data|$)/,
    );
    const detailedDataMatch = fullResponse.match(
      /Detailed Data:\s*([\s\S]*)/,
    );

    if (!summaryMatch || !detailedDataMatch) {
      throw new Error(
        'Failed to extract summary or detailed data from the response',
      );
    }

    /** summaryMatch에서 추출한 첫 번째 그룹을 가져와 공백을 제거한 후 'summary' 변수에 저장 */
    const summary = summaryMatch[1].trim();
    /** detailedDataMatch에서 추출한 첫 번째 그룹을 가져와 공백을 제거한 후 'detailedDataText' 변수에 저장 */
    const detailedDataText = detailedDataMatch[1].trim();
    /** detailedDataText를 줄 단위로 분할(split)하고 각 줄의 공백을 제거(map)하여 'detailedDataLines' 배열에 저장 */
    const detailedDataLines = detailedDataText
      .split('\n')
      .map((line) => line.trim());
    const detailedData: DetailedData = {};

    detailedDataLines.forEach((line) => {
      /** detailedDataLines 배열의 각 줄에 대해 ':'를 기준으로 분할(split)하고 각 부분의 공백을 제거하여(key, value) 배열에 저장 */
      const [key, value] = line.split(':').map((part) => part.trim());
      /** detailedData 객체에 키-값 쌍을 추가합니다. 키는 분할된 줄의 첫 번째 부분, 값은 두 번째 부분 */
      if (key && value) {
        detailedData[key] = value;
      }
    });

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
 * 리포트에서 퍼센트를 계산하는 API 핸들러
 * @returns 계산된 퍼센트 응답
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const stockId = searchParams.get('stockId');

  if (!stockId) {
    return NextResponse.json(
      { error: 'Report ID is required' },
      { status: 400 },
    );
  }

  // Supabase 클라이언트 생성
  const supabase = createClient();

  // 특정 report_id에 대한 리포트를 조회
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

  /** 리포트에서 주가, 투자지수, 관심도, 성장성, 수익성 퍼센트를 계산 */
  const percentages = calculatePercentages(report);

  return NextResponse.json({ percentages });
}

/**
 * 리포트를 분석하여 주가, 투자지수, 관심도, 성장성, 수익성의 퍼센트를 계산하는 함수
 * @description
 * - 특정 키워드의 출현 빈도를 기반으로 점수를 계산
 * - 리포트 내용 분석
 *   - 주가 (Stock Price): 주가에 대한 긍정적, 부정적, 중립적 정보
 *   - 투자지수 (Investment Index): 투자지수에 대한 긍정적, 부정적, 중립적 정보
 *   - 관심도 (Interest Level): 관심도에 대한 긍정적, 부정적, 중립적 정보
 *   - 성장성 (Growth): 성장성에 대한 긍정적, 부정적, 중립적 정보
 *   - 수익성 (Profitability): 수익성에 대한 긍정적, 부정적, 중립적 정보
 * @returns 각 항목에 대한 퍼센트
 */
function calculatePercentages(report: string): {
  [key: string]: number;
} {
  /** 긍정적, 부정적 키워드 */
  const keywords = {
    stockPrice: {
      positive: ['upward', 'increased', 'strong', 'high', 'robust'],
      negative: ['downward', 'declined', 'weak', 'low', 'poor'],
    },
    investmentIndex: {
      positive: [
        'attractive',
        'high',
        'positive',
        'high-value',
        'strong',
      ],
      negative: ['poor', 'low', 'negative', 'unattractive', 'weak'],
    },
    interestLevel: {
      positive: [
        'high demand',
        'popular',
        'increasing',
        'high interest',
        'strong interest',
      ],
      negative: [
        'low demand',
        'unpopular',
        'declining',
        'low interest',
        'weak interest',
      ],
    },
    growth: {
      positive: [
        'growth',
        'expanding',
        'high growth',
        'strong performance',
        'increasing',
      ],
      negative: [
        'stagnant',
        'decline',
        'slow growth',
        'poor performance',
        'reducing',
      ],
    },
    profitability: {
      positive: [
        'high profit',
        'strong margin',
        'high return',
        'excellent profitability',
        'robust',
      ],
      negative: [
        'low profit',
        'weak margin',
        'poor return',
        'low profitability',
        'difficult',
      ],
    },
  };

  /**
   * 긍정적인 정보가 많으면 높은 점수를 부여하고, 부정적인 정보가 많으면 낮은 점수를 부여
   */
  function calculateScore(
    text: string,
    positiveKeywords: string[],
    negativeKeywords: string[],
  ): number {
    let score = 0;
    positiveKeywords.forEach((keyword) => {
      const regex = new RegExp(keyword, 'gi');
      const matches = text.match(regex);
      if (matches) {
        score += matches.length;
      }
    });
    negativeKeywords.forEach((keyword) => {
      const regex = new RegExp(keyword, 'gi');
      const matches = text.match(regex);
      if (matches) {
        score -= matches.length;
      }
    });
    return score;
  }

  // 리포트에서 각 항목의 정보를 추출하고 점수를 계산합니다.
  const stockPriceScore = calculateScore(
    report,
    keywords.stockPrice.positive,
    keywords.stockPrice.negative,
  );
  const investmentIndexScore = calculateScore(
    report,
    keywords.investmentIndex.positive,
    keywords.investmentIndex.negative,
  );
  const interestLevelScore = calculateScore(
    report,
    keywords.interestLevel.positive,
    keywords.interestLevel.negative,
  );
  const growthScore = calculateScore(
    report,
    keywords.growth.positive,
    keywords.growth.negative,
  );
  const profitabilityScore = calculateScore(
    report,
    keywords.profitability.positive,
    keywords.profitability.negative,
  );

  /** 각 항목의 최대 점수 */
  const maxScore = 10;
  /** 각 항목의 퍼센트를 계산 (점수를 100으로 정규화) */
  const normalize = (score: number) =>
    Math.min(Math.max((score / maxScore) * 100, 0), 100);

  return {
    stockPrice: normalize(stockPriceScore),
    investmentIndex: normalize(investmentIndexScore),
    interestLevel: normalize(interestLevelScore),
    growth: normalize(growthScore),
    profitability: normalize(profitabilityScore),
  };
}
