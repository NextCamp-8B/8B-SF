import React from 'react';
import IconButtonBase from '@/components/shared/buttons/IconButtonBase';
import {
  ButtonStyleTypes,
  ButtonSizeTypes,
} from '@/components/shared/buttons/types.ts';
// How to use 사용방법
// 전달할 props는
// size = lg, md, sm, hf (기본값 = md)
// inconSvg = React.Element (svg 파일)
// disabled? = boolean (선택사항, 기본값 false)

// <IconButton iconSvg={Refresh}//>
// <IconButton iconSvg={Refresh}/>
// <IconButton iconSvg={Refresh} disabled={true} size="lg"/>
// <IconButton.Danger/>
// <IconButton.Success/>
// <IconButton.Blue/>
// <IconButton.Gray/>

type IconButtonProps = {
  size?: ButtonSizeTypes;
  disabled?: boolean;
  styleType?: ButtonStyleType; //getButtonClasses 함수에서 Type Enum 지정
  iconSvg: React.ElementType;
};

const IconButton: React.FC<TIconButtonProps> & {
  Primary: React.FC<TIconButtonProps>;
  Success: React.FC<TIconButtonProps>;
  Danger: React.FC<TIconButtonProps>;
  Blue: React.FC<TIconButtonProps>;
  Gray: React.FC<TIconButtonProps>;
  Light: React.FC<TIconButtonProps>;
} = ({
  styleType = ButtonStyleTypes.Primary,
  iconSvg,
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

  const sizeClasses = {
    button: {
      sm: 'h-9 w-9',
      md: 'h-14 w-14',
      lg: 'h-16 w-16',
      hf: 'h-6 w-6',
    },
    icon: {
      sm: 'h-5 w-5 b2',
      md: 'h-7 w-7 h4',
      lg: 'h-9 w-9 h3',
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

IconButton.Primary = (props: TIconButtonProps) => (
  <IconButton {...props} styleType="primary" />
);
IconButton.Success = (props: TIconButtonProps) => (
  <IconButton {...props} styleType="success" />
);
IconButton.Danger = (props: TIconButtonProps) => (
  <IconButton {...props} styleType="danger" />
);
IconButton.Blue = (props: TIconButtonProps) => (
  <IconButton {...props} styleType="blue" />
);
IconButton.Gray = (props: TIconButtonProps) => (
  <IconButton {...props} styleType="gray" />
);
IconButton.Light = (props: TIconButtonProps) => (
  <IconButton {...props} styleType="light" />
);

export default IconButton;
