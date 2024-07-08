import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const { name, phone_number } = await req.json();
    const supabase = createClient();

    // 사용자가  일치하는지 확인
    const { data, error } = await supabase
      .from('user')
      .select('user_id, created_at, provider_account_id')
      .eq('name', name)
      .eq('phone_number', phone_number)
      .single();

    if (error) {
      console.error('Supabase 쿼리 오류:', error.message);
      return NextResponse.json(
        { error: error.message },
        { status: 500 },
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: '일치하는 사용자를 찾을 수 없습니다.' },
        { status: 404 },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
