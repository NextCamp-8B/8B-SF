'use client';
import React, { useState } from 'react';
import InputSet from '@/components/shared/input/index';
import useInputChange from '@/hooks/input/useInputChange';
import TextButton from '@/components/shared/buttons/TextButton';
import Wrapper from '@/components/shared/Wrapper';
import { useRouter } from 'next/navigation';
import { conceptMap } from '@/components/shared/input/inputConfig';
import { PageStep } from '@/app/(before)/signup/page';

type AuthProps = {
  handleSubmit: () => void;
};

export default function Auth({ handleSubmit }: AuthProps) {
  const { value, onChangeInputValue } = useInputChange();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    const isNameValid = conceptMap.name.doValidation(value.name);
    const isEmailValid = conceptMap.email.doValidation(value.email);
    setIsFormValid(isNameValid && isEmailValid);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    onChangeInputValue(e);
    validateForm();
  };

  const onHandleSubmit = () => {
    setIsSubmit(true);
    if (isFormValid) {
      // 유효성 검사가 성공했다면
      // 인증번호 링크ㅂ보내기 성공 모달을 발생 시키기 위해
      // router.push('p/signup/modal=true', undefined, {
      //   shallow: true,
      // });
      setIsFormValid(false);
      handleSubmit();
    }
  };
  return (
    <Wrapper padding="px-24 py-20" width="w-[590px]">
      <div className="flex flex-col justify-start w-[386px] h-full">
        <h3 className="h3 font-bold text-center mb-10 text-primary-900">
          본인인증
        </h3>
        <InputSet className="flex flex-col gap-4">
          <InputSet.Validated
            onChange={handleInputChange}
            value={value.name}
            type="text"
            concept="name"
            isSubmit={isSubmit}
          />
          <InputSet.Validated
            onChange={handleInputChange}
            value={value.email}
            type="text"
            concept="email"
            isSubmit={isSubmit}
          />
          <TextButton
            disabled={!isFormValid}
            onClick={onHandleSubmit}
            className="w-full mx-auto mt-8"
          >
            인증링크 전송
          </TextButton>
        </InputSet>
      </div>
    </Wrapper>
  );
}
