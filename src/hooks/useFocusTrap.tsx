import { getFocusableElements } from '@/utils/getFocusableElements';
import { useEffect, useRef } from 'react';

/**
 * 모달 창 내에서 포커스 트랩을 설정하는 훅
 *
 * @param isOpen - 모달이 열려 있는지 여부를 나타내는 값
 * @returns 포커스 트랩을 적용할 ref
 */
export function useFocusTrap(isOpen: boolean) {
  const focusRef = useRef<HTMLDivElement>(null); // 포커스를 트랩할 요소의 ref를 생성
  const previousActiveElement = useRef<Element | null>(null); // 모달이 열리기 전의 포커스된 요소를 저장할 ref를 생성

  useEffect(() => {
    const isModalOpen = isOpen;
    const focusableElements = focusRef.current
      ? getFocusableElements(focusRef.current)
      : [];
    /** 모달 내의 포커스 가능한 요소들의 존재 여부 */
    const hasFocusableElements = focusableElements.length > 0;

    if (isModalOpen && hasFocusableElements) {
      previousActiveElement.current = document.activeElement; // 현재 포커스된 요소를 저장
      focusableElements[0].focus(); // 첫 번째 포커스 가능한 요소에 포커스 설정
    } else if (!isModalOpen && previousActiveElement.current) {
      (previousActiveElement.current as HTMLElement).focus(); // 이전에 포커스된 요소로 포커스 복원
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isModalOpen = focusRef.current;
      const isTabEvent = event.key === 'Tab';
      if (!isModalOpen || !isTabEvent) return;

      const focusableElements = getFocusableElements(
        focusRef.current,
      );
      const focusabelElLen = focusableElements.length;
      // 모달 내의 포커스 가능한 요소유무 확인
      if (focusabelElLen === 0) return; // 포커스 가능한 요소가 없으면 무시

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusabelElLen - 1];

      /**
       * 다음 Tab Key 동작을 위한 함수
       *
       * @description
       *  - Shift Key가 눌렸다면 첫 번째, 눌리지 않았다면 마지막 요소 반환
       *  - 반환된 요소는 Active 상태의 Element 와 비교
       * 
       * @example
          // 첫 번째 Element에서 Shift Key가 눌린 채로 탭 키를 누르면 마지막 Element Focus
          // 마지막 Element에서 Shift Key가 눌리지 않은 채로 탭 키를 누르면 첫 번째 Element Focus
          if (activeElement) {
            checkEdgeEl(!isShiftKey).focus();
            event.preventDefault();
          }
       */
      function checkEdgeEl(isShift: boolean) {
        return isShift ? firstElement : lastElement;
      }

      const isShiftKey = !!event.shiftKey;
      const activeElement =
        document.activeElement === checkEdgeEl(isShiftKey);

      if (activeElement) {
        checkEdgeEl(!isShiftKey).focus();
        event.preventDefault();
      }
    };

    const trapFocus = (event: FocusEvent) => {
      const isOpenModal = focusRef.current;
      const isFocusInsideModal =
        focusRef.current &&
        focusRef.current.contains(event.target as Node);
      if (!isOpenModal || isFocusInsideModal) return;

      const focusableElements = getFocusableElements(
        focusRef.current,
      );
      const hasFocusableElements = focusableElements.length > 0;
      if (hasFocusableElements) {
        focusableElements[0].focus();
      }

      event.preventDefault();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('focus', trapFocus, true); // 포커스 이벤트 리스너 등록 (캡처링 단계에서)

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('focus', trapFocus, true);
    };
  }, []);

  return { focusRef };
}
