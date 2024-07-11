import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/lib/supabaseClient'; // Supabase 클라이언트 가져오기
import {
  deleteProfileImage,
  uploadProfileImage,
} from '@/utils/supabase/supabaseHelper';
import generateFileName from '@/utils/generateFileName';
import { signIn } from 'next-auth/react';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const profileImg = formData.get('profileImg') as File;
    const nickname = formData.get('nickname') as string;
    const interestStock = formData.get('interestStock') as string;
    const accessToken = formData.get('accessToken') as string; // access_token 가져오기
    const refreshToken = formData.get('refreshToken') as string; // refresh_token 가져오기
    const userBaseImage = formData.get('userBaseImg') as string; // refresh_token 가져오기

    // console.log(
    //   interestStock,
    //   nickname,
    //   profileImg,
    //   accessToken,
    //   refreshToken,
    //   userBaseImage,
    //   '-----수정 정보-----',
    // );
    // Supabase 클라이언트를 인증된 사용자로 설정
    // Supabase 클라이언트를 인증된 사용자로 설정
    const { data: sessionData, error: sessionError } =
      await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

    if (sessionError) {
      throw sessionError;
    }

    // 프로필 이미지 supabase 스토리지에 저장
    let profileFileImageUrl: any = null;
    if (profileImg && profileImg.name) {
      const fileName = generateFileName(profileImg?.name);
      console.log('----파일 이름 변환---', fileName);
      // 기존 프로필 이미지 삭제
      if (userBaseImage) {
        await deleteProfileImage(userBaseImage);
      }

      const publicUrl = await uploadProfileImage(
        fileName,
        profileImg,
      );
      profileFileImageUrl = publicUrl;
    }

    // 유저 정보 업데이트를 위한 데이터 객체
    const updateData: any = {
      data: {
        nickname,
        interestStock,
      },
    };

    if (userBaseImage) {
      console.log('기존 이미지 삭제 시도:', userBaseImage);
      await deleteProfileImage(userBaseImage);
    }

    // 유저 정보 업데이트
    const { data, error: authError } = await supabase.auth.updateUser(
      updateData,
    );
    console.log('---------수정 업데이트---------', data, sessionData);
    if (authError) {
      console.log('authError', authError);
      throw authError;
    }
    // 새로운 세션으로 signIn하기 위해 클라이언트로 보냄
    // const newSession = data?.session;
    // await signIn('credentials', {
    //   accessToken: newSession.access_token,
    //   refreshToken: newSession.refresh_token,
    //   redirect: false,
    // });
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('유저 프로필 수정 중 오류 발생:', error);
    return NextResponse.json(
      { error: '유저 프로필 수정 중 오류 발생했습니다.' },
      { status: 500 },
    );
  }
}
