import { NextRequest, NextResponse } from 'next/server';
import supabase from '../../../lib/supabaseClient';
import bcrypt from 'bcryptjs';

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
  // const url = new URL(request.url);
  // const signupId = url.searchParams.get('signupId');
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
      .from('users')
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
export async function POST(request: Request) {
  const formData = await request.formData();
  const signupId = formData.get('signupId') as string;
  //   const email = formData.get('email') as string;
  const email = 'eqwewq@ewqewq@com';
  const password = formData.get('password') as string;
  const passwordCheck = formData.get('passwordCheck') as string;
  const signupPhone = formData.get('signupPhone') as string;
  const birth = formData.get('birth') as string;
  //   const nickname = formData.get('nickname') as string;

  console.log(formData, 'formdata');

  if (
    !signupId ||
    !password ||
    !passwordCheck ||
    !signupPhone ||
    !birth
  ) {
    return NextResponse.json(
      { error: '입력값이 부족합니다.' },
      { status: 400 },
    );
  }

  // 비밀번호 해시
  const hashPassword = await bcrypt.hash(password, 10);
  const { error: insertError } = await supabase.from('users').insert({
    user_id: signupId,
    email: email,
    password: hashPassword,
    phone_number: signupPhone,
    nickname: 'text1',
    interest_stock: 'Tesla',
    profile_img: 'eqwewqqe/eqwewq.svg',
    birth,
  });

  if (insertError) {
    return NextResponse.json(
      { error: '회원가입 중 오류 발생' },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { message: '회원가입 성공' },
    { status: 200 },
  );
}
