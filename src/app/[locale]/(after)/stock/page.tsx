import AllStocks from '@/components/stock/AllStocks';
import LimitStocks from '@/components/stock/LimitStocks';

export default function Stock() {
  return (
    <>
      <main className="flex items-center justify-center w-full flex-col gap-12">
        <div className="w-[1200px] flex gap-5">
          <div className="flex flex-col w-full flex-1">
            <div className="h4 font-bold text-primary-900">
              급상승 종목
            </div>
            <LimitStocks type="increase" />
          </div>
          <div className="flex flex-col flex-1">
            <div className="h4 font-bold text-primary-900">
              급하락 종목
            </div>
            <LimitStocks type="decrease" />
          </div>
        </div>
        <div className="w-[1200px] flex gap-5">
          <div className="flex flex-col w-full flex-1">
            <div className="h4 font-bold text-primary-900">
              전체 종목
            </div>
            <AllStocks />
          </div>
        </div>
      </main>
    </>
  );
}
