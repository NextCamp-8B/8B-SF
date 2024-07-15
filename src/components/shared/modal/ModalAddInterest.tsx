import ModalLayout from './ModalLayout';

export default function ModalAddInterest({
  isOpen,
  handleIsOpen,
}: {
  isOpen: boolean;
  handleIsOpen: () => void;
}) {
  return (
    <ModalLayout
      title="관심 종목 추가"
      isOpen={isOpen}
      handleIsOpen={handleIsOpen}
    >
      <input />
    </ModalLayout>
  );
}
