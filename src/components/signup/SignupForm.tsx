'use client';
import React, { useCallback, useEffect, useState } from 'react';
import InputSet from '@/components/shared/input/index';
import useInputChange from '@/hooks/input/useInputChange';
import TextButton from '@/components/shared/buttons/TextButton';
import Wrapper from '@/components/shared/Wrapper';

import { conceptMap } from '@/components/shared/input/inputConfig';
import useUserStore from '@/store/userStore';

type SignupFormProps = {
  changePage: () => void;
};

export default function SignupForm({ changePage }: SignupFormProps) {
  const [isLoading, setIsLoading] = useState(false); //중복확인 api 로딩
  const { setUser } = useUserStore();
  const { value, onChangeInputValue } = useInputChange();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [duplicatedCheck, setDuplicatedCheck] = useState(false);

  const handleDuplicate = async () => {
    setIsLoading(true);
    const response = await fetch(
      `/api/user?signupId=${value.signupId}`,
    );
    const result = await response.json();
    if (result.message === 'duplicate') {
      setIsLoading(false);
      setDuplicatedCheck(false);
      return 'duplicate';
    } else {
      setIsLoading(false);
      setDuplicatedCheck(true);
      return 'possible';
    }
  };
  // 폼 입력시 유효성 검사
  const validateForm = useCallback(() => {
    const isSignupIdValid = duplicatedCheck;
    const isPasswordValid = conceptMap.password.doValidation(
      value.password,
    );
    const isPasswordCheckValid =
      value.password === value.passwordCheck;
    const isSignupPhoneValid = conceptMap.signupPhone.doValidation(
      value.signupPhone,
    );
    const isBirthValid = conceptMap.birth.doValidation(value.birth);
    setIsFormValid(
      isSignupIdValid &&
        isPasswordValid &&
        isPasswordCheckValid &&
        isSignupPhoneValid &&
        isBirthValid,
    );
  }, [
    value.birth,
    value.password,
    value.signupPhone,
    duplicatedCheck,
    value.passwordCheck,
  ]);

  useEffect(() => {
    validateForm();
  }, [value, validateForm, duplicatedCheck]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    onChangeInputValue(e);
    setDuplicatedCheck(false);
  };

  const onHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmit(true);

    if (!isFormValid) return console.log('isFormValid unset');
    setIsFormValid(false);
    // profile에서 데이터를 한번에 보내기 위해 저장
    setUser({
      password: value.password,
      phoneNumber: value.signupPhone,
      birth: value.birth,
      userId: value.signupId,
    });
    // profile로 이동
    changePage();
  };
  return (
    <Wrapper padding="px-24 py-20" width="w-[590px]">
      <div className="flex flex-col justify-start w-[386px] h-full">
        <h3 className="h3 font-bold text-center mb-10 text-primary-900">
          회원가입
        </h3>
        <form onSubmit={onHandleSubmit}>
          <InputSet className="flex flex-col gap-4">
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
              onChange={handleInputChange}
              value={value.password}
              type="text"
              concept="password"
              isSubmit={isSubmit}
            />
            <InputSet.Validated
              onChange={handleInputChange}
              value={value.passwordCheck}
              password={value.password}
              type="text"
              concept="passwordCheck"
              isSubmit={isSubmit}
            />
            <InputSet.Validated
              onChange={handleInputChange}
              value={value.signupPhone}
              type="text"
              concept="signupPhone"
              isSubmit={isSubmit}
            />
            <InputSet.Validated
              onChange={handleInputChange}
              value={value.birth}
              type="text"
              concept="birth"
              isSubmit={isSubmit}
            />

            <TextButton className="w-full mx-auto mt-8">
              다음
            </TextButton>
          </InputSet>
        </form>
      </div>
    </Wrapper>
  );
}
