import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { updateUserData } from '@/utils/user/updateUserData';
import usePopupStore from '@/store/userPopup';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

// 계정 수정 커스텀 훅
export function useAccountUpdated() {
  const router = useRouter();
  const { update } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations();
  const { showPopup } = usePopupStore();

  const handleAccountUpdate = async (formData: FormData) => {
    setIsLoading(true);
    const data = await updateUserData(
      '/api/mypage/account',
      formData,
      update,
      showPopup,
      {
        successTitle: t('MyPage.profileUpdate.success_title'),
        successMessage: t('MyPage.profileUpdate.success_message'),
        errorTitle: t('MyPage.profileUpdate.error_title'),
        errorMessage: t('MyPage.profileUpdate.error_message'),
      },
    );
    if (data && data?.error === 'SessionExpired') {
      await signOut();
      router.replace('/login/error?error=SessionExpired');
    }
    router.refresh();
    setIsLoading(false);
  };

  return {
    isLoading,
    handleAccountUpdate,
  };
}
