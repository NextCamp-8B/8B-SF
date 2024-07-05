import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/lib/supabaseClient'; // Supabase 클라이언트 가져오기
import { getEmailByUserId } from '@/utils/supabase/supabaseHelper';

// POST 요청 처리 - 로그인
export async function POST(request: NextRequest) {
  try {
    const { userId, password } = await request.json();

    // userId로 이메일 조회
    // const { data: userData, error: userError } = await supabase
    //   .from('user')
    //   .select('email')
    //   .eq('user_id', userId)
    //   .single();
    const email = await getEmailByUserId(userId);

    if (!email) {
      return NextResponse.json(
        { error: '유효하지 않은 사용자 ID입니다.' },
        { status: 400 },
      );
    }

    // const email = userData;

    // 이메일로 로그인 시도
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log(data, 'data');
    // const { error } = await supabase.auth.signOut();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 },
      );
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('로그인 중 오류 발생:', error);
    return NextResponse.json(
      { error: '로그인 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
