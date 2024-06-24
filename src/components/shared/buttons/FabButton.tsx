import IconButtonBase from '@/components/shared/buttons/IconButtonBase';
import FAB from '@/assets/icons/fab.svg';
import {
  ButtonStyleTypes,
  ButtonSizeTypes,
} from '@/components/shared/buttons/types.ts';

// How to use 사용방법
// 전달할 props는
// disabled? = boolean (선택사항, 기본값 false)

// <FabButton/>

type FabButtonProps = {
  disabled?: boolean;
};

export default function FabButton({
  disabled = false,
}: TFabButtonProps) {
  const styleType = disabled ? 'btn-disabled' : 'btn-primary';

  const sizeClasses = {
    button: {
      sm: 'shadow-customh-sm h-9 w-9',
      md: 'shadow-custom-md h-14 w-14',
      lg: 'shadow-custom-lg h-16 w-16',
      hf: 'shadow-customh-sm h-6 w-6',
    },
    icon: {
      sm: 'h-6 w-6 text-[28px]',
      md: 'h-9 w-9  text-[36px]',
      lg: 'h-12 w-12 text-[42px]',
      hf: 'h-3 w-3 text-[18px]',
    },
  };

  const baseClass =
    'group gap-1 box-border flex justify-center items-center rounded-full';

  const btnClass = `${baseClass} shadow-custom-lg h-20 w-20 ${styleType}`;
  return (
    <IconButtonBase
      disabled={disabled}
      className={btnClass}
      iconClassName="text-grayscale-0 w-12 h-12 b2"
      iconSvg={FAB}
    />
  );
}
