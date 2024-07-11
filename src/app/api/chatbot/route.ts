import { generateAnswer } from '@/utils/llama';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get('user_id');

  // Supabase 클라이언트 생성
  const supabase = createClient();

  // user_id가 1인 데이터를 created_at 오름차순으로 조회
  const { data: chatbotData, error } = await supabase
    .from('chatbot')
    .select('answer, question')
    .eq('user_id', 1)
    .order('created_at', { ascending: true });

  if (error) {
    // 오류가 발생한 경우 오류 메시지 반환
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  let answers: string[] = [];
  let questions: string[] = [];
  let chat: string[] = [];

  // 데이터가 존재할 경우 처리
  if (chatbotData && chatbotData.length > 0) {
    chatbotData.forEach((row) => {
      if (row.question) {
        questions.push(row.question.trim());
        chat.push(row.question.trim());
      }
      if (row.answer) {
        answers.push(row.answer.trim());
        chat.push(row.answer.trim());
      }
    });
  }

  return new Response(JSON.stringify({ questions, answers, chat }), {
    status: 200,
  });
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  const userId = parseInt(url.searchParams.get('user_id') || '0');
  console.log(typeof userId, userId);
  // 요청의 본문에서 데이터를 읽어옴
  const { question, temperature, top_p, repetition_penalty } =
    await request.json();

  // Llama API를 사용하여 질문에 대한 답변 생성
  const answer = await generateAnswer(question, temperature, top_p);

  // 생성된 답변을 Supabase의 chatbot 테이블에 저장
  const supabase = createClient();
  const { data, error } = await supabase
    .from('chatbot')
    .insert({ question, answer, user_id: userId })
    .eq('user_id', userId);

  if (error) {
    console.error('챗봇 에러:', error.message);
    return new Response(
      JSON.stringify({ error: 'Failed to insert data' }),
      {
        status: 500,
      },
    );
  }

  // 성공적으로 데이터를 저장한 경우
  return new Response(JSON.stringify({ data }), {
    status: 200,
  });
}
