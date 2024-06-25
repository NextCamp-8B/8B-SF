import React from 'react';

// TextButton, Language 컴포넌트에서 base로 사용
// disabled 여부에 따라 버튼 not-allowed

type IconButtonBaseProps = {
  disabled?: boolean;
  className?: string;
  iconClassName?: string;
  iconSvg: React.ElementType;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const IconButtonBase: React.FC<IconButtonBaseProps> = ({
  disabled = false,
  className,
  iconClassName,
  iconSvg: IconSvg,
  ...props
}) => {
  return (
    <button className={className} disabled={disabled} {...props}>
      <IconSvg className={iconClassName} />
    </button>
  );
};

export default IconButtonBase;
