import Triangle from '../../Triangle';

/**
 * - 프롬프트 작업 전, 임시 완성
 * - formattedChildren 또한 임시 작업
 */
export default function MetricsPercent({
  children,
  className,
  rate,
}: {
  children: React.ReactNode;
  className?: string;
  rate: boolean;
}) {
  let formattedChildren = children;

  // children이 숫자인 경우에만 처리
  if (typeof children === 'number') {
    formattedChildren = children.toFixed(1); // 소수점 이하 한 자리까지 표시
  }

  const isRemain = !rate && children === 0;
  const colorAccChange = rate
    ? 'text-warning-100'
    : 'text-secondary-500';
  const color = isRemain ? 'text-grayscale-600' : colorAccChange;

  return (
    <div className={`${className}`}>
      <div className="flex items-center gap-[1px]">
        {!isRemain && <Triangle rate={rate} />}
        <span className={`b5 font-medium ${color} tracking-wide`}>
          {formattedChildren}점
        </span>
      </div>
    </div>
  );
}
