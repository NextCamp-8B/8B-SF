import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { updateUserData } from '@/utils/user/updateUserData';
import usePopupStore from '@/store/userPopup';

// 계정 수정 커스텀 훅
export function useAccountUpdated() {
  const { update } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const { showPopup } = usePopupStore();

  const handleAccountUpdate = async (formData: FormData) => {
    setIsLoading(true);
    await updateUserData(
      '/api/mypage/account',
      formData,
      update,
      showPopup,
    );
    setIsLoading(false);
  };

  return {
    isLoading,
    handleAccountUpdate,
  };
}
