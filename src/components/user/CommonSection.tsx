import { ReactNode } from 'react';
import TextButton from '../shared/buttons/TextButton';
import SectionBox from './SectionBox';

type CommonSection = {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
  children?: ReactNode;
};

// 개인정보 / 프로필 수정 섹션에 사용
export default function CommonSection({
  title,
  description,
  buttonText,
  onButtonClick,
  children,
}: CommonSection) {
  return (
    <SectionBox title={title} description={description}>
      <TextButton size="sm" width="w-40" onClick={onButtonClick}>
        {buttonText}
      </TextButton>
      {children}
    </SectionBox>
  );
}
