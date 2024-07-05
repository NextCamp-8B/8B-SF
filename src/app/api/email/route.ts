import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import supabase from '@/lib/supabaseClient';
import { checkEmailExists } from '@/utils/supabase/supabaseHelper';

const secret = process.env.JWT_SECRET as string;

// GET 요청 처리
export async function GET() {
  return NextResponse.json('auth api get입니다.', { status: 200 });
}

//이메일 설정
const transporter = nodemailer.createTransport({
  // host: 'smtp.gmail.com',
  host: 'smtp.naver.com',
  secure: true,
  port: 465,
  auth: {
    user: process.env.NAVER_ID,
    pass: process.env.NAVER_PW,
    // user: process.env.GMAIL_USER,
    // pass: process.env.GMAIL_APP_KEY,
  },
});

// 이미지 Base64 인코딩 함수
// function encodeImageToBase64(filePath: string) {
//   const file = fs.readFileSync(filePath);
//   return file.toString('base64');
// }

// POST 요청 처리 - 이메일 인증 링크 전송
export async function POST(
  request: NextRequest,
  // response: NextResponse,
) {
  try {
    const { name, email } = await request.json();

    // 이메일 중복 체크
    // const { data, error } = await supabase
    //   .from('user')
    //   .select('email')
    //   .eq('email', email);
    const data = await checkEmailExists(email);

    // if (error) {
    //   throw new Error('데이터베이스 에러 발생');
    // }

    if (data) {
      return NextResponse.json(
        {
          message:
            '해당 이메일은 이미 사용 중입니다. 다른 이메일을 사용하시거나, 비밀번호 찾기를 이용해 주세요.',
        },
        { status: 409 },
      );
    }

    const token = jwt.sign({ email, name }, secret, {
      expiresIn: '30m',
    });

    // logo_light 이미지 Base64 인코딩
    // const logoPath = path.resolve(
    //   process.cwd(),
    //   'src/assets/logos/logo_light.svg',
    // );
    // const logoBase64 = encodeImageToBase64(logoPath);
    // const logoDataUri = `data:image/svg+xml;base64,${logoBase64}`;

    // 회원가입 폼 링크 (예시)
    const signupLink = `http://localhost:3000/signup?token=${token}`;
    // <img src="${logoDataUri}" alt="Logo" style="width: 200px; height: auto;"/>

    const htmlContent = `
         <div style="text-align: center;">
           <h1>안녕하세요 아잇나우 입니다. </br>  이메일 인증을 위해 아래 링크를 클릭해주세요:</h1>
           <a href="${signupLink}" style="display: inline-block; padding: 10px 20px; margin-top: 20px; color: white; background-color: #007BFF; text-decoration: none; border-radius: 5px;">이메일 인증하기</a>
         </div>
       `;

    await transporter.sendMail({
      from: process.env.NAVAER_EMAIL, // 보내는 이메일
      to: email, // 받는 이메일 주소
      subject: `이메일 인증: ${name}님`,
      html: htmlContent,
    });

    const response = NextResponse.json(
      { message: '이메일 전송 성공', token },
      { status: 200 },
    );

    // 쿠키 설정
    response.cookies.set('auth-token', token, {
      // httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 30, // 30분
      path: '/signup',
    });

    return response;
  } catch (error: any) {
    console.error('이메일 전송 실패:', error);
    return NextResponse.json(
      {
        message:
          '인증 링크 전송에 실패했습니다. 다시 시도하시거나 고객센터에 문의해주세요.',
        error: error.message, // 에러 메시지 포함
      },

      { status: 500 },
    );
  }
}
