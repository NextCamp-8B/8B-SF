import React from 'react';

// padding값 string으로 받아 props로 받아 사용
//  <Wrapper padding='p-48'> <div> 로그인 창</div> </Wrapper>
// 기본값 py-[40px] px[56px]
type WrapperProps = {
  children: React.ReactNode;
  padding?: string;
};

export default function Wrapper({ children, padding }: WrapperProps) {
  const wrapperPadding = padding ? padding : 'py-[40px] px-[56px]';
  return (
    <div
      className={`border-none rounded-[32px] shadow-custom-xxs bg-grayscale-0 ${wrapperPadding}`}
    >
      {children}
    </div>
  );
}
