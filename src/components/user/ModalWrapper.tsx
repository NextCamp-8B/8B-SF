import React from 'react';

type ModalWrapperProps = {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
};

export default function ModalWrapper({
  children,
  onClose,
  isOpen,
}: ModalWrapperProps) {
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  //isOpen 어떤 모달창 발생해야하는지 관리
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 bg-grayscale-900 bg-opacity-65 flex justify-center items-center h-[100%] w-[100%]"
      onClick={onClose}
    >
      <div onClick={handleModalClick}>{children}</div>
    </div>
  );
}
