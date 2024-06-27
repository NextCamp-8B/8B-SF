import React from 'react';
import IconButtonBase from '@/components/shared/buttons/IconButtonBase';
import {
  ButtonStyleTypes,
  ButtonSizeTypes,
} from '@/components/shared/buttons/types';
import KakaoLogo from '@/assets/icons/kakao_logo.svg';
import NaverLogo from '@/assets/icons/naver_logo.svg';
import GoogleLogo from '@/assets/icons/google_logo.svg';
import LogoLight from '@/assets/icons/google_logo.svg';

// How to use 사용방법
// 전달할 props는
// size = lg, md, sm, xs, hf, social,  (기본값 = md)
// inconSvg = React.Element (svg 파일)
// disabled? = boolean (선택사항, 기본값 false)

// <IconButton iconSvg={Refresh}//>
// <IconButton iconSvg={Refresh}/>
// <IconButton iconSvg={Refresh} disabled={true} size="lg"/>
// <IconButton.Danger/>
// <IconButton.Success/>
// <IconButton.Blue/>
// <IconButton.Gray/>
// <IconButton.Kakao />
// <IconButton.Naber />
// <IconButton.Google />

type IconButtonProps = {
  size?: ButtonSizeTypes;
  disabled?: boolean;
  styleType?: ButtonStyleTypes;
  iconSvg?: React.ElementType;
};

const IconButton: React.FC<IconButtonProps> & {
  Primary: React.FC<IconButtonProps>;
  Success: React.FC<IconButtonProps>;
  Danger: React.FC<IconButtonProps>;
  Blue: React.FC<IconButtonProps>;
  Gray: React.FC<IconButtonProps>;
  Light: React.FC<IconButtonProps>;
  Kakao: React.FC<IconButtonProps>;
  Naver: React.FC<IconButtonProps>;
  Google: React.FC<IconButtonProps>;
} = ({
  styleType = ButtonStyleTypes.Primary,
  iconSvg = LogoLight,
  size = 'md',
  disabled = false,
  ...props
}) => {
  const type = disabled ? ButtonStyleTypes.Disabled : styleType;

  const typeClasses = {
    [ButtonStyleTypes.Primary]: 'btn-primary',
    [ButtonStyleTypes.Success]: 'btn-success',
    [ButtonStyleTypes.Danger]: 'btn-danger',
    [ButtonStyleTypes.Blue]: 'btn-blue',
    [ButtonStyleTypes.Gray]: 'btn-gray',
    [ButtonStyleTypes.Light]: 'btn-light',
    [ButtonStyleTypes.Disabled]: 'btn-disabled',
    [ButtonStyleTypes.Kakao]: 'bg-[#FFE812]',
    [ButtonStyleTypes.Naver]: 'bg-grayscale-0',
    [ButtonStyleTypes.Google]: 'bg-grayscale-0',
  };

  const iconTypeClasses = {
    [ButtonStyleTypes.Primary]: 'text-grayscale-0',
    [ButtonStyleTypes.Success]: 'text-grayscale-0',
    [ButtonStyleTypes.Danger]: 'text-grayscale-0',
    [ButtonStyleTypes.Blue]: 'text-grayscale-0',
    [ButtonStyleTypes.Gray]:
      'text-grayscale-600 group-hover:text-grayscale-500',
    [ButtonStyleTypes.Light]:
      'text-grayscale-900 group-hover:text-primary-200',
    [ButtonStyleTypes.Kakao]: 'text-grayscale-900',
    [ButtonStyleTypes.Naver]: 'text-grayscale-900',
    [ButtonStyleTypes.Google]: 'text-grayscale-900',
    [ButtonStyleTypes.Disabled]: 'text-grayscale-400',
  };

  const sizeClasses = {
    button: {
      xs: 'h-5 w-5',
      sm: 'h-9 w-9',
      md: 'h-14 w-14',
      lg: 'h-16 w-16',
      hf: 'h-6 w-6',
      social: 'h-[72px] w-[72px]',
    },
    icon: {
      sm: 'h-5 w-5 b2',
      md: 'h-9 w-9 h4',
      lg: 'h-9 w-9 h3',
      social: 'h-full w-full rounded-full h1',
      hf: 'h-3 w-3 b5',
    },
  };

  const baseClass =
    'group gap-1 box-border flex justify-center items-center rounded-full';
  const btnClass = `${baseClass} ${typeClasses[type]} ${sizeClasses['button'][size]}`;
  const iconClass = `${iconTypeClasses[type]} ${sizeClasses['icon'][size]}`;

  return (
    <IconButtonBase
      {...props}
      className={btnClass}
      iconClassName={iconClass}
      iconSvg={iconSvg}
    />
  );
};

IconButton.Primary = (props: IconButtonProps) => (
  <IconButton {...props} styleType={ButtonStyleTypes.Primary} />
);
IconButton.Success = (props: IconButtonProps) => (
  <IconButton {...props} styleType={ButtonStyleTypes.Success} />
);
IconButton.Danger = (props: IconButtonProps) => (
  <IconButton {...props} styleType={ButtonStyleTypes.Danger} />
);
IconButton.Blue = (props: IconButtonProps) => (
  <IconButton {...props} styleType={ButtonStyleTypes.Blue} />
);
IconButton.Gray = (props: IconButtonProps) => (
  <IconButton {...props} styleType={ButtonStyleTypes.Gray} />
);
IconButton.Light = (props: IconButtonProps) => (
  <IconButton {...props} styleType={ButtonStyleTypes.Light} />
);
IconButton.Kakao = (props: IconButtonProps) => (
  <IconButton
    {...props}
    size="social"
    iconSvg={KakaoLogo}
    styleType={ButtonStyleTypes.Kakao}
  />
);
IconButton.Naver = (props: IconButtonProps) => (
  <IconButton
    {...props}
    size="social"
    iconSvg={NaverLogo}
    styleType={ButtonStyleTypes.Naver}
  />
);
IconButton.Google = (props: IconButtonProps) => (
  <IconButton
    {...props}
    size="social"
    iconSvg={GoogleLogo}
    styleType={ButtonStyleTypes.Google}
  />
);

IconButton.Primary.displayName = 'IconButton.Primary';
IconButton.Success.displayName = 'IconButton.Success';
IconButton.Danger.displayName = 'IconButton.Danger';
IconButton.Blue.displayName = 'IconButton.Blue';
IconButton.Gray.displayName = 'IconButton.Gray';
IconButton.Light.displayName = 'IconButton.Light';
IconButton.Kakao.displayName = 'IconButton.Kakao';
IconButton.Naver.displayName = 'IconButton.Naver';
IconButton.Google.displayName = 'IconButton.Google';

IconButton.displayName = 'IconButton';

export default IconButton;
