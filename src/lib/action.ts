'use server';
import { hash, compare } from 'bcryptjs';
import { redirect } from 'next/navigation';
import supabase from './supabaseClient';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

//이메일 설정
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_KEY,
  },
});

// 이미지 Base64 인코딩 함수
function encodeImageToBase64(filePath: string) {
  const file = fs.readFileSync(filePath);
  return file.toString('base64');
}

// 이메일보내기
export const sendEmail = async (
  prevState: any,
  formData: FormData,
) => {
  try {
    const { name, email, subject } = Object.fromEntries(formData);
    // logo_light 이미지 Base64 인코딩
    const logoPath = path.resolve('../assets/logos/logo_light.svg');
    const logoBase64 = encodeImageToBase64(logoPath);
    const logoDataUri = `data:image/svg+xml;base64,${logoBase64}`;

    // 회원가입 폼 링크
    const signupLink = `http://localhost:.com/signup`;

    const htmlContent = `
    <div style="text-align: center;">
      <img src="${logoDataUri}" alt="Logo" style="width: 200px; height: auto;"/>
      <h1>안녕하세요, ${name}님!</h1>
      <p>이메일 인증을 위해 아래 링크를 클릭해주세요:</p>
      <a href="${signupLink}" style="display: inline-block; padding: 10px 20px; margin-top: 20px; color: white; background-color: #007BFF; text-decoration: none; border-radius: 5px;">이메일 인증하기</a>
    </div>
  `;
    await transporter.sendMail({
      from: process.env.GMAIL_USER, // 보내는 이메일
      to: '받는 이메일 주소', // 받는 이메일
      subject: `이메일 인증: ${name}님`,
      html: htmlContent,
    });

    console.log('이메일 전송 성공');
    return { message: '이메일 전송 성공' };
  } catch (error) {
    console.error(error);
  }
};

// 회원가입
export async function register(formData: FormData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');
  const phoneNumber = formData.get('phone_number');
  const birth = formData.get('birth');
  const nickname = formData.get('nickname');
  console.log('formData', formData);
  if (
    !name ||
    !email ||
    !password ||
    !phoneNumber ||
    !birth ||
    !nickname
  ) {
    console.log('입력값이 부족합니다.');
    return;
  }

  // 이메일로 기존 사용자 확인
  const { data: existingUser, error: findError } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (existingUser) {
    console.log('이미 가입된 회원입니다.');
    return;
  }

  if (findError && findError.code !== 'PGRST120') {
    console.error('사용자 조회 중 오류 발생:', findError.message);
    return;
  }

  // 없는 회원이면 DB넣기
  const hashPassword = await hash(String(password), 10);
  const { error: insertError } = await supabase.from('users').insert({
    name,
    email,
    password: hashPassword,
    phone_number: phoneNumber,
    birth,
    nickname,
  });

  if (insertError) {
    console.error('회원가입 중 오류 발생:', insertError.message);
    return;
  }

  //   redirect('/login');
}

// 로그인
export async function login(formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  if (!email || !password) {
    console.log('입력값이 부족합니다.');
    return;
  }

  // 사용자 조회
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error) {
    console.error('사용자 조회 중 오류 발생:', error.message);
    return;
  }

  // 비밀번호 확인
  const isMatch = await compare(String(password), user.password);

  if (!isMatch) {
    console.log('비밀번호가 일치하지 않습니다.');
    return;
  }

  // 로그인 처리
  //   const { error: signInError } =
  //     await supabase.auth.signInWithPassword({
  //       email,
  //       password,
  //     });

  //   if (signInError) {
  //     console.error('로그인 중 오류 발생:', signInError.message);
  //     return;
  //   }

  redirect('/');
}

// 로그아웃
export async function logOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('로그아웃 중 오류 발생:', error.message);
    return;
  }

  redirect('/login');
}
