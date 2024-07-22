type BasePolarParam = {
  cx: number;
  cy: number;
};

export type PolarGridParam = BasePolarParam & {
  polarRadius: number[];
  numberOfSides: number;
};

export type PolygonPointsParam = BasePolarParam & {
  radius: number;
  numberOfSides: number;
};

export type PolarGridPath = {
  key: string;
  strokeWidth: number;
  stroke: string;
  fill: 'none';
  className: string;
  d: string;
};

export type RadarStatus = {
  width?: number;
  height?: number;
  cx?: number;
  cy?: number;
  outerRadius?: number;
  polarRadius?: Array<number>;
  numberOfSides?: number;
};

export type RadarData = Array<{
  subject: string;
  percentage: number;
  B: number;
  fullMark: number;
}>;

export type Duration = {
  amount: number | string;
  unit: 'day' | 'month' | 'year';
};

export type CustomizedXAxisTickProps = {
  x: number;
  y: number;
  payload: {
    value: string | number;
    coordinate: number;
    index: number;
  };
  index: number;
};

export type AreaChartData = {
  amount: string;
  periodType: string;
  processed: { avgPrice: number | string; localDate: string }[];
};
