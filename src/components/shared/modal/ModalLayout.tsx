import { useEffect } from 'react';
import ModalWrapper from './modalWrapper';
import Closing from '@/assets/icons/closing.svg';
import { useFocusTrap } from '@/hooks/useFocusTrap';

export default function ModalLayout({
  title,
  isOpen,
  handleIsOpen,
  children,
  width,
}: {
  title: string;
  isOpen: boolean;
  handleIsOpen: () => void;
  children: React.ReactNode;
  width?: string;
}) {
  const { focusRef } = useFocusTrap(isOpen);

  return (
    <ModalWrapper isOpen={isOpen}>
      <ModalWrapper.DimmedLayer
        className="fixed bg-modal-dim inset-0 z-50 "
        handleIsOpen={handleIsOpen}
      />
      <ModalWrapper.Box
        ref={focusRef}
        className={`p-10 fixed top-2/4 left-2/4 z-50 
        bg-grayscale-0 translate-center 
        border-none rounded-[32px] shadow-md ${width}`}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1 flex justify-center">
            <ModalWrapper.Title className="b1 font-bold text-primary-900">
              {title}
            </ModalWrapper.Title>
          </div>
          <button
            onClick={handleIsOpen}
            className="flex-none"
            aria-label="Close modal"
          >
            <Closing className="text-icon-closing w-6 h-6" />
          </button>
        </div>
        {children}
      </ModalWrapper.Box>
    </ModalWrapper>
  );
}
