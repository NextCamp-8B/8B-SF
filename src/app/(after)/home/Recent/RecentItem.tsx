import AI from '@/assets/icons/ai.svg';
import StockListItem from '@/components/shared/StockListItem';
import Link from 'next/link';
type recentProps = {
  name: string;
  subname: string;
  value: string;
  tmp1: number;
  tmp2: number;
};

export default function RecentItem({
  stocks,
}: {
  stocks: recentProps[];
}) {
  return (
    <>
      {stocks &&
        stocks.map((stock, i) => (
          <div className="min-w-[494px] flex flex-col" key={i}>
            {/* 상세주식페이지 구성뒤 바꿀것 */}
            <Link href={`/stock/${i}`}>
              <StockListItem
                stock={stock}
                icon={
                  <AI
                    className="w-9 h-9 text-grayscale-0"
                    type="find"
                  />
                }
              />
            </Link>
          </div>
        ))}
    </>
  );
}
