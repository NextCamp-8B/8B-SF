import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import {
  checkEmailExists,
  checkEmailInDeletedUsers,
} from '@/utils/supabase/supabaseHelper';

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
  },
});

// 이미지 Base64 인코딩 함수
// function encodeImageToBase64(filePath: string) {
//   const file = fs.readFileSync(filePath);
//   return file.toString('base64');
// }

// POST 요청 처리 - 이메일 인증 링크 전송
export async function POST(request: NextRequest) {
  try {
    const { name, email, greeting, subject, success, failed } = await request.json();

    // 이메일 중복 체크
    const data = await checkEmailExists(email);

    if (data) {
      return NextResponse.json(
        { message: 'email_in_use',},
        { status: 409 },
      );
    }

    const isDeletedUser = await checkEmailInDeletedUsers(email);

    if (isDeletedUser) {
      return NextResponse.json(
        { message: 'deleted_email',},
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

    // 회원가입 폼 링크
    const currentUrl = new URL(request.url);
    const signupLink = `${currentUrl.origin}/signup?token=${token}`;
    // <img src="${logoDataUri}" alt="Logo" style="width: 200px; height: auto;"/>
    const htmlContent = `
         <div style="text-align: center;">
          <h2>${greeting}</h2>
           <a href="${signupLink}" style="display: inline-block; padding: 10px 20px; margin-top: 20px; color: white; background-color: #007BFF; text-decoration: none; border-radius: 5px;">이메일 인증하기</a>
         </div>
       `;

    await transporter.sendMail({
      from: process.env.NAVAER_EMAIL, // 보내는 이메일
      to: email, // 받는 이메일 주소
      subject: `${subject}`,
      html: htmlContent,
    });

    const response = NextResponse.json(
      { message: success, token },
      { status: 200 },
    );

    // 쿠키 설정
    const locale = request.cookies.get('NEXT_LOCALE')?.value || 'ko';
    response.cookies.set('auth-token', token, {
      maxAge: 60 * 30, // 30분
      path:`/${locale}/signup`,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        message:
          '인증 링크 전송에 실패했습니다. 다시 시도하시거나 고객센터에 문의해주세요.',
        error: error.message,
      },

      { status: 500 },
    );
  }
}
