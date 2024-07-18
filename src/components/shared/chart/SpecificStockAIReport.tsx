import { Stock } from '@/types/stock';
import StockListItem from '../StockListItem';
import ButtonBase from '../buttons/ButtonBase';
import StockAIReportChart from './StockAIReportChart';
import Rechart from './rechart';
import { UUID } from 'crypto';
import Link from 'next/link';

const radarStatus = {
  width: 162.57,
  height: 176,
  cx: 78.4,
  cy: 96,
  outerRadius: 112,
  polarRadius: [54, 69, 84, 99, 114],
  numberOfSides: 5,
};

const radarData = [
  {
    subject: '주가',
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: '투자지수',
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: '관심도',
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: '성장성',
    A: 99,
    B: 100,
    fullMark: 150,
  },
  {
    subject: '수익성',
    A: 85,
    B: 90,
    fullMark: 150,
  },
];
const btnCommonClass =
  'b4 font-normal px-[43px] py-4 rounded-lg min-w-[160px] hover:bg-opacity-90 active:bg-opacity-95';

export default function SpecificStockAIReport({
  stock,
  handleDeleteInterest,
}: {
  stock: Stock;
  handleDeleteInterest: (stockId: UUID) => void;
}) {
  return (
    <Rechart className={'w-[328px] pb-4'}>
      <div className="flex flex-col gap-4">
        <StockListItem stock={stock} type="interest" />
        <StockAIReportChart
          radarData={radarData}
          radarStatus={radarStatus}
          specific
        />
      </div>
      <Rechart.RadarBtnWrapper className="w-[328px] flex gap-2 justify-center pt-4">
        <ButtonBase
          onClick={() => handleDeleteInterest(stock.stock_id as UUID)}
          className={`${btnCommonClass} text-grayscale-600 bg-grayscale-200 hover:opacity-70 active:opacity-90`}
        >
          삭제하기
        </ButtonBase>
        <Link href={`/stock/${stock.stock_id}`}>
          <ButtonBase
            className={`${btnCommonClass} text-grayscale-0 bg-primary-900 hover:opacity-90 active:opacity-95`}
          >
            자세히 보기
          </ButtonBase>
        </Link>
      </Rechart.RadarBtnWrapper>
    </Rechart>
  );
}
