import { CompDropdownOptionProps } from './types';
import { useFocusOption } from '@/hooks/dropdown/useFocusOption';

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
      className={`${className} ${selected ? 'font-semibold' : ''}`}
      value={value}
      data-value={value}
      tabIndex={0}
    >
      {children}
    </li>
  );
}
