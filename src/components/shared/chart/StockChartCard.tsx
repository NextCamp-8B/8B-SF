import { useTranslations } from 'next-intl';
import Rechart from './rechart';
import AreaBtn from './rechart/AreaBtn';

export default function StockChartCard({
  as,
}: {
  as?: React.ElementType;
}) {
  const t = useTranslations();

  return (
    <Rechart>
      <div className="flex items-center justify-between pr-[8.439px] mb-[17px]">
        <Rechart.Label
          as={as}
          className="b1 font-semibold text-primary-900"
        >
          {t('Stock.area_chart')}
        </Rechart.Label>
        <Rechart.AreaBtnWrapper className="flex items-center">
          <AreaBtn duration={{ amount: 1, unit: 'day' }}>
            {t('Stock.one_day')}
          </AreaBtn>
          <AreaBtn duration={{ amount: 3, unit: 'month' }}>
            {t('Stock.three_months')}
          </AreaBtn>
          <AreaBtn duration={{ amount: 1, unit: 'year' }}>
            {t('Stock.one_year')}
          </AreaBtn>
          <AreaBtn duration={{ amount: 3, unit: 'year' }}>
            {t('Stock.three_years')}
          </AreaBtn>
          <AreaBtn duration={{ amount: 10, unit: 'year' }}>
            {t('Stock.ten_years')}
          </AreaBtn>
        </Rechart.AreaBtnWrapper>
      </div>
      <Rechart.Area />
    </Rechart>
  );
}
