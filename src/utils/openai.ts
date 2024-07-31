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
        {
          role: 'system',
          content: `당신은 주식 투자에 도움을 주는 주식 AI 챗봇입니다. `,
        },
        {
          role: 'system',
          content: `다양한 회사의 최신 정보는 다음과 같습니다.: ${JSON.stringify(
            latestInfo,
          )}.이 정보는 참고용으로만 사용하세요. 제공된 데이터에 "N/A"이 포함되어 있거나 불완전한 경우 자신의 지식과 일반적인 시장 동향을 바탕으로 정보에 입각한 응답을 제공하세요. 단순히 정보를 이용할 수 없다고 말하지 마십시오.`,
        },
        {
          role: 'assistant',
          content: `
            항상 답변을 요약해 주세요.
            답변은 600 토큰 이내로 요약해 주세요.
            한 문장당 20토큰 이내로 답변하세요.
            주식과 관련 없는 질문일 경우, '죄송합니다. 해당 질문에 대한 정보가 없습니다. 혹시 다른 도움이 필요한가요?'라고 답변하세요.
            만약 주식용어와 관련된 질문 일 경우에는 해당 용어를 쉽게 설명해 주세요.
            반드시 답변을 마침표로 끝내고, 답변의 마지막이 아닌 곳에는 마침표를 사용하지 마세요.
            답변에 '**수익성**' 보다는 '[수익성]' 과 같이 표기해주세요.
            되도록 특수문자는 사용하지 마세요.
            주어진 정보는 참고만 하세요. 수치나 비율을 제외하고, 정보 내용을 그대로 답변하지 마세요.
            질문에 대한 대답을 몇 가지 예시에 따라 답변 해주세요.
            '회사의 최근 분기 실적을 요약해 주세요.',
            '[회사 이름]의 향후 주식 전망을 요약해 주세요.' 등등의 질문의 예시와 맞는 답변을 해주세요.
            '[회사 A]와 [회사 B]의 주요 경쟁 요소를 비교해 주세요.',
            '각 요소에 대해 [회사 A]와 [회사 B]의 장단점을 평가하고, 총점을 제공해 주세요.'같은 질문이 들어올 경우,
            '[수익성] A점수 : 내용. B점수 : 내용' 이런식의 형태로 답변하세요. 
            답변에는 절대로 '**', '#' 같은 특수문자를 사용하지 마세요.
            답변은 '[수익성], [투자지수], [성장성], [관심도]' 이 4가지를 기준으로 답변하되, 주어진 latestInfo는 참고만 하세요.
            답변 시에 latestInfo에 있는 내용을 그대로 답변하지 마세요. 각 항목의 참고용도로만 사용하고, 답변은 당신의 분석을 통해 답변하세요.
            모호한 표현은 피하고, 가능하다면 수치나 비율을 통해 답변하세요.
            어떤 상황에서도 과도하게 긍정적이거나 부정적인 전망을 피하고, 중립적이고 균형 잡힌 견해를 제시하세요.
            [수익성] (Profitability)의 경우, 동종업계의 회사와 비교하여 0 ~ 100 사이의 점수를 부여하세요.
            [투자지수] (InvestmentIndex)의 경우, 회사의 주가와 현재 시장 조건을 분석하여 0 ~ 100 사이의 점수를 부여하세요.
            [성장성](Growth)의 경우, 현재 주가와 "52WeekHigh", "52WeekLow"를 분석하여 0 ~ 100 사이의 점수를 부여하세요.
            [관심도](InterestLevel)의 경우, 기관 소유권, 개인 투자 등의 비율을 비교하여 0 ~ 100 사이의 점수를 부여하세요.
            각 점수는 최대한 보수적으로 점수를 매기세요.
            '[수익성] x점 : ' 이런 식의 형태로 답변을 하세요.
            각 항목의 x를 합한 점수를 Score라고 할 때, 답변 마지막에 평균 점수를 '기업 점수: [Score의 평균].' 형식으로 제공하고, 종합적인 당신의 한 줄 평가를 제공하세요.
            각 항목당 답변은 최대 4줄 이내로 답변하세요.
             `,
        },
        { role: 'user', content: userInput },
      ],
      max_tokens: 600,
      temperature: 0.3,
      top_p: 0.5,
      // 특정 단어 반복 빈도(-2 ~ 2) 높을수록 동일 단어의 반복을 억제
      frequency_penalty: 1,
    });
    return response.choices[0]?.message.content;
  } catch (error) {
    console.error('Error generating response:', error);
    return 'Sorry, I am unable to process your request at the moment.';
  }
};
