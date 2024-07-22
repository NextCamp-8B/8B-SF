import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { updateUserData } from '@/utils/user/updateUserData';
import usePopupStore from '@/store/userPopup';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { UpdateResponse } from '@/types/mypage';

// 프로필 수정 커스텀 훅
// api 수정 로딩 값, 팝업 메세지, 세션 업데이트 관리
export function useProfileUpdate() {
  const router = useRouter();
  const { update } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const { showPopup } = usePopupStore();
  const t = useTranslations();

  const handleProfileUpdate = async (formData: FormData) => {
    setIsLoading(true);
    const data = await updateUserData(
      '/api/mypage/profile',
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
    handleProfileUpdate,
  };
}
