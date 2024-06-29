import ModalWrapper from './ModalWrapper';
import React, { useState } from 'react';
import Wrapper from '@/components/shared/Wrapper';
import TextButton from '@/components/shared/buttons/TextButton';
import InputSet from '@/components/shared/input';
import useInputChange from '@/hooks/input/useInputChange';
import CompositeInput from '../shared/input/CompositeInput';

type WithdrawalProps = {
  handleSubmit: () => void;
  onClose: () => void;
};

export default function Withdrawal({
  handleSubmit,
  onClose,
}: WithdrawalProps) {
  const { value, onChangeInputValue } = useInputChange();
  const [isSubmit, setIsSubmit] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');

  const reasons = [
    '이용이 불편하고 장애가 많아서',
    '다른 서비스가 더 좋아서',
    '사용 빈도가 낮아서',
    '콘텐츠 불만',
    '기타',
  ];
  const handleReasonChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedReason(e.target.value);
  };

  const handleWithdrawal = () => {
    // 회원탈퇴 로직
  };

  const handleSelectReason = (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    // handleSubmit(selectedReason);
  };

  return (
    <ModalWrapper onClose={onClose}>
      <Wrapper padding="px-24 py-20" width="w-[590px]">
        <h3 className="h3 font-bold text-center text-primary-900 mb-8">
          회원 탈퇴
        </h3>
        <div className="flex flex-col justify-start w-[386px] h-full">
          <InputSet className="flex flex-col gap-2">
            <CompositeInput.Label
              htmlFor="reason"
              className="text-primary-900 b4 font-medium"
            >
              회원탈퇴 사유
            </CompositeInput.Label>
            <select
              id="reason"
              value={selectedReason}
              onChange={handleReasonChange}
              className="border border-grayscale-400 b4 font-normal placeholder-grayscale-400 p-4 rounded-lg mb-6"
              required
            >
              <option value="" disabled>
                탈퇴사유를 선택해주세요.
              </option>
              {reasons.map((reason, index) => (
                <option key={index} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
            <InputSet.Validated
              onChange={onChangeInputValue}
              value={value.password}
              type="text"
              concept="password"
              isSubmit={isSubmit}
            />
          </InputSet>

          <TextButton onClick={handleSubmit} className="w-full mt-8">
            회원탈퇴
          </TextButton>
        </div>
      </Wrapper>
    </ModalWrapper>
  );
}
