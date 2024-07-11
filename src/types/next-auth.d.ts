// types/next-auth.d.ts
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
      nickname: string;
      profileImg: string;
      profileImgName: string;
      birth: string;
      phoneNumber: string;
      interestStock: string;
      accessToken: string;
      refreshToken: string;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    role: string;
    nickname: string;
    profileImg: string;
    profileImgName: string;
    birth: string;
    phoneNumber: string;
    interestStock: string;
    accessToken: string;
    refreshToken: string;
  }
}
