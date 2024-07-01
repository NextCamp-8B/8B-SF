import { SelectedOption } from '@/components/shared/dropdown/types';
import { useState } from 'react';

/**
 * @function useSelectedOption
 * @description
 * 초기 옵션 배열에서 선택된 옵션과 관련된 상태와 핸들러를 관리
 *
 * @param initialOptions - 초기 옵션 배열
 *
 * @returns
 * - selectedDataset: 현재 선택된 옵션의 데이터셋 값
 * - selectedOption: 현재 선택된 옵션 객체
 * - handleSelected: 옵션을 선택할 때 호출할 핸들러 함수
 *
 * @example
    // 아래와 같은 위치에서 사용
    const { selectedDataset, selectedOption, handleSelected } = useSelectedOption(initialOptions);

    const { focusedIndex, handleOptionsKey } = useDropdownOptionsKey({
      options,
      handleSelected,
      setIsOpen,
    });

    useEffect(() => {
      selectOption(selectedOption);
    }, [selectedOption]);

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

 */
export function useSelectedOption(
  initialOptions: Array<SelectedOption>,
) {
  const [selectedDataset, setSelectedDataset] = useState('');
  const [selectedOption, setSelectedOption] = useState(
    initialOptions.find((option) => option.selected) ||
      initialOptions[0],
  );

  function handleSelected(value: string) {
    const selected =
      initialOptions.find((option) => option.value === value) ||
      initialOptions[0];
    setSelectedOption(selected);
    setSelectedDataset(value);
  }

  return { selectedDataset, selectedOption, handleSelected };
}
