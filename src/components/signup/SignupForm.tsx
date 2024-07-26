import React, { useCallback, useEffect, useState } from 'react';
import InputSet from '@/components/shared/input/index';
import useInputChange from '@/hooks/input/useInputChange';
import TextButton from '@/components/shared/buttons/TextButton';
import Wrapper from '@/components/shared/Wrapper';
import { conceptMap } from '@/components/shared/input/inputConfig';
import useUserStore from '@/store/userStore';
import usePageStore from '@/store/signupStepStore';
import useDuplicateCheck from '@/hooks/user/useDuplicateCheck';
import { useTranslations } from 'next-intl';
import usePopupStore from '@/store/userPopup';
import AuthPopup from './Popup';

export default function SignupForm() {
  const t = useTranslations();
  const { user, setUser } = useUserStore(); // 유저 store
  const { value, onChangeInputValue } = useInputChange(); //Input 관리
  const [isSubmit, setIsSubmit] = useState(false); // 폼 submit
  const [isFormValid, setIsFormValid] = useState(false); // 폼 유효성 체크
  const { setPageStep } = usePageStore(); //페이지 이동
  const { isLoading, duplicatedCheck, handleDuplicate } =
    useDuplicateCheck(value.signupId); // 아이디 중복 검사 api
  const { showPopup, isShowPopup, popupMsg, hidePopup } =
    usePopupStore();

  // 폼 입력시 유효성 검사
  // 소셜 로그인시 휴대폰, 생일 유효성 검사
  const validateForm = useCallback(() => {
    const isSignupPhoneValid = conceptMap.signupPhone.doValidation(
      value.signupPhone,
    );
    const isBirthValid = conceptMap.birth.doValidation(value.birth);
    if (user.providerAccountId) {
      // 소셜 로그인일 경우 생일과 전화번호만 유효성 검사
      setIsFormValid(isSignupPhoneValid && isBirthValid);
    } else {
      // 일반 로그인일 경우 모든 필드 유효성 검사
      // const isSignupIdValid = duplicatedCheck;
      const isPasswordValid = conceptMap.password.doValidation(
        value.password,
      );
      const isPasswordCheckValid =
        value.password === value.passwordCheck;
      setIsFormValid(
        // isSignupIdValid &&
        isPasswordValid &&
          isPasswordCheckValid &&
          isSignupPhoneValid &&
          isBirthValid,
      );
    }
  }, [
    value.birth,
    value.password,
    value.signupPhone,
    value.passwordCheck,
    user.providerAccountId,
  ]);

  useEffect(() => {
    validateForm();
  }, [value, validateForm, duplicatedCheck]);

  const onHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmit(true);
    if (!isFormValid)
      return showPopup(
        t('MyPage.passwordAuthError.error'),
        t('FindId.fetch_error_message'),
      );
    setIsFormValid(false);
    // profile에서 데이터를 한번에 보내기 위해 저장
    if (user.providerAccountId) {
      // 소셜 회원가입 폼
      setUser({
        phoneNumber: value.signupPhone.trim(),
        birth: value.birth.trim(),
      });
    } else {
      // 일반 회원가입 폼
      // 중복검사
      if (!duplicatedCheck)
        return showPopup(
          t('MyPage.passwordAuthError.error'),
          t('MyPage.duplicate_check'),
        );
      setUser({
        password: value.password.trim(),
        phoneNumber: value.signupPhone.trim(),
        birth: value.birth.trim(),
        userId: value.signupId.trim(),
        providerAccountId: '',
      });
    }

    // profile로 이동
    setPageStep('profile');
  };
  return (
    <Wrapper padding="px-24 py-20" width="w-[590px]">
      <div className="flex flex-col justify-start w-[386px] h-full">
        <h3 className="h3 font-bold text-center mb-10 text-primary-900">
          {t('SignUp.sign_up')}
        </h3>
        <form onSubmit={onHandleSubmit}>
          {isShowPopup && (
            <AuthPopup
              error={true}
              title={popupMsg.title}
              errorMessage={popupMsg.msg}
              onClose={hidePopup}
            />
          )}
          <InputSet className="flex flex-col gap-4">
            {!user.providerAccountId && (
              <>
                <InputSet.DuplicateCheck
                  onChange={onChangeInputValue}
                  onClick={handleDuplicate}
                  value={value.signupId}
                  type="text"
                  concept="signupId"
                  isLoading={isLoading}
                  isSubmit={isSubmit}
                />
                <InputSet.Validated
                  onChange={onChangeInputValue}
                  value={value.password}
                  type="password"
                  concept="password"
                  isSubmit={isSubmit}
                />
                <InputSet.Validated
                  onChange={onChangeInputValue}
                  value={value.passwordCheck}
                  password={value.password}
                  type="password"
                  concept="passwordCheck"
                  isSubmit={isSubmit}
                />
              </>
            )}
            <InputSet.Validated
              onChange={onChangeInputValue}
              value={value.signupPhone}
              type="text"
              concept="signupPhone"
              isSubmit={isSubmit}
            />
            <InputSet.Validated
              onChange={onChangeInputValue}
              value={value.birth}
              type="text"
              concept="birth"
              isSubmit={isSubmit}
            />

            <TextButton className="w-full mx-auto mt-8">
              {t('SignUp.next')}
            </TextButton>
          </InputSet>
        </form>
      </div>
    </Wrapper>
  );
}
