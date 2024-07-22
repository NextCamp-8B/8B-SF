import { useState } from 'react';
import useSessionData from './useSessionData';
import usePopupStore from '@/store/userPopup';
import { useTranslations } from 'next-intl';
import { signOut } from 'next-auth/react';

export function usePasswordUpdate() {
  const t = useTranslations('MyPage');
  const { user } = useSessionData();
  const [isUpdatePwLoading, setIsUpdatePwLoading] = useState(false);
  const { showPopup, showConfirmPopup, hidePopup } = usePopupStore();

  const handleConfirmUpdatePw = async () => {
    showConfirmPopup(
      t('passwordChangeLinkSent.confirmTitle'),
      t('passwordChangeLinkSent.confirmMsg'),
    );
  };

  const handleClosePwPopup = () => {
    if (isUpdatePwLoading) return;
    hidePopup();
  };

  const handleUpdatePw = async () => {
    hidePopup();
    setIsUpdatePwLoading(true);

    if (!user) {
      showPopup(
        t('profileUpdate.error'),
        t('passwordAuthError.password_check_error'),
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
      await signOut({ callbackUrl: '/login' });
    } else {
      showPopup(
        t('passwordChangeLinkSent.error'),
        t('profileUpdate.error_message'),
      );
    }

    setIsUpdatePwLoading(false);
  };

  return {
    isUpdatePwLoading,
    handleUpdatePw,
    handleConfirmUpdatePw,
    handleClosePwPopup,
  };
}
