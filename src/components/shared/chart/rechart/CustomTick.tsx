import { TextProps } from 'recharts';

interface CustomTickProps extends TextProps {
  payload: {
    value: string;
  };
  index: number;
}

/**
 * 개별적인 위치 조정을 위한 커스텀 틱 컴포넌트
 *
 * @param props.payload - 틱의 데이터 객체
 * @param props.index - 틱의 인덱스
 * @param props.x - 틱의 x 위치
 * @param props.y - 틱의 y 위치
 * @param props.textAnchor - 텍스트 앵커 (기본적으로 가운데 정렬)
 * @returns 위치가 조정된 틱 텍스트 요소
 */
export default function CustomTick({
  payload,
  index,
  x,
  y,
  textAnchor,
}: CustomTickProps) {
  // 각 텍스트에 대해 개별적으로 dx와 dy 값을 설정
  const dxValues = [0, -15, -13, 13, 15];
  const dyValues = [0, -10, 14, 14, -10];

  return (
    <text
      x={x}
      y={y}
      dy={dyValues[index]}
      dx={dxValues[index]}
      fill="#575757"
      fontSize={12}
      letterSpacing="0%"
      fontWeight="500"
      textAnchor={textAnchor}
    >
      {payload.value}
    </text>
  );
}
