import { UpdateSession } from 'next-auth/react';

type PopupMessage = {
  title: string;
  msg: string;
};

export async function updateUserData(
  endpoint: string,
  formData: FormData,
  update: UpdateSession,
  setPopupMsg: ({ title, msg }: PopupMessage) => void,
) {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const { data } = await response.json();
      setPopupMsg({
        title: '수정 성공',
        msg: '정보가 수정되었습니다.',
      });
      await update({ ...data.user.user_metadata });
      window.alert('정보가 수정되었습니다.');
    } else {
      setPopupMsg({
        title: '수정 오류',
        msg: '오류가 발생했습니다. 다시 시도하시거나, 고객센터에 문의해주세요.',
      });
      throw new Error('수정 실패');
    }
  } catch (error) {
    window.alert('정보 수정 실패.');
    setPopupMsg({
      title: '수정 오류',
      msg: '오류가 발생했습니다. 다시 시도하시거나, 고객센터에 문의해주세요.',
    });
  }
}
