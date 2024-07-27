import { Stock } from '@/types/stock';
import StockListItem from '../StockListItem';
import ButtonBase from '../buttons/ButtonBase';
import StockAIReportChart from './StockAIReportChart';
import Rechart from './rechart';
import { UUID } from 'crypto';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useGetChartData } from '@/hooks/useGetChartData';

const radarStatus = {
  width: 180,
  height: 176,
  cx: 78.4,
  cy: 96,
  outerRadius: 112,
  polarRadius: [54, 69, 84, 99, 114],
  numberOfSides: 5,
};

const btnCommonClass =
  'b4 font-normal px-[43px] py-4 rounded-lg min-w-[160px] hover:bg-opacity-90 active:bg-opacity-95';

export default function SpecificStockAIReport({
  stock,
  handleDeleteInterest = () => {},
  type = 'interest',
  isEn = false,
}: {
  stock: Stock;
  handleDeleteInterest?: (stockId: UUID) => void;
  type?: 'home' | 'interest';
  isEn?: boolean;
}) {
  const chartData = useGetChartData(stock.stock_id as UUID);
  const {
    stockPrice,
    investmentIndex,
    profitability,
    growth,
    interestLevel,
  } = chartData;
  const width = isEn ? 'min-w-[328px]' : 'w-[328px]';
  const t = useTranslations();

  const radarData = [
    {
      subject: t('RadarChart.stock_price'),
      score: stockPrice.score,
      B: 100,
      fullMark: 100,
    },
    {
      subject: t('RadarChart.investment_index'),
      score: investmentIndex.score,
      B: 100,
      fullMark: 100,
    },
    {
      subject: t('RadarChart.interest_level'),
      score: interestLevel.score,
      B: 100,
      fullMark: 100,
    },
    {
      subject: t('RadarChart.growth'),
      score: growth.score,
      B: 100,
      fullMark: 100,
    },
    {
      subject: t('RadarChart.profitability'),
      score: profitability.score,
      B: 100,
      fullMark: 100,
    },
  ];

  return (
    <Rechart className={`${width} pb-4`}>
      <div className="flex flex-col gap-4">
        <StockListItem stock={stock} type="interest" />
        <StockAIReportChart
          chartData={chartData}
          radarData={radarData}
          radarStatus={radarStatus}
          specific
        />
      </div>
      {type === 'interest' && (
        <Rechart.RadarBtnWrapper className="min-w-[328px] flex gap-2 justify-center pt-4">
          <ButtonBase
            onClick={() =>
              handleDeleteInterest(stock.stock_id as UUID)
            }
            className={`${btnCommonClass} text-grayscale-600 bg-grayscale-200 hover:opacity-70 active:opacity-90`}
          >
            {t('RadarChart.delete')}
          </ButtonBase>
          <Link href={`/stock/${stock.stock_id}`}>
            <ButtonBase
              className={`${btnCommonClass} text-grayscale-0 bg-primary-900 hover:opacity-90 active:opacity-95`}
            >
              {t('RadarChart.view_details')}
            </ButtonBase>
          </Link>
        </Rechart.RadarBtnWrapper>
      )}
    </Rechart>
  );
}
