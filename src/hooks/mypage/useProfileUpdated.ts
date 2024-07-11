import { useState } from 'react';
import { UpdateSession } from 'next-auth/react';

export function useProfileUpdate(updateSession: UpdateSession) {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState({ title: '', msg: '' });

  const handleProfileUpdate = async (formData: FormData) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/mypage', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const { data } = await response.json();
        setPopupMsg({
          title: '프로필 수정 성공',
          msg: '프로필이 수정되었습니다.',
        });
        await updateSession({ ...data.user.user_metadata });
        window.alert('프로필이 수정되었습니다.');
      } else {
        setPopupMsg({
          title: '프로필 수정 오류',
          msg: '오류가 발생했습니다. 다시 시도하시거나, 고객센터에 문의해주세요.',
        });
        throw new Error('프로필 수정 실패');
      }
    } catch (error) {
      console.error('프로필 설정 실패:', error);
      setPopupMsg({
        title: '프로필 수정 오류',
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
    handleProfileUpdate,
  };
}
