'use client';
import React, { useCallback, useEffect, useState } from 'react';
import ModalWrapper from './ModalWrapper';
import Wrapper from '@/components/shared/Wrapper';
import useInputChange from '@/hooks/input/useInputChange';
import Withdrawal from '@/components/user/Withdrawal';
import { conceptMap } from '../shared/input/inputConfig';
import useDuplicateCheck from '@/hooks/user/useDuplicateCheck';
import { useAccountUpdated } from '@/hooks/user/useAccountUpdated';
import AuthPopup from '../signup/Popup';
import useSessionData from '@/hooks/user/useSessionData';
import LoadingSpinnerWrapper from '../shared/LoadingSpinnerWrapper';
import myPageStore from '@/store/myPageStore';
import { usePasswordUpdate } from '@/hooks/user/useUpdatePw';
import UserAccountForm from './UserAccountForm';
import usePopupStore from '@/store/userPopup';

// 정보수정 모달에서 회원탈퇴 모달을 관리
// isWithdrawal 값에 따라 회원탈퇴모달이 발생
// handleSetWithdrawal 로 회원탈퇴 처리 되었다면
// WithdrawalComplete 페이지 렌더링
export default function UserAccountEdit() {
  const { openModal, closeAllModals, isUserAccountdit } =
    myPageStore();

  const { value, onChangeInputValue, setValue } = useInputChange();
  const [isSubmit, setIsSubmit] = useState(false); // 폼 submit
  const [isFormValid, setIsFormValid] = useState(false); //폼 유효성 체크
  const { isLoading, duplicatedCheck, handleDuplicate } =
    useDuplicateCheck(value.signupId); //Id 중복검사

  const { isLoading: updateLoading, handleAccountUpdate } =
    useAccountUpdated(); //개인정보 수정 api

  const { user, isSocial } = useSessionData();

  const { isShowPopup, popupMsg, hidePopup } = usePopupStore();

  useEffect(() => {
    if (user) {
      setValue((prevValue) => ({
        ...prevValue,
        signupId: user?.userId || '',
        name: user.name || '',
        birth: user.birth || '',
        signupPhone: user.phoneNumber || '',
      }));
    }
  }, [user, setValue]);

  // 회원탈퇴 모달 열기
  const handleShowWidthdrawl = () => openModal('isWithdrawal');

  // session값 loadindg이면 팝업창 닫기 불가
  const handleCloseAccountModal = () => {
    if (updateLoading) return;
    closeAllModals();
  };

  const { isUpdatePwLoading, handleUpdatePw } = usePasswordUpdate(); // 비밀번호 변경 훅

  const onHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmit(true);
    if (!duplicatedCheck && !isSocial)
      window.alert('아이디 중복검사를 확인해주세요');
    if (!isFormValid) return;
    const formData = new FormData();
    formData.append('userId', value.signupId.trim());
    formData.append('name', value.name.trim());
    formData.append('birth', value.birth.trim());
    formData.append('phoneNumber', value.signupPhone.trim());
    formData.append('accessToken', user.accessToken || '');
    formData.append('refreshToken', user.refreshToken || '');
    handleAccountUpdate(formData);
  };

  const validateForm = useCallback(() => {
    const isNameValid = conceptMap.name.doValidation(value.name);
    const isSignupPhoneValid = conceptMap.signupPhone.doValidation(
      value.signupPhone,
    );
    const isBirthValid = conceptMap.birth.doValidation(value.birth);
    if (isSocial) {
      // 소셜 로그인일 경우 생일과 전화번호만 유효성 검사
      setIsFormValid(
        isSignupPhoneValid && isBirthValid && isNameValid,
      );
    } else {
      // 일반 로그인일 경우 모든 필드 유효성 검사
      const isSignupIdValid = duplicatedCheck;
      setIsFormValid(
        isNameValid &&
          isSignupIdValid &&
          isSignupPhoneValid &&
          isBirthValid,
      );
    }
  }, [
    value.name,
    value.birth,
    value.signupPhone,
    duplicatedCheck,
    isSocial,
  ]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  return (
    <>
      {/* 회원 탈퇴 */}
      <Withdrawal />
      <ModalWrapper
        onClose={handleCloseAccountModal}
        isOpen={isUserAccountdit}
      >
        <Wrapper padding="px-24 py-20" width="w-[590px]">
          <h3 className="h3 font-bold text-center text-primary-900 mb-8">
            정보 수정
          </h3>
          <LoadingSpinnerWrapper
            isLoading={updateLoading || isUpdatePwLoading}
          >
            {/* 수정 성공/에러 메시지 팝업 */}
            {isShowPopup && (
              <AuthPopup
                error={true}
                title={popupMsg.title}
                errorMessage={popupMsg.msg}
                onClose={hidePopup}
              />
            )}
            <UserAccountForm
              onSubmit={onHandleSubmit}
              isSubmit={isSubmit}
              value={value}
              onChangeInputValue={onChangeInputValue}
              handleDuplicate={handleDuplicate}
              isLoading={isLoading}
              isSocial={isSocial}
              handleUpdatePw={handleUpdatePw}
              handleShowWidthdrawl={handleShowWidthdrawl}
            />
          </LoadingSpinnerWrapper>
        </Wrapper>
      </ModalWrapper>
    </>
  );
}
