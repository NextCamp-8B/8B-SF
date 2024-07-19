import React from 'react';
import ButtonBase from '@/components/shared/buttons/ButtonBase';
import China from '@/assets/icons/cn.svg';
import France from '@/assets/icons/fr.svg';
import Japan from '@/assets/icons/jp.svg';
import Korea from '@/assets/icons/kr.svg';
import United from '@/assets/icons/us.svg';
import { useTranslations } from 'next-intl';

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
type LanguageButtonWithTranslationProps = Omit<
  LanguageButtonProps,
  'children'
>;

type LanguageButtonProps = {
  children?: React.ReactNode;
  checked?: boolean; //현재 해당언어로 선택되었는지
  iconSvg?: React.ElementType;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const LanguageButton: React.FC<LanguageButtonProps> & {
  Kr: React.FC<LanguageButtonProps>;
  Cn: React.FC<LanguageButtonProps>;
  Jp: React.FC<LanguageButtonProps>;
  Fr: React.FC<LanguageButtonProps>;
  Us: React.FC<LanguageButtonProps>;
} = ({
  children,
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
        iconSvg={<IconSvg className="w-full h-[72px]" />}
        // iconClassName="w-full h-[72px]"
        {...props}
      >
        {children}
      </ButtonBase>
    </>
  );
};

const withTranslation = (
  Component: React.FC<LanguageButtonWithTranslationProps>,
  translationKey: string,
): React.FC<LanguageButtonWithTranslationProps> => {
  const TranslatedComponent = (
    props: LanguageButtonWithTranslationProps,
  ) => {
    const t = useTranslations('MyPage');
    return <Component {...props}>{t(translationKey)}</Component>;
  };

  TranslatedComponent.displayName = `LanguageButton.${
    translationKey.charAt(0).toUpperCase() + translationKey.slice(1)
  }`;

  return TranslatedComponent;
};

LanguageButton.Kr = withTranslation(
  (props) => <LanguageButton {...props} iconSvg={Korea} />,
  'korean',
);
LanguageButton.Cn = withTranslation(
  (props) => <LanguageButton {...props} iconSvg={China} />,
  'chinese',
);
LanguageButton.Jp = withTranslation(
  (props) => <LanguageButton {...props} iconSvg={Japan} />,
  'japanese',
);
LanguageButton.Fr = withTranslation(
  (props) => <LanguageButton {...props} iconSvg={France} />,
  'french',
);
LanguageButton.Us = withTranslation(
  (props) => <LanguageButton {...props} iconSvg={United} />,
  'english',
);

LanguageButton.Kr.displayName = 'LanguageButton.Kr';
LanguageButton.Cn.displayName = 'LanguageButton.Cn';
LanguageButton.Jp.displayName = 'LanguageButton.Jp';
LanguageButton.Fr.displayName = 'LanguageButton.Fr';
LanguageButton.Us.displayName = 'LanguageButton.Us';

LanguageButton.displayName = 'LanguageButton';

export default LanguageButton;
