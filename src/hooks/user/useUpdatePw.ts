import { useState } from 'react';
import useSessionData from './useSessionData';
import usePopupStore from '@/store/userPopup';

export function usePasswordUpdate() {
  const { user } = useSessionData();
  const [isUpdatePwLoading, setIsUpdatePwLoading] = useState(false);
  const { showPopup } = usePopupStore();

  const handleUpdatePw = async () => {
    setIsUpdatePwLoading(true);

    if (!user) {
      showPopup(
        '오류 발생',
        '사용자 정보를 가져올 수 없습니다. 다시 로그인 해주세요.',
      );
      setIsUpdatePwLoading(false);
      return;
    }

    const response = await fetch('/api/find/pw', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: user.name,
        user_id: user.userId,
        email: user.email,
      }),
    });

    if (response.ok) {
      showPopup(
        '비밀번호 변경 링크 전송',
        '비밀번호 변경 링크가 전송되었습니다. 이메일을 확인해주세요.',
      );
    } else {
      showPopup(
        '오류 발생',
        '오류가 발생했습니다. 다시 시도하거나 고객센터에 문의해주세요.',
      );
    }

    setIsUpdatePwLoading(false);
  };

  return {
    isUpdatePwLoading,
    handleUpdatePw,
  };
}
