import { PolarGridParam } from '@/components/shared/chart/types';
import { calculateRadii } from '../calculateRadii';

/**
 * 극 좌표 관련 길이 배열을 반지름 배열로 변환
 * @param props - PolarGridParam 객체에서 polarRadius 속성
 * @returns 변환된 반지름 배열
 */
export function convertPolarToRadii<T extends PolarGridParam>({
  polarRadius,
}: Pick<T, 'polarRadius'>) {
  return polarRadius.map(calculateRadii);
}
