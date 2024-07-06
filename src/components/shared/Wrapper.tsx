import React from 'react';

// padding값 , width값 string으로 받아 props로 받아 사용
//  <Wrapper padding='p-48' width="w-96"> <div> 로그인 창</div> </Wrapper>
// 기본값 py-[40px] px[56px]
type WrapperProps = {
  children: React.ReactNode;
  padding?: string;
  width?: string;
};

export default function Wrapper({
  children,
  padding,
  width,
}: WrapperProps) {
  const wrapperWidth = width ? width : 'w-min';
  const wrapperPadding = padding ? padding : 'py-[40px] px-[56px]';
  return (
    <div
      className={`border-none rounded-[32px] shadow-md bg-grayscale-0 ${wrapperWidth} ${wrapperPadding}`}
    >
      {children}
    </div>
  );
}
