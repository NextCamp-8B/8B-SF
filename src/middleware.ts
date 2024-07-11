import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match } from 'path-to-regexp';
import { auth as getSession } from '@/auth';

// 세션없이 사용가능한 페이지
const publicPages = ['/login', '/signup', '/find'];

// 세션필요 페이지
const protectedPages = [
  '/home',
  '/stock',
  '/search',
  '/user',
  '/news',
];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  //세션이 없는 상태 -> 세션필요 페이지로 동작시
  // login 페이지로 이동
  if (isMatch(pathname, protectedPages)) {
    const session = await getSession();
    // return session
    //   ? NextResponse.next()
    //   : NextResponse.redirect(new URL('/login', request.url));
  }

  // 세션이 있는 상태 -> 회원이 세션불필요 페이지로 동작시
  // home 페이지로 이동
  if (isMatch(pathname, publicPages)) {
    const session = await getSession();

    // return session
    //   ? NextResponse.redirect(new URL('/home', request.url))
    //   : NextResponse.next();
  }
  return NextResponse.next();
}

//유저 경로 체크 함수
function isMatch(pathname: string, urls: string[]) {
  return urls.some((url) => !!match(url)(pathname));
}

// 미들웨어가 적용될 경로를 설정
export const config = {
  matcher: [
    '/home/:path*',
    '/stock/:path*',
    '/search/:path*',
    '/user/:path*',
    '/news/:path*',
    '/login',
    '/signup',
    '/find/:path*',
  ],
};
