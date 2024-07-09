import { useSearchParams } from 'next/navigation';
import ButtonBase from '../../buttons/ButtonBase';
import { Duration } from '../types';
import { useRouteAreaChart } from '@/hooks/useRouteAreaChart';

export default function AreaBtn({
  children,
  className,
  duration,
}: {
  children: React.ReactNode;
  className?: string;
  duration: Duration;
}) {
  const { handleRoute } = useRouteAreaChart();
  const searchParams = useSearchParams();
  const amount = Number(searchParams.get('amount'));
  const unit = searchParams.get('unit');
  const selected =
    amount === duration.amount && unit === duration.unit;

  return (
    <li className={className}>
      <ButtonBase
        className={`b5 font-medium ${
          selected
            ? 'bg-primary-50 text-primary-900'
            : 'bg-grayscale-0 text-grayscale-400'
        } rounded-lg py-[6px] px-[22.5px]`}
        onClick={() => handleRoute(duration)}
      >
        {children}
      </ButtonBase>
    </li>
  );
}
