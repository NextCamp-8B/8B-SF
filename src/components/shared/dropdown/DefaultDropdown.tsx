import { useEffect, useState } from 'react';
import CompositeDropdown from './compositeDropdown';
import { DefaultDropdownProps, SelectedOption } from './types';
import { handlePanelKey } from '@/utils/dropdown/handlePanelKey';
import { useDropdownOptionsKey } from '@/hooks/dropdown/useDropdownOptionsKey';
import { renderDropdownOptions } from './renderDropdownDoptions';
import { useSelectedOption } from '@/hooks/dropdown/useSelectedOption';

/**
 * 기본으로 사용될 Dropdown 컴포넌트
 *
 * @example
      export default function CSH() {
        function selectOption(selected: SelectedOption) {
          console.log(selected);
        }

        return (
          <>
            <Dropdown.Default
              label="테스트"
              initialOptions={[
                { value: 'test 1', text: 'text 1' },
                { value: 'test 2', text: 'text 2', selected: true },
              ]}
              selectOption={selectOption}
            />
          </>
        );
      }
 */
export default function DefaultDropdown({
  label,
  initialOptions = [],
  selectOption,
}: DefaultDropdownProps) {
  const { selectedDataset, selectedOption, handleSelected } =
    useSelectedOption(initialOptions);
  const [isOpen, setIsOpen] = useState(false);
  const [options] = useState<Array<SelectedOption>>(initialOptions);
  const { focusedIndex, handleOptionsKey } = useDropdownOptionsKey({
    options,
    handleSelected,
    setIsOpen,
  });

  useEffect(() => {
    selectOption(selectedOption);
  }, [selectedOption]);

  return (
    <>
      <CompositeDropdown
        onClick={() => setIsOpen((prev) => !prev)}
        handlePanelKey={handlePanelKey}
        isOpen={isOpen}
      >
        <CompositeDropdown.Label>{label}</CompositeDropdown.Label>
        <CompositeDropdown.Select>
          {selectedOption?.text === undefined
            ? ''
            : selectedOption.text}
        </CompositeDropdown.Select>
        {isOpen && (
          <CompositeDropdown.Panel
            onClick={handleSelected}
            handleOptionsKey={handleOptionsKey}
          >
            {() =>
              renderDropdownOptions(
                options,
                selectedDataset,
                focusedIndex,
              )
            }
          </CompositeDropdown.Panel>
        )}
      </CompositeDropdown>
    </>
  );
}
