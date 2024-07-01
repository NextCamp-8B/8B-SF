import { handleDropdownStatus } from '@/utils/dropdown/handleDropdownStatus';
import { CompDropdownPanelProps } from './types';

export default function CompDropDownPanel({
  children,
  handleOptionsKey,
  onClick,
}: CompDropdownPanelProps) {
  return (
    <ul
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
