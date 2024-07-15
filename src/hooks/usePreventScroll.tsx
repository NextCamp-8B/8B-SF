import { useEffect, RefObject, useRef } from 'react';

/**
 * 특정 엘리먼트의 스크롤을 방지하는 훅
 *
 * @example
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
 */
export function usePreventScroll() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const scrollY = window.scrollY;
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    element.style.position = 'fixed';
    element.style.top = `-${scrollY}px`;
    element.style.width = '100%';

    return () => {
      document.body.style.overflow = originalOverflow;
      element.style.position = '';
      element.style.top = '';
      element.style.width = '';
      window.scrollTo(0, scrollY);
    };
  }, [ref]);

  return { ref };
}
