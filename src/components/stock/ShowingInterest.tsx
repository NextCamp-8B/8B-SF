import LoadingSpinner from '../shared/LoadingSpinner';
import Chart from '../shared/chart';
import SkeletonWrapper from '../skeleton/shared/SkeletonWrapper';

/**
 * - Skeleton 추가 예정
 */
export default function ShowingInterest({
  stocks,
  isLoading,
}: {
  stocks: Array<any>;
  isLoading: boolean;
}) {
  return (
    <section className="flex flex-wrap gap-[19px]">
      {stocks.map((stock, i) => (
        <Chart key={i}>
          <Chart.SpecificStockAIReport />
        </Chart>
      ))}
      {isLoading && (
        <SkeletonWrapper className="w-[328px] h-[360px] pb-4 flex justify-center items-center">
          <LoadingSpinner />
        </SkeletonWrapper>
      )}
    </section>
  );
}
