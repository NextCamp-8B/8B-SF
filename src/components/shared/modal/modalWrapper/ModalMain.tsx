import { createPortal } from 'react-dom';

export default function ModalMain({
  children,
  isOpen = false,
}: {
  children: React.ReactNode;
  isOpen?: boolean;
}) {
  if (!isOpen) return null;

  const el = document.getElementById('root-modal') as HTMLElement;

  return createPortal(
    <div
      role="dialog"
      aria-modal={isOpen}
      aria-labelledby="modal-title"
    >
      {children}
    </div>,
    el,
  );
}
