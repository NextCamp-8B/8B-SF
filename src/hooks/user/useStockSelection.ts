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

//#으로 시작하는 문자열 제외 함수
const extractSearchText = (stock: string): string => {
  return stock
    .split(' ')
    .filter((part) => !part.startsWith('#'))
    .join(' ');
};

  useEffect(() => {
    const fetchStocks = async () => {
      const searchText = extractSearchText(stock);
      const response = await fetch(
        `/api/search/stock?searchText=${searchText}`,
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

  function handleOptionsKey(
    e: React.KeyboardEvent<HTMLUListElement>,
    datasetValue: string,
  ) {
    const isMessage = options[0]?.value === '';
    const startIndex = isMessage ? 1 : 0;
    const len = options.length;

    switch (e.key) {
      case 'ArrowUp':
        setFocusedIndex((prevIndex) =>
          Math.max(prevIndex - 1, startIndex),
        );
        break;
      case 'ArrowDown':
        setFocusedIndex((prevIndex) =>
          Math.min(prevIndex + 1, len - 1),
        );
        break;
      case 'Enter':
      case 'Tab':
        handleSelected(datasetValue);
        break;
      case 'Escape':
        break;
      default:
        break;
    }
  }
  
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
