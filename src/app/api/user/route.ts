import { NextResponse } from 'next/server';
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

// GET 요청 처리
export async function GET() {
  const { data, error } = await supabase.from('users').select('*');
  console.log('user Get data', data);
  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 },
    );
  }
  return NextResponse.json({ users: data }, { status: 200 });
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

  // 이메일로 기존 사용자 확인
  const { data: existingUser, error: findError } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (existingUser) {
    return NextResponse.json(
      { error: '이미 가입된 회원입니다.' },
      { status: 400 },
    );
  }

  if (findError && findError.code !== 'PGRST120') {
    return NextResponse.json(
      { error: '사용자 조회 중 오류 발생' },
      { status: 500 },
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
