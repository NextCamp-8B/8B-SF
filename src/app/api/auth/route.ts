import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

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
  // port: 465, //구글 포트
  port: 465, //구글 포트
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
export async function POST(request: Request) {
  try {
    const { name, email } = await request.json();
    const token = jwt.sign({ email }, secret, { expiresIn: '30m' });

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
      // from: process.env.GMAIL_USER, // 보내는 이메일
      from: process.env.NAVAER_EMAIL, // 보내는 이메일
      to: email, // 받는 이메일 주소
      subject: `이메일 인증: ${name}님`,
      html: htmlContent,
    });

    return NextResponse.json(
      { message: '이메일 전송 성공', token },
      { status: 200 },
    );
  } catch (error) {
    console.error('이메일 전송 실패:', error);
    return NextResponse.json(
      { message: '이메일 전송 실패', error },
      { status: 500 },
    );
  }
}
