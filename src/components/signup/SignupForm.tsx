'use client';
import React, { useEffect, useState } from 'react';
import InputSet from '@/components/shared/input/index';
import useInputChange from '@/hooks/input/useInputChange';
import TextButton from '@/components/shared/buttons/TextButton';
import Wrapper from '@/components/shared/Wrapper';
import bcrypt from 'bcryptjs';

import { conceptMap } from '@/components/shared/input/inputConfig';
import useUserStore from '@/store/userStore';

type SignupFormProps = {
  changePage: () => void;
};

export default function SignupForm({
  changePage,
}: SignupFormProps) {
  const { user, clearUser, setUser } = useUserStore();
  const { value, onChangeInputValue } = useInputChange();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [duplicatedCheck, setDuplicatedCheck] = useState(false);

  const handleDuplicate = async () => {
    const response = await fetch(
      `/api/user?signupId=${value.signupId}`,
    );
    const result = await response.json();
    if (result.message === 'duplicate') {
      setDuplicatedCheck(false);
      return 'duplicate';
    } else {
      setDuplicatedCheck(true);
      return 'possible';
    }
  };
  // 폼 입력시 유효성 검사
  const validateForm = () => {
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
    console.log(
      'isSignupIdValid: ',
      isSignupIdValid,
      'isPasswordValid: ',
      isPasswordValid,
      'isPasswordCheckValid: ',
      isPasswordCheckValid,
      'isSignupPhoneValid: ',
      isSignupPhoneValid,
      'isBirthValid: ',
      isBirthValid,
    );
    setIsFormValid(
      isSignupIdValid &&
        isPasswordValid &&
        isPasswordCheckValid &&
        isSignupPhoneValid &&
        isBirthValid,
    );
  };

  useEffect(() => {
    validateForm();
  }, [value, duplicatedCheck]);


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    onChangeInputValue(e);
  };

  const onHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmit(true);

    if (!isFormValid) return console.log('isFormValid unset');
    setIsFormValid(false);
    const hashPassword = await bcrypt.hash(value.password, 10) as string;

      setUser({
        // password: value.password,
        password: hashPassword,
        phoneNumber: value.signupPhone,
        birth: value.birth,
        userId: value.signupId,
      })
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

            <TextButton
              className="w-full mx-auto mt-8"
            >
              다음
            </TextButton>
          </InputSet>
        </form>
      </div>
    </Wrapper>
  );
}
