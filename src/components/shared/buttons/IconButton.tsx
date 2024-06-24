import React from 'react';
import IconButtonBase from '@/components/shared/buttons/IconButtonBase';
import {
  ButtonStyleTypes,
  ButtonSizeTypes,
} from '@/components/shared/buttons/types';
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
  styleType?: ButtonStyleTypes;
  iconSvg: React.ElementType;
};

const IconButton: React.FC<IconButtonProps> & {
  Primary: React.FC<IconButtonProps>;
  Success: React.FC<IconButtonProps>;
  Danger: React.FC<IconButtonProps>;
  Blue: React.FC<IconButtonProps>;
  Gray: React.FC<IconButtonProps>;
  Light: React.FC<IconButtonProps>;
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

IconButton.Primary.displayName = 'IconButton.Primary';
IconButton.Success.displayName = 'IconButton.Success';
IconButton.Danger.displayName = 'IconButton.Danger';
IconButton.Blue.displayName = 'IconButton.Blue';
IconButton.Gray.displayName = 'IconButton.Gray';
IconButton.Light.displayName = 'IconButton.Light';

IconButton.displayName = 'IconButton';

export default IconButton;
