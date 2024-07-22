import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/lib/supabaseClient';

type UpdateData = {
  data: {
    language: string;
  };
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const language = formData.get('language') as string;
    const accessToken = formData.get('accessToken') as string; // access_token 가져오기
    const refreshToken = formData.get('refreshToken') as string; // access_token 가져오기

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
        language,
      },
    };

    // 유저 정보 업데이트
    const { data, error: authError } = await supabase.auth.updateUser(
      updateData,
    );
    if (authError) {
      throw authError;
    }
    const response = NextResponse.json({ data }, { status: 200 });
    // NEXT_LOCALE 쿠키 설정
    response.cookies.set('NEXT_LOCALE', language, { path: '/' });
    return response;
  } catch (error) {
    console.log('--------error---', error);
    return NextResponse.json(
      { error: '언어 설정 중 오류 발생했습니다.' },
      { status: 500 },
    );
  }
}
