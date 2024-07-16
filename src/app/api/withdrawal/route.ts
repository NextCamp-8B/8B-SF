import { auth as getSession } from '@/auth';
import { createClient } from '@/utils/supabase/server';
import { Session } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const { user } = (await getSession()) as Session;

    const password = formData.get('password') as string;
    const reason = formData.get('reason') as string;

    const supabase = createClient();

    const { data: userData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email: user.email,
        password,
      });

    if (signInError) {
      console.log('----------signInError', signInError);
      return NextResponse.json(
        { error: '비밀번호가 일치하지 않습니다.' },
        { status: 400 },
      );
    }

    const { error: deleteUserError } =
      await supabase.auth.admin.deleteUser(userData.user.id);
    console.log('----------deleteUserError', deleteUserError);

    if (deleteUserError) {
      return NextResponse.json(
        { error: '회원탈퇴에 실패했습니다. 다시 시도해주세요.' },
        { status: 500 },
      );
    }

    // 삭제된 사용자 정보 기록
    const { error: insertDeleteUserError } = await supabase
      .from('deleted_users')
      .insert([{ email: user.email, withdrawal_reason: reason }]);

    console.log(
      '----------insertDeleteUserError',
      insertDeleteUserError,
    );

    if (insertDeleteUserError) {
      return NextResponse.json(
        { error: '회원탈퇴에 실패했습니다. 다시 시도해주세요.' },
        { status: 500 },
      );
    }

    return NextResponse.json({
      message: '회원탈퇴에 성공했습니다.',
    });
  } catch (error) {
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
