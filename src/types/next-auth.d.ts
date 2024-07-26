// types/next-auth.d.ts
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      userId: string;
      email: string;
      name: string;
      role: string;
      nickname: string;
      profileImg: string;
      profileImgName: string;
      birth: string;
      phoneNumber: string;
      provider: string;
      language: Locale;
      accessToken: string;
      refreshToken: string;
    };
  }

  interface User {
    id: string;
    userId: string;
    email: string;
    name: string;
    role: string;
    nickname: string;
    profileImg: string;
    profileImgName: string;
    birth: string;
    phoneNumber: string;
    provider: string;
    language: Locale;
    accessToken: string;
    refreshToken: string;
  }
}

export type Locale = 'ko' | 'en' | 'fr' | 'ja' | 'zh';
