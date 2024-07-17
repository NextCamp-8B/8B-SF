import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const { password, code, refreshToken } = await req.json();
    const supabase = createClient();

    let token = code; // exchangeCodeForSession 요청에 사용할 token
    let sessionData;
    let sessionError;

    if (refreshToken) {
      // refreshToken이 있으면 세션 갱신
      ({ data: sessionData, error: sessionError } =
        await supabase.auth.refreshSession({
          refresh_token: refreshToken,
        }));
      if (!sessionError) {
        token = sessionData?.session?.access_token; // 새롭게 발급된 access_token을 사용
      }
    } else {
      // exchangeCodeForSession :
      // PKCE 흐름 동안 발급된 인증 코드를 세션으로 교환하여 기존 사용자를 로그인합니다.
      // 클라이언트 옵션에서 flowType이 pkce로 설정된 경우에 사용됩니다.
      // 유저는 이 token에 대한 한번만 요청을 보낼 수 있음
      // 추가 요청시 refresh token으로 갱신필요
      ({ data: sessionData, error: sessionError } =
        await supabase.auth.exchangeCodeForSession(token));
    }

    if (sessionError) {
      return NextResponse.json(
        {
          error:
            '인증 시간이 만료되었습니다. \n 비밀번호 변경을 처음부터 시도해주세요.',
        },
        { status: 500 },
      );
    }

    // supabase유저 password 재설정
    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });

    // console.log('-----reset------', data, error);

    if (error) {
      console.error('비밀번호 재설정 오류:', error.message);
      return NextResponse.json(
        {
          error:
            error.code === 'same_password'
              ? '이전 비밀번호와 동일합니다.\n다른 비밀번호를 입력해주세요.'
              : '비밀번호 변경에 실패했습니다.\n 입력한 내용을 다시 확인해주세요.',
          refreshToken: sessionData?.session?.refresh_token,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      message: '비밀번호가 변경되었습니다.',
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error:
          error.status === 400 || error.status === 422
            ? '인증 시간이 만료되었습니다. \n 비밀번호 변경을 처음부터 시도해주세요.'
            : '비밀번호 변경에 실패했습니다.\n 입력한 내용을 다시 확인해주세요.',
      },
      { status: 500 },
    );
  }
}
