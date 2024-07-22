import React, { useCallback, useEffect, useState } from 'react';
import TextButton from '@/components/shared/buttons/TextButton';
import InputSet from '@/components/shared/input';
import useInputChange from '@/hooks/input/useInputChange';
import { conceptMap } from '../shared/input/inputConfig';
import { useCheckPassword } from '@/hooks/user/useCheckPw';
import AuthPopup from '../signup/Popup';
import usePopupStore from '@/store/userPopup';
import myPageStore from '@/store/myPageStore';
import { useTranslations } from 'next-intl';
import ModalLayout from '../shared/modal/ModalLayout';

export default function CheckPassword() {
  const t = useTranslations();
  const { value, onChangeInputValue } = useInputChange();
  const [isSubmit, setIsSubmit] = useState(false); // 폼 submit
  const [isFormValid, setIsFormValid] = useState(false); //폼 유효성 체크
  const { checkPassword } = useCheckPassword();
  const { isShowPopup, popupMsg, hidePopup } = usePopupStore();
  const { openModal, closeModal, isPasswordCheck } = myPageStore();

  // 개인정보 수정 모달 열기
  const handleOpenAccountEdit = () => openModal('isUserAccountdit');

  // 비밀번호 체크 모달 딛기
  const handleClosePwCheckModal = () => {
    closeModal('isPasswordCheck');
    value.password = '';
  };

  const onHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmit(true);
    if (!isFormValid) return;

    const isValid = await checkPassword(value.password);
    if (isValid) {
      handleOpenAccountEdit();
      handleClosePwCheckModal();
    }
  };

  const validateForm = useCallback(() => {
    const isPasswordValid = conceptMap.password.doValidation(
      value.password,
    );
    setIsFormValid(isPasswordValid);
  }, [value.password]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  return (
    <>
      {/*성공/에러 메시지 팝업 */}
      {isShowPopup ? (
        <AuthPopup
          onClose={hidePopup}
          error={true}
          title={popupMsg.title}
          errorMessage={popupMsg.msg}
        />
      ) : (
        <ModalLayout
          isOpen={isPasswordCheck}
          handleIsOpen={handleClosePwCheckModal}
          title={t('MyPage.password_authentication')}
          width="w-[590px]"
        >
          <form className="flex flex-col items-center justify-start h-full mt-10">
            <InputSet className="flex flex-col gap-4 w-[386px]">
              <InputSet.Validated
                onChange={onChangeInputValue}
                value={value.password}
                type="password"
                concept="password"
                isSubmit={isSubmit}
              />
              <TextButton
                onClick={onHandleSubmit}
                className="w-full mt-8"
              >
                {t('MyPage.confirm')}
              </TextButton>
            </InputSet>
          </form>
        </ModalLayout>
      )}
    </>
  );
}
