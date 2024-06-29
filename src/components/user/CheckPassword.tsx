import React, { useState } from 'react';
import ModalWrapper from './ModalWrapper';
import Wrapper from '@/components/shared/Wrapper';
import TextButton from '@/components/shared/buttons/TextButton';
import InputSet from '@/components/shared/input';
import useInputChange from '@/hooks/input/useInputChange';

type CheckPasswordProps = {
  handleSubmit: () => void;
  onClose: () => void;
};

const CheckPassword: React.FC<CheckPasswordProps> = ({
  handleSubmit,
  onClose,
}) => {
  const { value, onChangeInputValue } = useInputChange();
  const [isSubmit, setIsSubmit] = useState(false);

  const handleCheckPassword = () => {
    setIsSubmit(true);

    handleSubmit();
  };
  return (
    <ModalWrapper onClose={onClose}>
      <Wrapper padding="px-24 py-20" width="w-[590px]">
        <h3 className="h3 font-bold text-center text-primary-900 mb-8">
          비밀번호 인증
        </h3>

        <div className="flex flex-col justify-start w-[386px] h-full">
          <InputSet className="flex flex-col gap-4">
            <InputSet.Validated
              onChange={onChangeInputValue}
              value={value.password}
              type="text"
              concept="password"
              isSubmit={isSubmit}
            />
            <TextButton
              onClick={handleCheckPassword}
              className="w-full mt-8"
            >
              수정하기
            </TextButton>
          </InputSet>
        </div>
      </Wrapper>
    </ModalWrapper>
  );
};

export default CheckPassword;
