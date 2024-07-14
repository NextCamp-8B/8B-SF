'use client';

import React, { useCallback, useEffect, useState } from 'react';
import ModalWrapper from './ModalWrapper';
import Wrapper from '@/components/shared/Wrapper';
import TextButton from '@/components/shared/buttons/TextButton';
import InputSet from '@/components/shared/input';
import useInputChange from '@/hooks/input/useInputChange';
import { conceptMap } from '../shared/input/inputConfig';
import { useCheckPassword } from '@/hooks/user/useCheckPw';
import AuthPopup from '../signup/Popup';
import usePopupStore from '@/store/userPopup';
import myPageStore from '@/store/myPageStore';

const CheckPassword = () => {
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
    <ModalWrapper
      onClose={handleClosePwCheckModal}
      isOpen={isPasswordCheck}
    >
      <Wrapper padding="px-24 py-20" width="w-[590px]">
        <h3 className="h3 font-bold text-center text-primary-900 mb-8">
          비밀번호 인증
        </h3>
        {/* 수정 성공/에러 메시지 팝업 */}
        {isShowPopup && (
          <AuthPopup
            onClose={hidePopup}
            error={true}
            title={popupMsg.title}
            errorMessage={popupMsg.msg}
          />
        )}
        <form className="flex flex-col justify-start w-[386px] h-full">
          <InputSet className="flex flex-col gap-4">
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
              확인
            </TextButton>
          </InputSet>
        </form>
      </Wrapper>
    </ModalWrapper>
  );
};

export default CheckPassword;
