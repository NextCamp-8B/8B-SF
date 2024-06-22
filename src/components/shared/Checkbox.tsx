import React from 'react';
import CheckSvg from '@/assets/icons/check.svg';

export default function Checkbox() {
  return (
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
  );
}
