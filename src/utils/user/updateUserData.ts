import { UpdateSession } from 'next-auth/react';

export async function updateUserData(
  endpoint: string,
  formData: FormData,
  update: UpdateSession,
  showPopup: (title: string, msg: string) => void,
) {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const { data } = await response.json();
      await update({ ...data.user.user_metadata });
      showPopup('수정 성공', '정보가 수정되었습니다.');
    } else {
      showPopup(
        '수정 오류',
        '오류가 발생했습니다. 다시 시도하시거나, 고객센터에 문의해주세요.',
      );
      throw new Error('수정 실패');
    }
  } catch (error) {
    showPopup(
      '수정 오류',
      '오류가 발생했습니다. 다시 시도하시거나, 고객센터에 문의해주세요.',
    );
  }
}
