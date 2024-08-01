import React, { useCallback, useEffect, useState } from 'react';
import useInputChange from '@/hooks/input/useInputChange';
import { conceptMap } from '../shared/input/inputConfig';
import useDuplicateCheck from '@/hooks/user/useDuplicateCheck';
import { useAccountUpdated } from '@/hooks/user/useAccountUpdated';
import AuthPopup from '../signup/Popup';
import LoadingSpinnerWrapper from '../shared/LoadingSpinnerWrapper';
import myPageStore from '@/store/myPageStore';
import { usePasswordUpdate } from '@/hooks/user/useUpdatePw';
import UserAccountForm from './UserAccountForm';
import usePopupStore from '@/store/userPopup';
import { User } from 'next-auth';
import { useTranslations } from 'next-intl';
import ModalLayout from '../shared/modal/ModalLayout';
import ConfirmCancelPopup from './ConfirmCanclePopup';

// 정보수정 모달에서 회원탈퇴 모달을 관리
// isWithdrawal 값에 따라 회원탈퇴모달이 발생
// handleSetWithdrawal 로 회원탈퇴 처리 되었다면
// WithdrawalComplete 페이지 렌더링

type UserAccountEdit = {
  user: User;
  isSocial: boolean;
};

type InitialValueType = {
  signupId: string;
  name: string;
  birth: string;
  signupPhone: string;
};

export default function UserAccountEdit({
  user,
  isSocial,
}: UserAccountEdit) {
  const t = useTranslations('MyPage');
  const { openModal, closeModal, closeAllModals, isUserAccountdit } =
    myPageStore();
  const [initialValue, setInitialValue] = useState<InitialValueType>({
    signupId: '',
    name: '',
    birth: '',
    signupPhone: '',
  }); // 초기값 저장
  const { value, onChangeInputValue, setValue } = useInputChange();
  const [isSubmit, setIsSubmit] = useState(false); // 폼 submit
  const [isFormValid, setIsFormValid] = useState(false); //폼 유효성 체크
  const { isLoading, duplicatedCheck, handleDuplicate } =
    useDuplicateCheck(value.signupId, user?.userId); //Id 중복검사

  const { isLoading: updateLoading, handleAccountUpdate } =
    useAccountUpdated(); //개인정보 수정 api

  const {
    isShowPopup,
    popupMsg,
    hidePopup,
    isConfirmPopup,
    showPopup,
  } = usePopupStore();

  const {
    isUpdatePwLoading,
    handleUpdatePw,
    handleConfirmUpdatePw,
    handleClosePwPopup,
  } = usePasswordUpdate(); // 비밀번호 변경 훅

  useEffect(() => {
    if (user) {
      const initialData = {
        signupId: user?.userId || '',
        name: user.name || '',
        birth: user.birth || '',
        signupPhone: user.phoneNumber || '',
      };
      setInitialValue(initialData);
      setValue((prevValue) => ({
        ...prevValue,
        ...initialData,
      }));
    }
  }, [user, setValue]);

  // 회원탈퇴 모달 열기
  // 개인정보 수정 모달 닫기
  const handleShowWidthdrawl = () => {
    openModal('isWithdrawal');
    closeModal('isUserAccountdit');
  };

  //loadindg이면 팝업창 닫기 불가
  const handleCloseAccountModal = () => {
    if (updateLoading || isUpdatePwLoading) return;
    closeAllModals();
  };

  const onHandleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmit(true);
      if (!duplicatedCheck && !isSocial)
        showPopup(
          t('profileUpdate.error_title'),
          t('duplicate_check'),
        );
      if (!isFormValid) return;
      const formData = new FormData();
      formData.append('userId', value.signupId.trim());
      formData.append('name', value.name.trim());
      formData.append('birth', value.birth.trim());
      formData.append('phoneNumber', value.signupPhone.trim());
      formData.append('accessToken', user.accessToken || '');
      formData.append('refreshToken', user.refreshToken || '');
      handleAccountUpdate(formData);
    },
    [
      duplicatedCheck,
      handleAccountUpdate,
      isFormValid,
      isSocial,
      showPopup,
      t,
      user.accessToken,
      user.refreshToken,
      value.birth,
      value.name,
      value.signupId,
      value.signupPhone,
    ],
  );

  const validateForm = useCallback(() => {
    const isNameValid = conceptMap.name.doValidation(value.name);
    const isSignupPhoneValid = conceptMap.signupPhone.doValidation(
      value.signupPhone,
    );
    const isBirthValid = conceptMap.birth.doValidation(value.birth);
    const isInitalValue =
      value.signupId !== initialValue.signupId ||
      value.name !== initialValue.name ||
      value.birth !== initialValue.birth ||
      value.signupPhone !== initialValue.signupPhone;
    if (isSocial) {
      // 소셜 로그인일 경우 생일과 전화번호만 유효성 검사
      setIsFormValid(
        isSignupPhoneValid &&
          isBirthValid &&
          isNameValid &&
          isInitalValue,
      );
    } else {
      // 일반 로그인일 경우 모든 필드 유효성 검사
      const isSignupIdValid = duplicatedCheck;
      setIsFormValid(
        isInitalValue &&
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
    value.signupId,
    duplicatedCheck,
    isSocial,
    initialValue,
  ]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  return (
    <>
      {/* 수정 성공/에러 메시지 팝업 */}
      {isShowPopup && (
        <AuthPopup
          error={true}
          title={popupMsg.title}
          errorMessage={popupMsg.msg}
          onClose={hidePopup}
        />
      )}
      {/* 비밀번호 변경 경고창 */}
      {isConfirmPopup && (
        <ConfirmCancelPopup
          onConfirm={handleUpdatePw}
          onClose={handleClosePwPopup}
          title={popupMsg.title}
          msg={popupMsg.msg}
        />
      )}
      {!isShowPopup && !isConfirmPopup && (
        <ModalLayout
          isOpen={isUserAccountdit}
          handleIsOpen={handleCloseAccountModal}
          title={t('edit_account')}
          width="w-[590px]"
        >
          <LoadingSpinnerWrapper
            isLoading={updateLoading || isUpdatePwLoading}
          >
            <UserAccountForm
              onSubmit={onHandleSubmit}
              isSubmit={isSubmit}
              value={value}
              onChangeInputValue={onChangeInputValue}
              handleDuplicate={handleDuplicate}
              isLoading={isLoading}
              isSocial={isSocial}
              handleUpdatePw={handleConfirmUpdatePw}
              handleShowWidthdrawl={handleShowWidthdrawl}
              isFormValid={isFormValid}
            />
          </LoadingSpinnerWrapper>
        </ModalLayout>
      )}
    </>
  );
}
