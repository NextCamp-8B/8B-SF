import { Duration } from '@/components/shared/chart/types';
import { useRouter } from 'next/navigation';

export function useRouteAreaChart() {
  const router = useRouter();

  function handleRoute(duration: Duration) {
    console.log(duration);
    const { amount, unit } = duration;
    router.push(`?amount=${amount}&unit=${unit}`);
  }

  return { handleRoute };
}
