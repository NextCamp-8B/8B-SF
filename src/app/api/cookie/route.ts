import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET as string;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 },
      );
    }

    const decodedToken = jwt.verify(token, secret);

    // 회원가입 폼으로 리다이렉트
    const response = NextResponse.redirect(
      new URL(
        '/signup?social=true&token=' + token,
        request.nextUrl.origin,
      ),
    );
    // 쿠키 설정
    // Todo:
    // 현재 언어설정으로 인해 동적으로 url 이 변경됨 /fr/signup /us/signup 등
    // 이에 대한 auth-token 에 대한 path 처리 필요!
    response.cookies.set('auth-token', token, {
      maxAge: 60 * 30, // 30분
      path: '/',
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 },
    );
  }
}
