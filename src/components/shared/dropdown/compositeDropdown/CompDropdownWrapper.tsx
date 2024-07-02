import { SetIsOpenType } from '../types';

export default function CompDropdownWrapper({
  children,
  onClick,
  handlePanelKey,
  isOpen,
  className,
}: {
  children: React.ReactNode;
  onClick: (isEnter: boolean) => void;
  handlePanelKey: (
    e: React.KeyboardEvent<HTMLUListElement>,
    onClick: (isEnter: boolean) => void,
  ) => void;
  isOpen: boolean;
  className?: string;
}) {
  function handleKeyDown(e: React.KeyboardEvent<HTMLUListElement>) {
    if (!isOpen) {
      handlePanelKey(e, onClick);
    }
  }

  return (
    <section
      className={className}
      onClick={() => onClick(!isOpen)}
      onKeyDown={handleKeyDown}
    >
      {children}
    </section>
  );
}
