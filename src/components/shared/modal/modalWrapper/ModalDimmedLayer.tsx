import { usePreventScroll } from '@/hooks/usePreventScroll';

interface ModalDimmedLayerProps {
  className?: string;
  handleIsOpen: () => void;
}

function ModalDimmedLayer({
  className,
  handleIsOpen,
}: ModalDimmedLayerProps) {
  const { ref } = usePreventScroll();

  return (
    <div ref={ref} className={className} onClick={handleIsOpen} />
  );
}

export default ModalDimmedLayer;
