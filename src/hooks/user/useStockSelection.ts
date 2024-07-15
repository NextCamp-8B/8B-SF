import { useState } from 'react';
import { SelectedOption } from '@/components/shared/dropdown/types';

export const useStockSelection = (
  initialStock = '',
  options: SelectedOption[],
) => {
  const [stock, setStock] = useState(initialStock);
  const [selectedDataset, setSelectedDataset] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(0);

  const handleSelected = (value: string) => {
    const selectedOption = options.find(
      (option) => option.value === value,
    );

    if (selectedOption) {
      const newStock = `#${selectedOption.text}`;
      if (stock.includes(newStock)) {
        setStock((prevStock) =>
          prevStock.replace(newStock, '').trim(),
        );
        setSelectedDataset('');
      } else {
        setStock((prevStock) =>
          prevStock ? `${prevStock} ${newStock}` : newStock,
        );
        setSelectedDataset(value);
      }
    }
  };

  const handleOptionsKey = (e: React.KeyboardEvent) => {
    // 키보드 네비게이션 핸들링
    // 예: 위/아래 키로 focusedIndex 변경 등
  };

  return {
    stock,
    selectedDataset,
    focusedIndex,
    setFocusedIndex,
    handleSelected,
    handleOptionsKey,
  };
};
