// Input에 검색을 했을 때 표시되는 페이지

import FindStockItem from './FindStockItem';
import FindNews from '../search/FindNews';
import { TMP_STOCKS, TMP_NEWS_LIST } from '@/constants';

export default function FindStock({
  searchText,
}: {
  searchText: string;
}) {
  return (
    <div className="py-4">
      <div className="w-[590px]">
        <FindStockItem
          tmpStocks={TMP_STOCKS}
          searchText={searchText}
        />
      </div>
      <div className="py-4">
        <FindNews
          tmpNews={TMP_NEWS_LIST}
          tmpStocks={TMP_STOCKS}
          searchText={searchText}
        />
      </div>
    </div>
  );
}
