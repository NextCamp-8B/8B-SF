import { useSession } from 'next-auth/react';
import supabase from '@/lib/supabaseClient';
import usePopupStore from '@/store/userPopup';

// 현재 로그인된 사용자 password check 함수
// checkPassword 함수
// password 값을 받아서 supabase에 로그인 시도
// 로그인 성공했다면 true
// 로그인 실패했다면 false
export const useCheckPassword = () => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const { showPopup } = usePopupStore();

  const checkPassword = async (password: string) => {
    if (!session || !session.user || !session.user.email || loading) {
      showPopup(
        '오류',
        '사용자 정보를 가져올 수 없습니다. 다시 로그인 해주세요.',
      );
      return false;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: session.user.email,
      password,
    });

    if (error) {
      showPopup('오류', '비밀번호를 다시 확인해주세요.');
      return false;
    }

    return true;
  };

  return { checkPassword };
};
