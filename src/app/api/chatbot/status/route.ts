import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const { status, user_id, displayedchat } = await req.json();

  try {
    // 가장 최근 데이터 선택
    const { data: recentData, error: fetchError } = await supabase
      .from('chatbot_ai')
      .select('*')
      .eq('user_id', user_id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    // 상태 업데이트
    const { data, error } = await supabase
      .from('chatbot_ai')
      .update({ status: false })
      .eq('user_id', user_id);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: (error as Error).message,
    });
  }
}
