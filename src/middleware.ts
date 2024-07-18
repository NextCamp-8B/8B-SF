import { type NextRequest } from 'next/server';
import { auth as getSession } from '@/auth';
import createMiddleware from 'next-intl/middleware';
import { Session } from 'next-auth';

// 국제화 미들웨어 설정
const handleI18nRouting = createMiddleware({
  locales: ['en', 'ko', 'ja', 'zh', 'fr'],
  defaultLocale: 'ko',
});

export default async function middleware(request: NextRequest) {
  const defaultLocale =
    request.headers?.get('x-your-custom-locale') || 'ko';
  // 국제화 라우팅 처리
  const i18nResponse = handleI18nRouting(request);

  i18nResponse.headers.set('x-your-custom-locale', defaultLocale);

  const session = (await getSession()) as Session;

  if (session) {
    const userLanguage = session.user.language || 'ko';
    // 유저 세션이 있다면 NEXT_LOCALE 쿠키 설정
    i18nResponse.cookies.set('NEXT_LOCALE', userLanguage);
  }

  return i18nResponse;
}

// 미들웨어가 적용될 경로를 설정
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    // '/',
    // '/(en|ko|ja|zh|fr)/:path*',
    // '/home/:path*',
    // '/stock/:path*',
    // '/search/:path*',
    // '/user/:path*',
    // '/news/:path*',
    // '/login',
    // '/signup',
    // '/find/:path*',
    // '/withdrawal',
  ],
};
