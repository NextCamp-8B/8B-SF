import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/lib/supabaseClient';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const userId = formData.get('userId') as File;
    const name = formData.get('name') as string;
    const birth = formData.get('birth') as string;
    const phoneNumber = formData.get('phoneNumber') as string;
    const accessToken = formData.get('accessToken') as string; // access_token 가져오기
    const refreshToken = formData.get('refreshToken') as string; // access_token 가져오기

    // Supabase 클라이언트를 인증된 사용자로 설정
    const { data: sessionData, error: sessionError } =
      await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

    if (sessionError) {
      throw sessionError;
    }

    // 유저 정보 업데이트를 위한 데이터 객체
    const updateData: any = {
      data: {
        userId,
        name,
        birth,
        phoneNumber,
      },
    };

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
      { error: '유저 개인정보 수정 중 오류 발생했습니다.' },
      { status: 500 },
    );
  }
}
