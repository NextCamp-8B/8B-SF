import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { sendTmpPassword } from '@/utils/sendTmpPassword';

// 임시 비밀번호 생성 함수
const generateTemporaryPassword = (length: number) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += characters.charAt(
      Math.floor(Math.random() * characters.length),
    );
  }
  return password;
};

export async function POST(req: NextRequest) {
  try {
    const { name, user_id, email } = await req.json();
    const supabase = createClient();

    // 사용자가 일치하는지 확인
    const { data, error } = await supabase
      .from('users')
      .select('id')
      .eq('name', name)
      .eq('user_id', user_id)
      .eq('email', email)
      .single();

    if (error) {
      console.error('Supabase 쿼리 오류:', error.message);
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

    const temporaryPassword = generateTemporaryPassword(12);

    const { error: updateError } = await supabase
      .from('users')
      .update({ password: temporaryPassword })
      .eq('id', data.id);

    if (updateError) {
      console.error('비밀번호 업데이트 오류:', updateError.message);
      return NextResponse.json(
        { error: updateError.message },
        { status: 500 },
      );
    }

    // 임시 비밀번호 이메일로 전송
    const emailSent = await sendTmpPassword(email, temporaryPassword);

    if (!emailSent) {
      return NextResponse.json(
        { error: '이메일 발송 실패' },
        { status: 500 },
      );
    }

    return NextResponse.json({
      message: '임시 비밀번호가 이메일로 발송되었습니다.',
    });
  } catch (error) {
    console.error('서버 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}

// HTTP 요청에 따라 핸들러 호출
export async function handler(req: NextRequest) {
  if (req.method === 'POST') {
    return POST(req);
  } else {
    return NextResponse.json(
      { error: '허용되지 않는 요청입니다.' },
      { status: 405 },
    );
  }
}
