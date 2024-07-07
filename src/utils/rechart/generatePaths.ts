import {
  PolarGridParam,
  PolarGridPath,
} from '@/components/shared/chart/types';
import { convertPolarToRadii } from './convertPolarToRadii';
import { calculatePolygonPoints } from './calculatePolygonPoints';

/**
 * PolarGridParam에 따라 다각형 경로를 생성
 *
 * @param props - PolarGridParam 객체로 cx, cy, polarRadius, numberOfSides 속성
 * @returns 생성된 경로 및 필요 속성을 담은 객체
 */
export function generatePaths<T extends PolarGridParam>({
  cx,
  cy,
  polarRadius,
  numberOfSides,
}: T) {
  const radii = convertPolarToRadii({ polarRadius });

  return radii.map((radius: number, i: number) => {
    const points = calculatePolygonPoints({
      cx,
      cy,
      radius,
      numberOfSides,
    });
    const isLastStroke = i === polarRadius.length - 1;
    const strokeColor = isLastStroke ? '#9F9F9F' : '#E9E9E9';

    return {
      key: `radius-line-${i}`,
      strokeWidth: 1,
      stroke: strokeColor,
      fill: 'none',
      className: 'recharts-polar-grid-concentric-polygon',
      d: points,
    } as PolarGridPath;
  });
}
