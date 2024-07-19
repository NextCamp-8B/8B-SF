import { useState } from 'react';
import useSessionData from './useSessionData';
import usePopupStore from '@/store/userPopup';
import { useTranslations } from 'next-intl';

export function usePasswordUpdate() {
  const t = useTranslations();
  const { user } = useSessionData();
  const [isUpdatePwLoading, setIsUpdatePwLoading] = useState(false);
  const { showPopup } = usePopupStore();

  const handleUpdatePw = async () => {
    setIsUpdatePwLoading(true);

    if (!user) {
      showPopup(
        t('MyPage.profileUpdate.error'),
        t('MyPage.passwordAuthError.password_check_error'),
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
        t('MyPage.passwordChangeLinkSent.title'),
        t('MyPage.passwordChangeLinkSent.message'),
      );
    } else {
      showPopup(
        t('MyPage.passwordChangeLinkSent.error'),
        t('MyPage.profileUpdate.error_message'),
      );
    }

    setIsUpdatePwLoading(false);
  };

  return {
    isUpdatePwLoading,
    handleUpdatePw,
  };
}
