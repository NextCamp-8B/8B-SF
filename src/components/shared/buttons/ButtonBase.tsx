import React from 'react';

// TextButton, Language 컴포넌트에서 base로 사용
// disabled 여부에 따라 버튼 not-allowed

type ButtonBaseProps = {
  children?: React.ReactNode;
  disabled?: boolean;
  iconSvg?: React.ElementType;
  className: string;
  iconClassName: string;
};

const ButtonBase: React.FC<ButtonBaseProps> = ({
  children,
  disabled = false,
  className,
  iconClassName,
  iconSvg: IconSvg,
}) => {
  return (
    <button className={className} disabled={disabled}>
      {IconSvg && <IconSvg className={iconClassName} />}
      {children}
    </button>
  );
};

export default ButtonBase;
