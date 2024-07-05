import { PolygonPointsParam } from '@/components/shared/chart/types';

/**
 * 다각형의 꼭지점 좌표를 계산
 * @param props - PolygonPointsParam 객체로 cx, cy, radius, numberOfSides 속성
 * @returns SVG path 문자열
 */
export function calculatePolygonPoints<T extends PolygonPointsParam>({
  cx,
  cy,
  radius,
  numberOfSides,
}: T): string {
  const angleIncrement = (2 * Math.PI) / numberOfSides;
  const points = [];

  for (let i = 0; i < numberOfSides; i++) {
    const angle = i * angleIncrement;
    const x = cx + radius * Math.cos(angle - Math.PI / 2);
    const y = cy + radius * Math.sin(angle - Math.PI / 2);

    points.push(`${i === 0 ? 'M' : 'L'} ${x},${y}`);
  }

  return points.join(' ') + ' Z';
}
