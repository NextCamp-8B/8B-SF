import AI from '@/assets/icons/ai.svg';
import StockListItem from '@/components/shared/StockListItem';
import Link from 'next/link';
import { Stock } from '@/types/stock';

export default function RecentItem({ stocks }: { stocks: Stock[] }) {
  return (
    <>
      {stocks &&
        stocks.map((stock, i) => (
          <div
            className="min-w-[494px] flex flex-col hover:bg-primary-50 hover:rounded-lg hover:scale-105 duration-500 px-4"
            key={i}
          >
            {/* 상세주식페이지 구성뒤 바꿀것 */}
            <Link href={`/stock/${i}`}>
              <StockListItem stock={stock} />
            </Link>
          </div>
        ))}
    </>
  );
}
