import React from 'react';
import CompositeDropdown from './compositeDropdown';
import { SelectedOption } from './types';

/**
 * @function renderDropdownOptions
 * @description
 * 드롭다운 옵션들을 렌더링하는 함수
 *
 * @param options - 렌더링할 드롭다운 옵션들의 배열
 * @param selectedDataset - 현재 선택된 데이터셋 값
 * @param focusedIndex - 포커스된 옵션의 인덱스
 *
 * @returns 드롭다운 옵션들을 렌더링한 React 엘리먼트 배열
 *
 * @example
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
export function renderDropdownOptions(
  options: SelectedOption[],
  selectedDataset: string,
  focusedIndex: number,
) {
  return options.map(({ value, text, selected = false }, index) => {
    const isSelected =
      selectedDataset === '' && selected
        ? selected
        : selectedDataset === value;
    const isLastOption = index !== options.length - 1;

    return (
      <CompositeDropdown.Option
        key={value}
        value={value}
        selected={isSelected}
        focusedIndex={focusedIndex}
        index={index}
        className={`hover:bg-grayscale-100 py-4 pl-4 pr-14 b4 font-normal text-grayscale-900 ${
          isLastOption ? 'border-b border-grayscale-100' : ''
        }`}
      >
        {text}
      </CompositeDropdown.Option>
    );
  });
}
