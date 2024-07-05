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

    const response = NextResponse.redirect(
      new URL(
        '/signup?social=true&token=' + token,
        request.nextUrl.origin,
      ),
    );
    response.cookies.set('auth-token', token, {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 30, // 30분
      path: '/signup',
    });
    return response;
  } catch (error) {
    console.error('Invalid token:', error);
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 },
    );
  }
}
