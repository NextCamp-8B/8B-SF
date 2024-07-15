import { useEffect } from 'react';
import ModalWrapper from './modalWrapper';
import Closing from '@/assets/icons/closing.svg';

export default function ModalLayout({
  title,
  isOpen,
  handleIsOpen,
  children,
}: {
  title: string;
  isOpen: boolean;
  handleIsOpen: () => void;
  children: React.ReactNode;
}) {
  return (
    <ModalWrapper isOpen={isOpen}>
      <ModalWrapper.DimmedLayer
        className="fixed bg-modal-dim inset-0 z-50 "
        handleIsOpen={handleIsOpen}
      />
      <ModalWrapper.Box
        className={`p-10 fixed top-2/4 left-2/4 z-50 
        bg-grayscale-0 translate-center 
        border-none rounded-[32px] shadow-md`}
      >
        <div className="flex justify-between items-center">
          <div className="flex-1 flex justify-center">
            <ModalWrapper.Title className="b1 font-bold text-primary-900">
              {title}
            </ModalWrapper.Title>
          </div>
          <button onClick={handleIsOpen} className="flex-none">
            <Closing className="text-icon-closing w-6 h-6" />
          </button>
        </div>
        {children}
      </ModalWrapper.Box>
    </ModalWrapper>
  );
}
