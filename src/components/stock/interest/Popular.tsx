import StockListItem from '@/components/shared/StockListItem';
import { Stock } from '@/types/stock';
import { useTranslations } from 'next-intl';

export default function Popular({
  popularStocks,
}: {
  popularStocks: Array<Stock>;
}) {
  const t = useTranslations();
  if (popularStocks.length === 0) return null;

  return (
    <div>
      <h3 className="b3 font-medium text-primary-900 mb-4">
        {t('InterestStock.popular_search')}
      </h3>
      <ol className="border border-primary-100 pr-6 rounded-lg pl-0 max-h-[290px] py-6 flex flex-col flex-wrap">
        {popularStocks.map(
          (stock: Stock, i: number) =>
            i < 6 && (
              <li
                key={stock.stock_id}
                className={`flex items-center pl-6 via-grayscale-400`}
              >
                <span className="w-[18px]">{i + 1}</span>
                <StockListItem stock={stock} type="popular" />
              </li>
            ),
        )}
      </ol>
    </div>
  );
}
