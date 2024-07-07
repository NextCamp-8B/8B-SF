'use client';

import ButtonBase from '@/components/shared/buttons/ButtonBase';
import Chart from '@/components/shared/chart';

/**
 * @description
 *  - 반응형 대응 전까지 1214px 고정
 *  - API 작업 전까지 임시 데이터 사용
 */
export default function Interest() {
  const name = '최석호';
  const stockInterest = Array(150).fill(0);

  return (
    <div className="w-full max-w-[1214px] min-w-[1214px] flex flex-col gap-6">
      <div className="flex justify-between">
        <h2 className="h4 font-semibold text-primary-900">
          <span>{name}</span>님의 관심종목
        </h2>
        <ButtonBase
          className={`b5 font-normal px-14 
            py-2 rounded-lg min-w-[189px] hover:bg-opacity-90 
            active:bg-opacity-95 text-grayscale-0 bg-primary-900 
            hover:opacity-90 active:opacity-95`}
        >
          관심종목 추가
        </ButtonBase>
      </div>
      <section className="flex flex-wrap gap-[19px]">
        {stockInterest.map(() => (
          <Chart>
            <Chart.SpecificStockAIReport />
          </Chart>
        ))}
      </section>
    </div>
  );
}
