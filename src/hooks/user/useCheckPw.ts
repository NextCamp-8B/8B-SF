import { useSession } from 'next-auth/react';
import supabase from '@/lib/supabaseClient';

// 현재 로그인된 사용자 password check 함수
// checkPassword 함수
// password 값을 받아서 supabase에 로그인 시도
// 로그인 성공했다면 true
// 로그인 실패했다면 false
export const useCheckPassword = () => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  const checkPassword = async (password: string) => {
    if (!session || !session.user || !session.user.email || loading) {
      window.alert('세션이 유효하지 않거나 잘못된 접근입니다.');
      return false;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: session.user.email,
      password,
    });

    if (error) {
      window.alert('비밀번호가 틀렸습니다.');
      return false;
    }

    return true;
  };

  return { checkPassword };
};
