import React, { useState } from 'react';
import ModalWrapper from './ModalWrapper';
import Wrapper from '@/components/shared/Wrapper';
import TextButton from '@/components/shared/buttons/TextButton';
import InputSet from '@/components/shared/input';
import useInputChange from '@/hooks/input/useInputChange';
import Withdrawal from '@/components/user/Withdrawal';

type UserProfileEditProps = {
  handleSubmit: () => void;
  handleSetWithdrawal: () => void; //회원탈퇴 처리를 위한
  onClose: () => void;
  isWithdrawal: boolean;
  setIsWithdrawal: (isWithdrawal: boolean) => void;
};

// 정보수정 모달에서 회원탈퇴 모달을 관리
// isWithdrawal 값에 따라 회원탈퇴모달이 발생
// handleSetWithdrawal 로 회원탈퇴 처리 되었다면
// WithdrawalComplete 페이지 렌더링
export default function UserProfileEdit({
  handleSubmit,
  handleSetWithdrawal,
  onClose,
}: UserProfileEditProps) {
  const [isShowWithdrawal, setIsShowWithdrawal] = useState(false); //회원 탈퇴

  const { value, onChangeInputValue } = useInputChange();
  const [isSubmit, setIsSubmit] = useState(false);

  const handleShowWidthdrawl = () => {
    //회원탈퇴 모달 열기
    // 회원정보 수정 모달 닫기
    setIsShowWithdrawal(true);
  };

  const handleHideWidthdrawl = () => {
    //회원탈퇴 모달 열기
    // 회원정보 수정 모달 닫기
    setIsShowWithdrawal(false);
  };

  const handleUserProfileEdit = () => {
    setIsSubmit(true);
    handleSubmit();
  };
  return (
    <>
      {isShowWithdrawal ? (
        <Withdrawal
          handleSubmit={handleSetWithdrawal}
          onClose={handleHideWidthdrawl}
        />
      ) : (
        <ModalWrapper onClose={onClose}>
          <Wrapper padding="px-24 py-20" width="w-[590px]">
            <h3 className="h3 font-bold text-center text-primary-900 mb-8">
              정보 수정
            </h3>
            <div className="flex flex-col justify-start w-[386px] h-full">
              <InputSet className="flex flex-col gap-4">
                <InputSet.Validated
                  onChange={onChangeInputValue}
                  value={value.loginId}
                  type="text"
                  concept="loginId"
                  isSubmit={isSubmit}
                />
                <InputSet.Validated
                  onChange={onChangeInputValue}
                  value={value.password}
                  type="text"
                  concept="password"
                  isSubmit={isSubmit}
                />
                <InputSet.Validated
                  onChange={onChangeInputValue}
                  value={value.passwordCheck}
                  type="text"
                  concept="passwordCheck"
                  isSubmit={isSubmit}
                />
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
                <TextButton
                  onClick={handleUserProfileEdit}
                  className="w-full mt-8"
                >
                  수정하기
                </TextButton>
              </InputSet>
              <button
                className="border-none bg-grayscale-0 text-center underline mt-4 text-warning-100"
                onClick={handleShowWidthdrawl}
              >
                회원 탈퇴
              </button>
            </div>
          </Wrapper>
        </ModalWrapper>
      )}
    </>
  );
}
