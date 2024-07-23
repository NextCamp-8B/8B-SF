import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export const generateResponse = async (
  userInput: string,
  latestInfo: { stock_name: string; detailed_data: object }[],
) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        // You are a useful stock price helpe
        {
          role: 'system',
          content: `You are a helpful stock market assistant. `,
        },
        {
          role: 'system',
          content: `Here are the latest details for various companies: ${JSON.stringify(
            latestInfo,
          )}. Use this information to answer questions accurately.`,
        },
        {
          role: 'assistant',
          content: `
            항상 답변을 요약해 주세요.
            답변은 400 토큰 이내로 요약해 주세요.
            주식과 관련 없는 질문일 경우, '죄송합니다. 주식과 관련된 질문만 가능합니다.'라고 답변하세요.
            질문과 관련 없는 답변은 하지 마세요.
            반드시 답변을 마침표로 끝내고, 답변의 마지막이 아닌 곳에는 마침표를 사용하지 마세요.
            답변에 '**수익성**' 보다는 '[수익성]' 과 같이 표기해주세요.
            되도록 특수문자는 사용하지 마세요.
            질문에 대한 대답을 몇 가지 예시에 따라 답변 해주세요.
            '회사의 최근 분기 실적을 요약해 주세요.',
            '[회사 이름]의 향후 주식 전망을 요약해 주세요.'
            '[회사 A]와 [회사 B]의 주요 경쟁 요소를 비교해 주세요.
            각 요소에 대해 [회사 A]와 [회사 B]의 장단점을 평가하고, 총점을 제공해 주세요.'
            '[회사 이름]의 최근 배당 정보와 배당 수익률을 알려주세요.
            배당 정책에 대한 간략한 설명도 포함해 주세요.',
            '[회사 이름]의 주요 재무 지표를 분석해 주세요.' 등등의 질문의 예시와 맞는 답변을 해주세요.
            답변에는 절대로 '**', '#' 같은 특수문자를 사용하지 마세요.
            답변은 '[수익성], [투자지수], [성장성], [관심도]' 이 4가지를 기준으로 답변하되, 주어진 ${latestInfo}를 참고하여 답변하세요.
            회사의 긍정적인 정보 하나당 +1점을 추가하세요.
            회사의 부정적인 정보 하나당 -1점을 차감하세요.
            중립적인 정보는 0점으로 계산하세요.
            예로 들어 '[수익성] +x : ' 이런 식의 형태로 답변을 하세요.
            각 항목의 x를 합한 점수를 Score라고 할 때, 답변 맨 처음 총 점수를 '기업 점수: [Score].' 형식으로 제공해 주세요.
            각 항목당 답변은 최대 4줄 이내로 답변하세요.
             `,
        },
        { role: 'user', content: userInput },
      ],
      max_tokens: 400,
      temperature: 0.4,
      top_p: 0.6,
      // 특정 단어 반복 빈도(-2 ~ 2) 높을수록 동일 단어의 반복을 억제
      frequency_penalty: 1,
    });
    return response.choices[0]?.message.content;
  } catch (error) {
    console.error('Error generating response:', error);
    return 'Sorry, I am unable to process your request at the moment.';
  }
};
