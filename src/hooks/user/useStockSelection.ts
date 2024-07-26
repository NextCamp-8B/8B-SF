import { useEffect, useState } from 'react';
import { SelectedOption } from '@/components/shared/dropdown/types';
import { businessAPI } from '@/service/apiInstance';
import { Stock } from '@/types/stock';
import { UUID } from 'crypto';
import { stockList } from '@/constants';

type SelectStock = {
  text: string;
  value: string;
};

export const useStockSelection = (userId?: UUID) => {
  const [stock, setStock] = useState<SelectStock[]>([]);
  const [searchText, setSearchText] = useState('');
  const [selectedDataset, setSelectedDataset] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [options, setOptions] = useState<SelectedOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { getInterestStock } = businessAPI;

  // 유저 기존 관심 종목 가져오기
  const getInterest = () => {
    if (!isLoading && userId) {
      setIsLoading(true);
      getInterestStock({ userId, page: 1, size: 17 })
        .then((stocksRes) => {
          if (stocksRes.length !== 0) {
            const stockArray: SelectStock[] = stocksRes.map(
              ({ stock }: { stock: Stock }) => ({
                text: `#${stock.stock_name}`,
                value: stock.stock_id,
              }),
            );
            setStock(stockArray);

            const userStock = stocksRes
              .map(
                ({ stock }: { stock: Stock }) =>
                  `#${stock.stock_name}`,
              )
              .join(' ');
            setSearchText(userStock);
          }
          setIsLoading(false);
        })
        .catch((e) => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    if (userId) {
      getInterest();
    }
  }, [userId]);

  // stock 상태가 변경될 때마다 searchText를 업데이트
  useEffect(() => {
    const updatedSearchText = stock
      .map((stock) => stock.text)
      .join(' ');
    setSearchText(updatedSearchText);
  }, [stock]);

  //#으로 시작하는 문자열 제외 함수
  const extractSearchText = (stock: string): string => {
    return stock
      .split(' ')
      .filter((part) => !part.startsWith('#'))
      .join(' ');
  };

  useEffect(() => {
    const fetchStocks = async () => {
      const text = extractSearchText(searchText);
      const response = await fetch(
        `/api/search/stock?searchText=${text}`,
      );

      if (response.ok) {
        const data = await response.json();
        const newStockOptions = data?.map((stock: Stock) => ({
          value: stock.stock_id,
          text: stock.stock_name,
        }));

        setOptions(newStockOptions);
      }
    };
    const debounceTimeout: number = window.setTimeout(() => {
      fetchStocks();
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [searchText]);

  const handleSelected = (value: string) => {
    const selectedOption = options.find(
      (item) => item.value === value,
    );

    if (selectedOption) {
      const newStock = {
        text: `#${selectedOption.text}`,
        value: selectedOption.value,
      };
      console.log('value', value);
      setStock((prevStock) => {
        // 현재 searchText와 일치하지 않는 prevStock 항목을 필터링하여 제거
        const filteredPrevStock = prevStock.filter((stockItem) =>
          searchText.includes(stockItem.text),
        );
        if (filteredPrevStock.length < 1) {
          return [newStock];
        }
        const exists = filteredPrevStock?.find(
          (stockItem) => stockItem.value === value,
        );
        let updatedStock;
        if (exists) {
          updatedStock = filteredPrevStock.filter(
            (stockItem) => stockItem.value !== value,
          );
        } else {
          updatedStock = [...filteredPrevStock, newStock];
        }
        return updatedStock;
      });
      setSelectedDataset(value);
    }
  };

  // 유효하지 않은 주식 값 제거
  const validateAndUpdateStock = (searchText: string) => {
    const validStocks = searchText
      .split(' ')
      .filter(
        (part) => part.startsWith('#') && stockList.includes(part),
      ) // #으로 시작하고 유효한 주식인지 검사
      .join(' ');

    return validStocks;
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
    searchText,
    isLoading,
    setSearchText,
    options,
    selectedDataset,
    focusedIndex,
    setFocusedIndex,
    handleSelected,
    handleOptionsKey,
    validateAndUpdateStock,
  };
};
