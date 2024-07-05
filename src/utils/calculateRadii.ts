/**
 * 정사각형의 한 변의 길이를 받아 대각선의 길이를 계산
 * @param sideLength - 정사각형의 한 변의 길이
 * @returns 대각선의 길이 / 2
 */
export function calculateRadii(sideLength: number) {
  return Math.sqrt(Math.pow(sideLength, 2) / 2);
}
