'use client';
import React from 'react';

// TextButton, Language 컴포넌트에서 base로 사용
// disabled 여부에 따라 버튼 not-allowed

type IconButtonBaseProps = {
  disabled?: boolean;
  className?: string;
  // iconClassName?: string;
  iconSvg: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const IconButtonBase: React.FC<IconButtonBaseProps> = ({
  disabled = false,
  className,
  // iconClassName,
  iconSvg: IconSvg,
  onClick,
  ...props
}) => {
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (disabled || !onClick) return;
    onClick(event);
  };
  return (
    <button
      className={className}
      disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      {IconSvg}
    </button>
  );
};

export default IconButtonBase;
