import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/lib/supabaseClient'; // Supabase 클라이언트 가져오기
import {
  deleteProfileImage,
  updateInterestStocks,
  uploadProfileImage,
} from '@/utils/supabase/supabaseHelper';
import generateFileName from '@/utils/generateFileName';
import { UUID } from 'crypto';

type UpdateData = {
  data: {
    nickname?: string;
    interestStock?: string;
    profileImg?: string;
    profileImgName?: string;
  };
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const id = formData.get('id') as UUID;
    const profileImg = formData.get('profileImg') as File;
    const nickname = formData.get('nickname') as string;
    const interestStock = formData.get('interestStock') as string;
    const accessToken = formData.get('accessToken') as string; // access_token 가져오기
    const refreshToken = formData.get('refreshToken') as string; // refresh_token 가져오기
    const userBaseImage = formData.get('userBaseImg') as string; // refresh_token 가져오기

    // Supabase 클라이언트를 인증된 사용자로 설정
    const { data: sessionData, error: sessionError } =
      await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

    if (sessionError) {
      if (
        sessionError.message.includes(
          'Invalid Refresh Token: Already Used',
        )
      ) {
        return NextResponse.json(
          { error: 'SessionExpired' },
          { status: 401 },
        );
      }
      throw sessionError;
    }

    // 유저 정보 업데이트를 위한 데이터 객체
    const updateData: UpdateData = {
      data: {
        nickname,
      },
    };

    // 프로필 이미지 supabase 스토리지에 저장
    if (profileImg && profileImg.name) {
      const fileName = generateFileName(profileImg?.name);

      const publicUrl = await uploadProfileImage(
        fileName,
        profileImg,
      );
      // 기존 프로필 이미지 삭제
      if (userBaseImage) {
        await deleteProfileImage(userBaseImage);
      }
      // userdata에 이미지 정보 추가
      updateData.data.profileImg = publicUrl;
      updateData.data.profileImgName = fileName;
    }

    // 관심 종목 업데이트
    await updateInterestStocks(id, interestStock);

    // 유저 정보 업데이트
    const { data, error: authError } = await supabase.auth.updateUser(
      updateData,
    );

    if (authError) {
      throw authError;
    }
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: '유저 프로필 수정 중 오류 발생했습니다.' },
      { status: 500 },
    );
  }
}
