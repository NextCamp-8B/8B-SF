import Rechart from './rechart';
import AreaBtn from './rechart/AreaBtn';

export default function StockChartCard({
  as,
}: {
  as?: React.ElementType;
}) {
  return (
    <Rechart>
      <div className="flex items-center justify-between pr-[8.439px] mb-[17px]">
        <Rechart.Label
          as={as}
          className="b1 font-semibold text-primary-900"
        >
          주가 차트
        </Rechart.Label>
        <Rechart.AreaBtnWrapper className="flex items-center">
          <AreaBtn duration={{ amount: 1, unit: 'day' }}>1일</AreaBtn>
          <AreaBtn duration={{ amount: 3, unit: 'month' }}>
            3개월
          </AreaBtn>
          <AreaBtn duration={{ amount: 1, unit: 'year' }}>
            1년
          </AreaBtn>
          <AreaBtn duration={{ amount: 3, unit: 'year' }}>
            3년
          </AreaBtn>
          <AreaBtn duration={{ amount: 10, unit: 'year' }}>
            10년
          </AreaBtn>
        </Rechart.AreaBtnWrapper>
      </div>
      <Rechart.Area />
    </Rechart>
  );
}
