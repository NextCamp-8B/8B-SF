import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { updateUserData } from '@/utils/user/updateUserData';
import usePopupStore from '@/store/userPopup';

type PopupMessage = {
  title: string;
  msg: string;
};

// 프로필 수정 커스텀 훅
// api 수정 로딩 값, 팝업 메세지, 세션 업데이트 관리
export function useProfileUpdate() {
  const { update } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const { showPopup } = usePopupStore();

  const handleProfileUpdate = async (formData: FormData) => {
    setIsLoading(true);
    await updateUserData(
      '/api/mypage/profile',
      formData,
      update,
      showPopup,
    );
    setIsLoading(false);
  };

  return {
    isLoading,
    handleProfileUpdate,
  };
}
