import { Stock } from '@/types/stock';
import StockListItem from '../StockListItem';
import ButtonBase from '../buttons/ButtonBase';
import StockAIReportChart from './StockAIReportChart';
import Rechart from './rechart';

const radarStatus = {
  width: 156.57,
  height: 176,
  cx: 78.4,
  cy: 93,
  outerRadius: 113,
  polarRadius: [55, 70, 85, 100, 115],
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

/**
 * - StockListItem 컴포넌트 임시 사용 (소통 예정)
 */
export default function SpecificStockAIReport() {
  const stockTmp: Stock = {
    stock_id: 'tmp',
    stock_name: '애플',
    stock_code: 'tmp',
    logo_path: 'tmp',
    fluctuations_ratio: 1,
    price: 1,
    compare_to_previous_close_price: 1,
  };
  return (
    <Rechart className={'w-[328px] pb-4'}>
      {/* <div className="w-[328px] h-[56px]">애플</div> */}
      <StockListItem stock={stockTmp} type="default" />
      <StockAIReportChart
        radarData={radarData}
        radarStatus={radarStatus}
        specific
      />
      <Rechart.RadarBtnWrapper className="w-[328px] flex gap-2 justify-center pt-4">
        <ButtonBase
          className={`${btnCommonClass} text-grayscale-600 bg-grayscale-200 hover:opacity-70 active:opacity-90`}
        >
          삭제하기
        </ButtonBase>
        <ButtonBase
          className={`${btnCommonClass} text-grayscale-0 bg-primary-900 hover:opacity-90 active:opacity-95`}
        >
          자세히 보기
        </ButtonBase>
      </Rechart.RadarBtnWrapper>
    </Rechart>
  );
}
