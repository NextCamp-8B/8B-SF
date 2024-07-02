import { NextRequest, NextResponse } from 'next/server';
import supabase from '../../../lib/supabaseClient';

export type User = {
  id: number;
  password: string;
  phone_number: string;
  created_at: string;
  birth: string;
  profile_img?: string;
  nickname: string;
  interest_stock?: string;
  updated_at?: string;
  user_id: string;
  email: string;
};

// GET 유저id 중복 처리 확인
export async function GET(request: NextRequest) {
  try {
    const signupId = request.nextUrl.searchParams.get('signupId');

    if (!signupId) {
      return NextResponse.json(
        { error: 'signupId is required' },
        { status: 400 },
      );
    }

    console.log('signupId', signupId);

    const { data, error } = await supabase
      .from('user')
      .select('user_id')
      .eq('user_id', signupId);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 },
      );
    }
    console.log(data, 'data');

    if (data && data.length > 0) {
      return NextResponse.json(
        { message: 'duplicate' },
        { status: 200 },
      );
    }
    return NextResponse.json(
      { message: 'available' },
      { status: 200 },
    );
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json(
      { error: 'Unexpected error occurred' },
      { status: 500 },
    );
  }
}

// POST 요청 처리 - 회원가입
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      email,
      password,
      phoneNumber,
      birth,
      nickname,
      profileImg,
      interestStock,
      name,
    } = body;

    if (!userId || !password || !nickname || !phoneNumber || !birth) {
      return NextResponse.json(
        { error: '입력값이 부족합니다.' },
        { status: 400 },
      );
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          userId,
          name,
          phoneNumber,
          birth,
          profileImg,
          nickname,
          interestStock,
        },
      },
    });
    console.log('data', data);
    if (error) {
      throw error;
    }
    // 응답에 쿠키 삭제 설정 추가
    const response = NextResponse.json(
      { message: '회원가입 성공' },
      { status: 200 },
    );
    response.cookies.set('auth-token', '', {
      path: '/signup',
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    console.error('회원가입 중 오류 발생:', error);
    return NextResponse.json(
      { error: '회원가입 중 오류 발생' },
      { status: 500 },
    );
  }
}
