import React from 'react';

type ModalWrapperProps = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function ModalWrapper({
  children,
  onClose,
}: ModalWrapperProps) {
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-grayscale-900 bg-opacity-65 flex justify-center items-center h-[100%] w-[100%]"
      onClick={onClose}
    >
      <div onClick={handleModalClick}>{children}</div>
    </div>
  );
}
