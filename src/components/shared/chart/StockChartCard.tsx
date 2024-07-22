import { useTranslations } from 'next-intl';
import Rechart from './rechart';
import AreaBtn from './rechart/AreaBtn';
import { businessAPI } from '@/service/apiInstance';
import { useRouteAreaChart } from '@/hooks/useRouteAreaChart';
import { AreaChartData, Duration } from './types';
import { useEffect, useState } from 'react';

export default function StockChartCard({
  as,
  stockCode,
  name,
}: {
  as?: React.ElementType;
  stockCode: string;
  name: string;
}) {
  const [chartData, setChartData] = useState<AreaChartData>({
    amount: '',
    periodType: '',
    processed: [{ avgPrice: '', localDate: '' }],
  });
  const { getPayDuration } = businessAPI;
  const { handleRoute } = useRouteAreaChart();
  const t = useTranslations();

  useEffect(() => {
    handleRoute({ amount: 1, unit: 'day' });
    if (stockCode && name) {
      getPayDuration({
        amount: 1,
        unit: 'day',
        companies: stockCode,
        name,
      }).then((res) => setChartData(res));
    }
  }, [stockCode, name, getPayDuration, handleRoute]);

  const handleDuration = (
    e:
      | React.MouseEvent<HTMLUListElement>
      | React.KeyboardEvent<HTMLUListElement>,
  ) => {
    const target = e.target as HTMLLIElement;
    if (!target.dataset || !stockCode) return;
    if (
      e.type === 'click' ||
      (e.type === 'keydown' &&
        (e as React.KeyboardEvent).key === 'Enter')
    ) {
      const amount = Number(target.dataset.amount);
      const unit = target.dataset.unit as 'day' | 'month' | 'year';
      if (isNaN(amount) || !unit) {
        console.error(
          `Invalid dataset values: ${amount} ${typeof amount}, ${unit} ${typeof unit}`,
        );
        return;
      }
      const duration: Duration = {
        amount,
        unit,
      };
      handleRoute(duration);
      getPayDuration({
        ...duration,
        companies: stockCode,
        name,
      }).then((res) => setChartData(res));
    }
  };

  return (
    <Rechart>
      <div className="flex items-center justify-between pr-[8.439px] mb-[17px]">
        <Rechart.Label
          as={as}
          className="b1 font-semibold text-primary-900"
        >
          {t('Stock.area_chart')}
        </Rechart.Label>
        <Rechart.AreaBtnWrapper
          className="flex items-center"
          onClick={handleDuration}
        >
          <AreaBtn duration={{ amount: 1, unit: 'day' }}>
            {t('Stock.one_day')}
          </AreaBtn>
          <AreaBtn duration={{ amount: 3, unit: 'month' }}>
            {t('Stock.three_months')}
          </AreaBtn>
          <AreaBtn duration={{ amount: 1, unit: 'month' }}>
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
      <Rechart.Area data={chartData} />
    </Rechart>
  );
}
