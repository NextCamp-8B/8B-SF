import { createClient } from '@/utils/supabase/server';
import { generateResponse } from '@/utils/openai';
import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(req: Request, res: Response) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('user_id');

  // Supabase 클라이언트 생성
  const supabase = createClient();

  // user_id가 1인 데이터를 created_at 오름차순으로 조회
  const { data: chatbotData, error } = await supabase
    .from('chatbot')
    .select('answer, question')
    .eq('user_id', userId)
    .order('created_at', { ascending: true });

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

  return NextResponse.json({ questions, answers, chat });
}

export async function POST(req: NextRequest) {
  const { userId, message, latestInfo } = await req.json();

  if (!userId || !message) {
    return NextResponse.json(
      { error: 'User ID and message are required' },
      { status: 400 },
    );
  }

  // OpenAI API를 사용하여 질문에 대한 답변 생성
  const aiResponse = await generateResponse(message, latestInfo);

  const answer = aiResponse;
  if (!answer) {
    throw new Error('No response from AI');
  }

  // 생성된 답변을 Supabase의 chatbot 테이블에 저장
  const supabase = createClient();
  const { data, error } = await supabase
    .from('chatbot')
    .insert({ question: message, answer, user_id: userId });

  return NextResponse.json({ data });
}
