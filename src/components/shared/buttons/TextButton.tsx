import React from 'react';
import ButtonBase from '@/components/shared/buttons/ButtonBase';
import {
  ButtonStyleTypes,
  ButtonSizeTypes,
} from '@/components/shared/buttons/types.ts';

// How to use 사용방법
// 전달할 props는
// size = lg, md, sm, hf (기본값 = md)
// inconSvg? = React.Element (선택사항,svg 파일)
// disabled? = boolean (선택사항, 기본값 false)

// <TextButton> 로그인 </TextButton>
// <TextButton iconSvg={EyeShow}> 로그인 </TextButton>
// <TextButton iconSvg={EyeShow} disabled={true} size="lg"> 로그인 </TextButton>
// <TextButton.Danger> 로그인 </TextButton.Danger>
// <TextButton.Success > 로그인 </TextButton.Success>
// <TextButton.Blue > 로그인 </TextButton.Blue>
// <TextButton.Gray > 로그인 </TextButton.Gray>

type TextButtonProps = {
  children: React.ReactNode;
  size?: ButtonSizeTypes;
  disabled?: boolean;
  styleType?: ButtonStyleTypes; //getButtonClasses 함수에서 Type Enum 지정;
  iconSvg?: React.ElementType;
};

const TextButton: React.FC<TTextButtonProps> & {
  Primary: React.FC<TButtonProps>;
  Success: React.FC<TButtonProps>;
  Danger: React.FC<TButtonProps>;
  Blue: React.FC<TButtonProps>;
  Gray: React.FC<TButtonProps>;
  Light: React.FC<TButtonProps>;
} = ({
  styleType = ButtonStyleTypes.Primary,
  iconSvg,
  size = 'md',
  disabled = false,
  ...props
}) => {
  const type = disabled ? 'disabled' : styleType;
  const baseClass = `group gap-x-1 box-border flex justify-center items-center rounded-lg whitespace-nowrap`;

  const sizeClass = {
    text: {
      sm: 'h-9 w-96 b-5',
      md: 'h-14 w-96 b-4',
      lg: 'h-16 w-96 b-3',
      hf: 'h-9 w-[120px] b5',
    },
    icon: {
      sm: 'w-5 h-5 b-4',
      md: 'w-[22px] h-[22px] b-3',
      lg: 'w-6 h-6 b-2',
      hf: 'h-5 w-5 b5',
    },
  };

  const typeClasses = {
    [ButtonStyleTypes.Primary]: 'btn-primary',
    [ButtonStyleTypes.Success]: 'btn-success',
    [ButtonStyleTypes.Danger]: 'btn-danger',
    [ButtonStyleTypes.Blue]: 'btn-blue',
    [ButtonStyleTypes.Gray]: 'btn-gray',
    [ButtonStyleTypes.Light]: 'btn-light',
    [ButtonStyleTypes.Disabled]: 'btn-disabled',
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
    [ButtonStyleTypes.Disabled]: 'text-grayscale-400',
  };

  const btnClass =
    `${baseClass} ${sizeClass['text'][size]} ${typeClasses[type]} `.trim();
  const iconClass = `${iconTypeClasses[type]} ${sizeClass['icon'][size]}`;

  return (
    <>
      <ButtonBase
        {...props}
        className={btnClass}
        iconClassName={iconClass}
        iconSvg={iconSvg}
        variant={'text'}
      />
    </>
  );
};

TextButton.Primary = (props: TTextButtonProps) => (
  <TextButton {...props} styleType="primary" />
);
TextButton.Success = (props: TTextButtonProps) => (
  <TextButton {...props} styleType="success" />
);
TextButton.Danger = (props: TTextButtonProps) => (
  <TextButton {...props} styleType="danger" />
);
TextButton.Blue = (props: TTextButtonProps) => (
  <TextButton {...props} styleType="blue" />
);
TextButton.Gray = (props: TTextButtonProps) => (
  <TextButton {...props} styleType="gray" />
);
TextButton.Light = (props: TTextButtonProps) => (
  <TextButton {...props} styleType="light" />
);

export default TextButton;
