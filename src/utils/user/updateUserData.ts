import { UpdateResponse } from '@/types/mypage';
import { UpdateSession } from 'next-auth/react';

export async function updateUserData(
  endpoint: string,
  formData: FormData,
  update: UpdateSession,
  showPopup: (title: string, msg: string) => void,
  translations: {
    successTitle: string;
    successMessage: string;
    errorTitle: string;
    errorMessage: string;
  },
) {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const { data } = await response.json();
      await update({ ...data.user.user_metadata });
      showPopup(
        translations.successTitle,
        translations.successMessage,
      );
    } else {
      const data: UpdateResponse = await response.json();
      if (data.error === 'SessionExpired') {
        // 세션 만료 처리
        return data;
      }
      showPopup(translations.errorTitle, translations.errorMessage);
      throw new Error('수정 실패');
    }
  } catch (error) {
    showPopup(translations.errorTitle, translations.errorMessage);
  }
}
