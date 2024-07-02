import { useEffect, useState } from 'react';
import CompositeDropdown from './compositeDropdown';
import { DefaultDropdownProps, SelectedOption } from './types';
import { handlePanelKey } from '@/utils/dropdown/handlePanelKey';
import { useDropdownOptionsKey } from '@/hooks/dropdown/useDropdownOptionsKey';
import { renderDropdownOptions } from './renderDropdownDoptions';
import { useSelectedOption } from '@/hooks/dropdown/useSelectedOption';

/**
 * 기본으로 사용될 Dropdown 컴포넌트
 * @description
 * initialOptions 
 *   - 배열의 0번 인덱스에 들어갈 Option 객체의 value가 빈 문자열 ("")이라면
 *     - 해당 객체의 text 값은 기본 안내 메시지가 되며
 *     - Panel에서 해당 Option 객체 선택 불가  
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
                { value: '', text: '탈퇴사유를 선택해주세요.' },
                { value: 'test 1', text: 'text 1' },
                { value: 'test 2', text: 'text 2' },
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
    if (selectedOption.value !== '') {
      selectOption(selectedOption);
    }
  }, [selectedOption]);

  const selectedValue = selectedOption?.value !== '';
  return (
    <>
      <CompositeDropdown
        className="w-[386px] cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
        handlePanelKey={handlePanelKey}
        isOpen={isOpen}
      >
        <CompositeDropdown.Label className="b4 font-medium text-primary-900">
          {label}
        </CompositeDropdown.Label>
        <CompositeDropdown.Select
          // className={selectedOption?.value === '' ? '' : ''}
          classNameWrapper={
            'flex border border-grayscale-300 rounded-lg w-full p-4 gap-4 my-1 hover:bg-grayscale-100'
          }
          classNameSelected={`b4 font-normal text-grayscale-${
            selectedValue ? '900' : '400'
          } flex-grow-[929] flex-shrink flex-basis-0`}
          classNameSVG={`transform transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          } text-grayscale-${
            selectedValue ? '900' : '400'
          } w-6 h-6 flex-grow-[71] flex-shrink flex-basis-0`}
        >
          {selectedOption?.text === undefined
            ? ''
            : selectedOption.text}
        </CompositeDropdown.Select>
        {isOpen && (
          <CompositeDropdown.Panel
            className={`border border-grayscale-300 rounded-lg`}
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
