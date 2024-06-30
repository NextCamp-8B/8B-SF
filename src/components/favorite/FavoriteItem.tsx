import AI from '@/assets/icons/ai.svg';
import StockListItem from '@/components/shared/StockListItem';
import Link from 'next/link';
type FavoriteProps = {
  id: string;
  name: string;
  subname: string;
  value: string;
  tmp1: number;
  tmp2: number;
  path: string;
};

export default function FavoriteItem({
  stocks,
}: {
  stocks: FavoriteProps[];
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
            <Link href={`/stock/${i}`}>
              <StockListItem
                stock={stock}
                icon={<AI className="w-9 h-9 text-grayscale-0" />}
              />
            </Link>
          </div>
        ))}
    </>
  );
}
