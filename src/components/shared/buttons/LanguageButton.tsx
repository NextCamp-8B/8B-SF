import React from 'react';
import ButtonBase from '@/components/shared/buttons/ButtonBase';
import China from '@/assets/icons/cn.svg';
import France from '@/assets/icons/fr.svg';
import Japan from '@/assets/icons/jp.svg';
import Korea from '@/assets/icons/kr.svg';
import United from '@/assets/icons/us.svg';
import {
  ButtonStyleTypes,
  ButtonSizeTypes,
} from '@/components/shared/buttons/types.ts';
// How to use 사용방법
// 전달할 props는
// checked? = boolean (선택사항, 기본값 = false 현재 언어로 선택되었는지 확인)
// 예) 해당 버튼이 한국어이고 현재 한국어로 설정되어있다면 true

//  <LanguageButton />  => 기본값은 한국어
//  <LanguageButton.Kr />
//  <LanguageButton.Cn />
//  <LanguageButton.Us />
//  <LanguageButton.Fr />
//  <LanguageButton.Jp />
//  <LanguageButton.Us checked={true} />

type LanguageButtonProps = {
  children: React.ReactNode;
  checked?: boolean; //현재 해당언어로 선택되었는지
  iconSvg: React.ElementType;
};

const LanguageButton: React.FC<TLanguageButtonProps> = ({
  children = '한국어',
  checked = false,
  iconSvg: IconSvg = Korea,
  ...props
}) => {
  const btnClass =
    `flex flex-col items-center justify-center text-center box-border border w-[198px] h-40 rounded-2xl px-16 font-bold b-3'
    ${
      checked
        ? 'border-secondary-600 text-secondary-600'
        : 'border-grayscale-300 text-grayscale-300 hover:border-secondary-600 hover:text-secondary-600'
    }
    `.trim();

  return (
    <>
      <ButtonBase
        className={btnClass}
        iconSvg={IconSvg}
        iconClassName="w-full h-[72px]"
        {...props}
      >
        {children}
      </ButtonBase>
    </>
  );
};

LanguageButton.Kr = (props: TLanguageButtonProps) => (
  <LanguageButton {...props} iconSvg={Korea}>
    한국어
  </LanguageButton>
);
LanguageButton.Cn = (props: TLanguageButtonProps) => (
  <LanguageButton {...props} iconSvg={China}>
    중국어
  </LanguageButton>
);
LanguageButton.Jp = (props: TLanguageButtonProps) => (
  <LanguageButton {...props} iconSvg={Japan}>
    일본어
  </LanguageButton>
);
LanguageButton.Fr = (props: TLanguageButtonProps) => (
  <LanguageButton {...props} iconSvg={France}>
    프랑스
  </LanguageButton>
);
LanguageButton.Us = (props: TLanguageButtonProps) => (
  <LanguageButton {...props} iconSvg={United}>
    미국어
  </LanguageButton>
);

export default LanguageButton;
