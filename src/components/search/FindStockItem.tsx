import { useEffect, useState } from 'react';
import StockListItem from '../shared/StockListItem';
import Wrapper from '../shared/Wrapper';
import AI from '@/assets/icons/ai.svg';
import NotFind from './NotFind';
import MoreData from './MoreData';
import Link from 'next/link';
import SearchHeading from './SearchHeading';

export default function FindStockItem({
  tmpStocks,
  searchText,
}: any) {
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredStocks = tmpStocks.filter(
    (stock: any) =>
      stock.name.includes(searchText) ||
      stock.subname.includes(searchText),
  );

  // 검색어 변경 시, 목록 초기화
  useEffect(() => {
    setVisibleCount(6);
  }, [searchText]);

  // 검색 시, 필터링 중복 방지
  const evenIndexedStocks = filteredStocks.filter(
    (_: any, idx: number) => idx % 2 === 0,
  );
  const oddIndexedStocks = filteredStocks.filter(
    (_: any, idx: number) => idx % 2 === 1,
  );

  // 현재 표시되는 항목만 슬라이싱
  const visibleEvenStocks = evenIndexedStocks.slice(
    0,
    visibleCount / 2,
  );
  const visibleOddStocks = oddIndexedStocks.slice(
    0,
    visibleCount / 2,
  );

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  return (
    <>
      <div className="flex items-center">
        <SearchHeading> 주식 </SearchHeading>
        <span className="text-sm font-medium text-grayscale-600 underline">
          {`(${filteredStocks.length})`}
        </span>
      </div>
      {filteredStocks.length > 0 ? (
        <Wrapper width="590px" padding="p-6">
          <div className="w-[542px] flex justify-center gap-4">
            <div className="w-[263px] flex justify-start flex-col">
              {visibleEvenStocks.map((stock: any) => (
                <Link href={`/stock/${stock.id}`}>
                  <StockListItem
                    key={stock.id}
                    stock={stock}
                    icon={
                      <AI
                        className="w-9 h-9 text-grayscale-0"
                        type="find"
                      />
                    }
                    type="find"
                  />
                </Link>
              ))}
            </div>
            <div className="w-[263px] flex justify-start flex-col">
              {visibleOddStocks.map((stock: any) => (
                <Link href={`/stock/${stock.id}`}>
                  <StockListItem
                    key={stock.id}
                    stock={stock}
                    icon={
                      <AI
                        className="w-9 h-9 text-grayscale-0"
                        type="find"
                      />
                    }
                    type="find"
                  />
                </Link>
              ))}
            </div>
          </div>
          <div className="pt-3">
            <MoreData
              onClick={handleLoadMore}
              isVisible={visibleCount < filteredStocks.length}
            />
          </div>
        </Wrapper>
      ) : (
        <Wrapper width="590px" padding="p-6">
          <NotFind type="stock" />
        </Wrapper>
      )}
    </>
  );
}
