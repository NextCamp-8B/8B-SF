import { useEffect, useState } from 'react';
import { SelectedOption } from '@/components/shared/dropdown/types';
type Stock = {
  compare_to_previous_close_price: number;
  description_en: string;
  description_fr: string;
  description_ja: string;
  description_ko: string;
  description_zh: string;
  fluctuations_ratio: number;
  logo_path: string;
  price: number;
  stock_code: string;
  stock_id: string;
  stock_name: string;
  view: number;
};

export const useStockSelection = (initialStock = '') => {
  const [stock, setStock] = useState(initialStock);
  const [selectedDataset, setSelectedDataset] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [options, setOptions] = useState<SelectedOption[]>([]);

  useEffect(() => {
    const fetchStocks = async () => {
      const response = await fetch(
        `/api/search/stock?searchText=${stock}`,
      );

      if (response.ok) {
        const data = await response.json();
        const newStockOptions = data?.map((stock: Stock) => ({
          value: stock.stock_code,
          text: stock.stock_name,
        }));

        setOptions(newStockOptions);
      }
    };
    const debounceTimeout: number = window.setTimeout(() => {
      fetchStocks();
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [stock]);

  const handleSelected = (value: string) => {
    const selectedOption = options.find(
      (item) => item.value === value,
    );
    // 기존의 #으로 시작하지 않는 값들을 제거
    const cleanedStock = stock
      .split(' ')
      .filter((part) => part.startsWith('#'))
      .join(' ');

    if (selectedOption) {
      const newStock = `#${selectedOption.text}`;
      if (cleanedStock.includes(newStock)) {
        setStock((prev) => prev.replace(newStock, '').trim());
        setSelectedDataset('');
      } else {
        setStock((prev) =>
          cleanedStock ? `${cleanedStock} ${newStock}` : newStock,
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
    setStock,
    options,
    selectedDataset,
    focusedIndex,
    setFocusedIndex,
    handleSelected,
    handleOptionsKey,
  };
};
