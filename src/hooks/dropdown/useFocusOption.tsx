import { useEffect, useRef } from 'react';

/**
 * @function useFocusOption
 * @description
 * 드롭다운 메뉴 내에서 특정 옵션에 대한 포커싱 관리
 *
 * @param focusedIndex - 현재 포커스된 옵션의 인덱스
 * @param index - 해당 훅이 관리하고 있는 옵션의 인덱스
 *
 * @example
    export default function CompDropDownOption({
      children,
      className,
      value,
      selected = false,
      index,
      focusedIndex,
    }: CompDropdownOptionProps) {
      const { focusedRef } = useFocusOption(focusedIndex, index);

      return (
        <li
          ref={focusedRef}
          className={`${className} ${selected ? 'bg-primary-50' : ''}`}
          value={value}
          data-value={value}
          tabIndex={0}
        >
          {children}
        </li>
      );
    }
 */
export function useFocusOption(focusedIndex: number, index: number) {
  const focusedRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (focusedIndex === index) {
      focusedRef.current?.focus();
    }
  }, [focusedIndex, index]);

  return { focusedRef };
}
