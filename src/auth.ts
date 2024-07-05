import KakaoProvider from 'next-auth/providers/kakao';
import { SupabaseAdapter } from '@next-auth/supabase-adapter';
import jwt from 'jsonwebtoken';
import supabase from '@/lib/supabaseClient';
import NextAuth, { CredentialsSignin, User } from 'next-auth';
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
        // console.log(credentials, "credentials");
        const { email, password } = credentials;
        if (email || !password) {
          throw new CredentialsSignin('입력값이 부족합니다.');
        }
        return {
          name: '테스트',
          email: 'qwer@1234',
          role: '유자',
          id: '100',
        };
      },
    }),
    KakaoProvider({
      clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: '/',
  },
  callbacks: {
    async signIn({ user, account }) {
      console.log(
        '-----------user--------',
        user,
        '------------------account--------------------------------',
        account,
      );
      if (account?.provider === 'kakao') {
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
          const baseUrl =
            process.env.NEXTAUTH_URL || 'http://localhost:3000';
          // cookie 값 세팅을 위한 route api 핸들러 라우팅
          return `${baseUrl}/api/cookie?token=${jwtToken}`;
        }

        // 소셜로 회원가입 했는지 체크
        const socialUser = await checkSocialUser(
          emailAddress,
          provider,
        );

        // 이미 회원가입한 카카오 유저
        if (socialUser) {
          // Supabase 로그인 처리 (세션 생성)
          console.log(
            '---------소셜 로그인---------',
            emailAddress,
            providerAccountId,
          );
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
            return false;
          }
        }
        return true;
      }
      return true;
    },
    async jwt({ token, account, profile }: any) {
      // // console.log('--------------token-------------');
      // console.log('----------jwt token-------------', token);
      // console.log('----------jwt account-------------', account);
      // console.log('---------jwt profile---------- ', profile);
      // if (user) {
      //   token.role = user.role;
      //   token.id = user.id;
      //   token.email = user.email;
      //   token.name = user.name;
      //   token.image = user.image;

      //   if (user.token) {
      //     token.token = user.token;
      //   }
      // }
      return token;
    },
    async session({ session, token }: any) {
      // 세션에 사용자 정보를 추가
      // console.log('--------------session-------------');
      // console.log('session:', session);
      // console.log('token :', token);
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.token = token.token;
      }
      return session;
    },
  },
});
