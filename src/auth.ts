import KakaoProvider from 'next-auth/providers/kakao';
import GoogleProvider from 'next-auth/providers/google';
import NaverProvider from 'next-auth/providers/naver';
import jwt from 'jsonwebtoken';
import supabase from '@/lib/supabaseClient';
import NextAuth, { CredentialsSignin } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import {
  checkEmailExists,
  checkSocialUser,
} from './utils/supabase/supabaseHelper';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'LoginId' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (!email || !password) {
          throw new CredentialsSignin('입력값이 부족합니다.');
        }
        // 이메일 찾기
        const { data: userData, error: userError }: any =
          await supabase
            .from('user')
            .select('email')
            .eq('user_id', email)
            .single();

        if (userError || !userData) {
          throw new CredentialsSignin('사용자를 찾을 수 없습니다.');
        }

        // 이메일로 로그인 시도
        const { data: loginData, error: loginError } =
          await supabase.auth.signInWithPassword({
            email: userData?.email,
            password,
          });
        console.log(loginData, '-----login 로그인-------');
        if (loginError || !loginData) {
          throw new CredentialsSignin('로그인에 실패했습니다.');
        }
        // 유효한 사용자라면
        return {
          id: loginData.user.id,
          name: loginData.user.user_metadata.name,
          email: loginData.user.email,
          role: loginData.user.role || '',
          nickname: loginData.user.user_metadata.nickname,
          profileImg: loginData.user.user_metadata.profileImg,
          profileImgName: loginData.user.user_metadata.profileImgName,
          birth: loginData.user.user_metadata.birth,
          phoneNumber: loginData.user.user_metadata.phoneNumber,
          interestStock: loginData.user.user_metadata.interestStock,
          accessToken: loginData.session.access_token,
          refreshToken: loginData.session.refresh_token,
        };
      },
    }),
    KakaoProvider({
      clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
    NaverProvider({
      clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: '/login',
    error: '/login/error', // 커스텀 에러 페이지 설정
  },
  callbacks: {
    async signIn({ user, account }: any): Promise<any> {
      console.log(
        '-----------user--------',
        user,
        '------------------account--------------------------------',
        account,
      );

      if (
        account?.provider === 'naver' ||
        account?.provider === 'google' ||
        account?.provider === 'kakao'
      ) {
        const { provider, providerAccountId } = account;
        const { email, name, id, image } = user;
        // user 값 undefinded 일시 처리
        const emailAddress = email || '';

        // 이메일 중복 체크
        const existingUser = await checkEmailExists(emailAddress);

        if (!existingUser) {
          // 회원가입 유저일 경우 토큰 생성
          const jwtToken = jwt.sign(
            {
              email,
              name,
              id: providerAccountId,
              image,
              providerAccountId: provider,
            },
            process.env.NEXT_PUBLIC_JWT_SECRET!,
            { expiresIn: '30m' },
          );
          const baseUrl = process.env.NEXTAUTH_URL!;
          // cookie 값 세팅을 위한 route api 핸들러 라우팅
          return `${baseUrl}/api/cookie?token=${jwtToken}`;
        }

        // 소셜로 회원가입 했는지 체크
        const socialUser = await checkSocialUser(
          emailAddress,
          provider,
        );

        if (!socialUser) {
          // 이메일은 존재하지만 다른 제공자로 가입한 경우
          throw new Error(
            '이미 해당 이메일로 다른 제공자를 통해 회원가입이 되어 있습니다.',
          );
        }

        // 이미 회원가입한 소셜 유저
        if (socialUser) {
          // Supabase 로그인 처리 (세션 생성)
          const { data: socialLogin, error: loginError } =
            await supabase.auth.signInWithPassword({
              email: emailAddress,
              password: providerAccountId,
            });
          console.log(
            '-----------socialLogin-----------',
            socialLogin,
          );
          if (loginError) {
            console.error('Supabase 로그인 오류:', loginError);
            throw new Error('소셜 로그인에 실패했습니다.');
          }
          user.id = socialLogin.user.id;
          user.email = socialLogin.user.email;
          user.name = socialLogin.user.user_metadata.name;
          user.nickname = socialLogin.user.user_metadata.nickname;
          user.profileImg = socialLogin.user.user_metadata.profileImg;
          user.profileImgName =
            socialLogin.user.user_metadata.profileImgName;
          user.birth = socialLogin.user.user_metadata.birth;
          user.phoneNumber =
            socialLogin.user.user_metadata.phoneNumber;
          user.interestStock =
            socialLogin.user.user_metadata.interestStock;
          user.accessToken = socialLogin.session.access_token;
          user.refreshToken = socialLogin.session.refresh_token;
          return true;
        }
        return true;
      }
      return true;
    },
    async jwt({ token, user }: any) {
      // console.log('--------------token-------------');
      // console.log('----------jwt token-------------', token);
      // console.log('---------jwt user---------- ', user);
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
        token.nickname = user.nickname;
        token.profileImg = user.profileImg;
        token.profileImgName = user.profileImgName;
        token.birth = user.birth;
        token.phoneNumber = user.phoneNumber;
        token.interestStock = user.interestStock;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    async session({ session, token }: any) {
      // 세션에 사용자 정보를 추가
      // console.log('--------------session-------------');
      // console.log('token :', token);
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.nickname = token.nickname;
        session.user.profileImg = token.profileImg;
        session.user.profileImgName = token.profileImgName;
        session.user.birth = token.birth;
        session.user.phoneNumber = token.phoneNumber;
        session.user.interestStock = token.interestStock;
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
      }
      // console.log('session:', session);
      return session;
    },
    redirect: async ({ url, baseUrl }) => {
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      if (url) {
        const { search, origin } = new URL(url);
        const callbackUrl = new URLSearchParams(search).get(
          'callbackUrl',
        );
        if (callbackUrl)
          return callbackUrl.startsWith('/')
            ? `${baseUrl}${callbackUrl}`
            : callbackUrl;
        if (origin === baseUrl) return url;
      }
      return baseUrl;
    },
  },
});

export const { GET, POST } = handlers;
