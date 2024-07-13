import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { updateUserData } from '@/utils/user/updateUserData';

type PopupMessage = {
  title: string;
  msg: string;
};

// 계정 수정 커스텀 훅
export function useAccountUpdated() {
  const { update } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState<PopupMessage>({
    title: '',
    msg: '',
  });

  const handleAccountUpdate = async (formData: FormData) => {
    setIsLoading(true);
    await updateUserData(
      '/api/mypage/account',
      formData,
      update,
      setPopupMsg,
    );
    setIsShowPopup(true);
    setIsLoading(false);
  };

  return {
    isLoading,
    isShowPopup,
    popupMsg,
    setIsShowPopup,
    handleAccountUpdate,
  };
}
