import React from 'react';
import CheckSvg from '@/assets/icons/check.svg';

// How to use 사용방법
// 전달할 props는
// label = string
// <CheckBox label="자동 로그인" />

type CheckBoxProps = {
  label?: string;
};

export default function Checkbox({ label }: CheckBoxProps) {
  return (
    <div className="flex items-center">
      <div className="relative flex justify-center items-center">
        <input
          type="checkbox"
          id="checkbox"
          name="checkbox"
          className="w-4 h-4 appearance-none border rounded-sm cursor-pointer border-grayscale-400 checked:bg-grayscale-900 checked:border-none focus:outline-none peer"
        />
        <label
          htmlFor="checkbox"
          className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 peer-checked:opacity-100 "
        >
          <CheckSvg className="w-3 h-3 text-grayscale-0" />
        </label>
      </div>
      <label htmlFor="checkbox" className="ml-2 cursor-pointer">
        {label}
      </label>
    </div>
  );
}
