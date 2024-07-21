export type Stock = {
  stock_id: string;
  stock_name: string;
  stock_code: string;
  compare_to_previous_close_price: number;
  fluctuations_ratio: number;
  logo_path: string;
  price: number;
};

export type RegularPayData = {
  localDate: string;
  closePrice: number;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  accumulatedTradingVolume: number;
};

export type SpecialPayData = {
  localDateTime: string;
  currentPrice: number;
  accumulatedTradingVolume: number;
};

export type PayStock = RegularPayData | SpecialPayData;
export type PayStockArr = PayStock[] | PayStock[][];
