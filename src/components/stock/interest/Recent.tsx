import StockListItem from '@/components/shared/StockListItem';
import { Stock } from '@/types/stock';
import { useTranslations } from 'next-intl';

export default function Recent({
  recentStocks,
}: {
  recentStocks: Array<Stock>;
}) {
  if (recentStocks.length === 0) return null;
  const t = useTranslations();

  return (
    <div className="max-w-[714px] min-w-[714px] flex flex-col gap-4 mb-6">
      <div className="flex justify-between items-center">
        <h3 className="b3 font-medium text-primary-900">
          {t('InterestStock.recent_search')}
        </h3>
        <button className="b5 font-medium text-grayscale-600">
          {t('InterestStock.delete_all')}
        </button>
      </div>
      <ul className="flex gap-[20px] overflow-x-auto scrollbar-hide">
        {recentStocks.map((stock) => (
          <li
            key={stock.stock_id}
            className="border border-primary-100 rounded-lg pr-4 flex items-center justify-center"
          >
            <StockListItem stock={stock} type="default" />
          </li>
        ))}
      </ul>
    </div>
  );
}
