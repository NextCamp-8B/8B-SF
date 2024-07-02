import { handleDropdownStatus } from '@/utils/dropdown/handleDropdownStatus';
import { CompDropdownPanelProps } from './types';

export default function CompDropDownPanel({
  children,
  handleOptionsKey,
  onClick,
  className,
}: CompDropdownPanelProps) {
  return (
    <ul
      className={className}
      onClick={(e) =>
        handleDropdownStatus(e, onClick, handleOptionsKey)
      }
      onKeyDown={(e) =>
        handleDropdownStatus(e, onClick, handleOptionsKey)
      }
    >
      {children()}
    </ul>
  );
}
