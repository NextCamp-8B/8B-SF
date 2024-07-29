import React, { useId } from 'react';
import CheckSvg from '@/assets/icons/check.svg';

// How to use 사용방법
// 전달할 props는
// label = string
// <Checkbox label="자동 로그인" />

type CheckBoxProps = {
  label?: string;
  type?: 'primary' | 'rounded';
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const CheckboxBase: React.FC<CheckBoxProps> = ({
  label,
  type = 'primary',
  checked = false,
  onChange,
  ...props
}) => {
  const generatedId = useId(); // 고유한 ID 생성
  const checkBoxClass =
    type === 'rounded'
      ? 'w-5 h-5 rounded-full checked:bg-primary-900'
      : 'w-4 h-4  rounded-sm checked:bg-grayscale-900';

  return (
    <div className="flex items-center">
      <div className="relative flex justify-center items-center">
        <input
          type="checkbox"
          id={generatedId}
          name="checkbox"
          className={`appearance-none border cursor-pointer border-grayscale-400  checked:border-none focus:outline-none peer ${checkBoxClass}`}
          checked={checked}
          onChange={onChange}
          {...props}
        />
        <label
          htmlFor={generatedId}
          id={generatedId}
          className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 peer-checked:opacity-100"
        >
          <CheckSvg className="w-3 h-3 text-grayscale-0" />
        </label>
      </div>
      <label htmlFor={generatedId} className="ml-2 cursor-pointer">
        {label}
      </label>
    </div>
  );
};

const Checkbox: React.FC<CheckBoxProps> & {
  Primary: React.FC<CheckBoxProps>;
  Rounded: React.FC<CheckBoxProps>;
} = (props) => <CheckboxBase {...props} />;

Checkbox.Primary = ({ className = '', ...props }) => (
  <CheckboxBase type="primary" {...props} />
);

Checkbox.Rounded = ({ className = '', ...props }) => (
  <CheckboxBase type="rounded" {...props} />
);

Checkbox.Primary.displayName = 'Checkbox.Primary';
Checkbox.Rounded.displayName = 'Checkbox.Rounded';

export default Checkbox;
