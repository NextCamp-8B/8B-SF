import { SelectedOption } from '@/components/shared/dropdown/types';
import { useState } from 'react';

type UseDropdownOptionsKeyProps = {
  options: Array<SelectedOption>;
  handleSelected: (value: string) => void;
  setIsOpen: (isOpen: boolean) => void;
};

/**
 * @function useDropdownOptionsKey
 * @description
 * 드롭다운 옵션의 키보드 이벤트를 처리
 *
 * @param options - 드롭다운 옵션의 배열
 * @param handleSelected - 옵션 선택을 처리하는 함수
 * @param setIsOpen - 드롭다운의 열림 상태를 설정하는 함수
 */
export function useDropdownOptionsKey({
  options,
  handleSelected,
  setIsOpen,
}: UseDropdownOptionsKeyProps) {
  const [focusedIndex, setFocusedIndex] = useState(0);

  function handleOptionsKey(
    e: React.KeyboardEvent<HTMLUListElement>,
    datasetValue: string,
  ) {
    const isMessage = options[0]?.value === '';
    const startIndex = isMessage ? 1 : 0;
    const len = options.length;

    switch (e.key) {
      case 'ArrowUp':
        setFocusedIndex((prevIndex) =>
          Math.max(prevIndex - 1, startIndex),
        );
        break;
      case 'ArrowDown':
        setFocusedIndex((prevIndex) =>
          Math.min(prevIndex + 1, len - 1),
        );
        break;
      case 'Enter':
      case 'Tab':
        handleSelected(datasetValue);
        setIsOpen(false);
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      default:
        break;
    }
  }

  return { focusedIndex, handleOptionsKey };
}
