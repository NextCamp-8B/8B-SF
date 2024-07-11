import { useState } from 'react';
import { useSession } from 'next-auth/react';

// 프로필 수정 커스텀 훅
// api 수정 로딩 값, 팝업 메세지, 세션 업데이트 관리
export function useAccountUpdated() {
  const { update } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState({ title: '', msg: '' });

  const handleAccountUpdate = async (formData: FormData) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/mypage/account', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const { data } = await response.json();
        setPopupMsg({
          title: '개인정보 수정 성공',
          msg: '개인정보 수정되었습니다.',
        });
        await update({ ...data.user.user_metadata });
        window.alert('개인정보가 수정되었습니다.');
      } else {
        setPopupMsg({
          title: '개인정보 수정 오류',
          msg: '오류가 발생했습니다. 다시 시도하시거나, 고객센터에 문의해주세요.',
        });
        throw new Error('프로필 수정 실패');
      }
    } catch (error) {
      console.error('개인정보 수정 실패:', error);
      setPopupMsg({
        title: '개인정보 수정 오류',
        msg: '오류가 발생했습니다. 다시 시도하시거나, 고객센터에 문의해주세요.',
      });
    } finally {
      setIsShowPopup(true);
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isShowPopup,
    popupMsg,
    setIsShowPopup,
    handleAccountUpdate,
  };
}
