import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const { name, user_id, email } = await req.json();
    const supabase = createClient();

    // 사용자가 일치하는지 확인
    const { data, error } = await supabase
      .from('user')
      .select('id, provider_account_id')
      .eq('name', name)
      .eq('user_id', user_id)
      .eq('email', email)
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 },
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: '일치하는 사용자를 찾을 수 없습니다.' },
        { status: 404 },
      );
    }

    if (data.provider_account_id) {
      return NextResponse.json(
        { error: '해당 사용자는 소셜 회원가입을 한 유저입니다.' },
        { status: 400 },
      );
    }

    // reset password를 유저에게 보낸후 로그인 페이지로 리다이렉트
    //  PKCE 흐름
    // 사용자가 비밀번호 재설정 링크를 클릭하면 SIGNED_IN 및 PASSWORD_RECOVERY 이벤트 발생.
    // onAuthStateChange()를 사용하여 이러한 이벤트를 수신하고 콜백 함수를 호출 가능.
    const currentUrl = new URL(req.url);
    const languageSegment = `/${
      req.cookies.get('NEXT_LOCALE')?.value
    }`; //언어값 추출
    const redirectToUpdatePw = `${currentUrl.origin}${languageSegment}/update-pw`;
    const { data: resetPasswordData, error: resetError } =
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectToUpdatePw,
      });

    if (resetError) {
      return NextResponse.json(
        {
          error:
            '비밀번호 재설정 이메일 전송에 실패했습니다. 나중에 다시 시도해주세요.',
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      message: '임시 비밀번호가 이메일로 발송되었습니다.',
    });
  } catch (error) {
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
