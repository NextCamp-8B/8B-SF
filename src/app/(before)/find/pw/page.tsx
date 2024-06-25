'use client';
import { useState } from 'react';
import Wrapper from '@/components/shared/Wrapper';
import InputSet from '@/components/shared/input/index';
import useInputChange from '@/hooks/input/useInputChange';
import TextButton from '@/components/shared/buttons/TextButton';
import Link from 'next/link';
import {
  conceptMap,
  statusMap,
} from '@/components/shared/input/inputConfig';

import { useRouter } from 'next/navigation';

export default function FindPw() {
  const { value, onChangeInputValue } = useInputChange();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isSuccessFindPw, setIsSuccessFindPw] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    const isNameValid = conceptMap.name.doValidation(value.name);
    const isIdValid = conceptMap.loginId.doValidation(value.loginId);
    const isEmailValid = conceptMap.email.doValidation(value.email);
    setIsFormValid(isNameValid && isIdValid && isEmailValid);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    onChangeInputValue(e);
    validateForm();
  };

  const handleSubmit = () => {
    setIsSubmit(true);
    if (isFormValid) {
      // 유효성 검사가 성공했다면
      // 임시발급 비밀번호 성공 모달을 발생 시키기 위해
      // /find/pw/modal 로 경로 이동
      router.push('/find/pw/modal', undefined, {
        shallow: true,
      });
      setIsFormValid(false);
    }
  };
  return (
    <>
      <main className="flex justify-center items-center h-screen">
        <Wrapper padding="px-24 py-20" width="w-[590px]">
          <div className="flex flex-col items-center w-96 h-full ">
            <h3 className="h3 font-bold text-center mb-10">
              비밀번호 찾기
            </h3>
            <>
              {/* 이름 / 아이디 / 이메일 입력 폼 */}
              <InputSet className="flex flex-col gap-4">
                <InputSet.Validated
                  onChange={handleInputChange}
                  value={value.name}
                  type="text"
                  isSubmit={isSubmit}
                  concept="name"
                />
                <InputSet.Validated
                  onChange={handleInputChange}
                  value={value.loginId}
                  isSubmit={isSubmit}
                  type="text"
                  concept="loginId"
                />
                <InputSet.Validated
                  onChange={handleInputChange}
                  value={value.email}
                  isSubmit={isSubmit}
                  type="email"
                  concept="email"
                />
                {/* submit 비밀번호 찾기 버튼 */}
                <TextButton
                  className="mt-8"
                  disabled={!isFormValid}
                  onClick={handleSubmit}
                >
                  임시비밀번호 발급
                </TextButton>
              </InputSet>
            </>
          </div>
        </Wrapper>
      </main>
    </>
  );
}
