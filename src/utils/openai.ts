import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export const generateResponse = async (
  userInput: string,
  latestInfo: string,
) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are a useful stock price helper. `,
        },
        {
          role: 'system',
          content: `Here is the latest information about the company: ${latestInfo}`,
        },
        {
          role: 'assistant',
          content: `
            항상 답변을 요약해 주세요.
            답변은 300 토큰 이내로 요약해 주세요.
            질문과 관련 없는 답변은 하지 마세요.
            회사의 긍정적인 정보 하나당 +1점을 추가하세요.
            회사의 부정적인 정보 하나당 -1점을 차감하세요.
            중립적인 정보는 0점으로 계산하세요.
            답변 마지막에 총 점수를 '기업 점수: [Score]' 형식으로 제공해 주세요.
            반드시 답변을 마침표로 끝내고 5줄이 넘지 않도록 요약하세요.
            
             `,
        },
        { role: 'user', content: userInput },
      ],
      max_tokens: 100,
      temperature: 0.1,
      top_p: 0.7,
    });
    return response.choices[0]?.message.content;
  } catch (error) {
    console.error('Error generating response:', error);
    return 'Sorry, I am unable to process your request at the moment.';
  }
};
