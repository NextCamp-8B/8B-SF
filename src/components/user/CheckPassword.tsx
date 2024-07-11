'use client';

import React, { useCallback, useEffect, useState } from 'react';
import ModalWrapper from './ModalWrapper';
import Wrapper from '@/components/shared/Wrapper';
import TextButton from '@/components/shared/buttons/TextButton';
import InputSet from '@/components/shared/input';
import useInputChange from '@/hooks/input/useInputChange';
import { conceptMap } from '../shared/input/inputConfig';
import { useCheckPassword } from '@/hooks/user/useCheckPw';

type CheckPasswordProps = {
  onClose: () => void;
  onSuccess: () => void;
};

const CheckPassword = ({
  onSuccess,
  onClose,
}: CheckPasswordProps) => {
  const { value, onChangeInputValue } = useInputChange();
  const [isSubmit, setIsSubmit] = useState(false); // 폼 submit
  const [isFormValid, setIsFormValid] = useState(false); //폼 유효성 체크
  const { checkPassword } = useCheckPassword();

  const onHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmit(true);
    if (!isFormValid) {
      console.log('isFormValid unset');
      return;
    }

    const isValid = await checkPassword(value.password);
    if (isValid) {
      onSuccess();
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
    <ModalWrapper onClose={onClose}>
      <Wrapper padding="px-24 py-20" width="w-[590px]">
        <h3 className="h3 font-bold text-center text-primary-900 mb-8">
          비밀번호 인증
        </h3>

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
