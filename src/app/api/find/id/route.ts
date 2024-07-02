import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const { name, phone_number } = await req.json();
    const supabase = createClient();

    const { data, error } = await supabase
      .from('users')
      .select('user_id, created_at')
      .eq('name', name)
      .eq('phone_number', phone_number);

    if (error) {
      console.error('Supabase 쿼리 오류:', error.message);
      return NextResponse.json(
        { error: error.message },
        { status: 500 },
      );
    }

    if (data.length === 0) {
      return NextResponse.json(
        { error: '없는 유저입니다.' },
        { status: 404 },
      );
    }

    return NextResponse.json(data[0]);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
