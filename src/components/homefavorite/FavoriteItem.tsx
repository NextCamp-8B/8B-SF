import StockListItem from '@/components/shared/StockListItem';
import { Stock } from '@/types/stock';

export default function FavoriteItem({
  stocks,
}: {
  stocks: Stock[];
}) {
  return (
    <>
      {stocks &&
        stocks.map((stock, i) => (
          <div
            className="min-w-[494px] flex flex-col hover:bg-primary-50 hover:rounded-lg hover:scale-105 duration-500 px-4"
            key={i}
          >
            {/* 관심 종목 데이터 추가 */}
            <StockListItem stock={stock} />
          </div>
        ))}
    </>
  );
}
