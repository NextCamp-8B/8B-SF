interface StockExchangeType {
  code: string;
  zoneId: string;
  nationType: string;
  delayTime: number;
  startTime: string;
  endTime: string;
  closePriceSendTime: string;
  nameKor: string;
  nameEng: string;
  nationCode: string;
  nationName: string;
  stockType: string;
  name: string;
}

interface CompareToPreviousPrice {
  code: string;
  text: string;
  name: string;
}

interface TradeStopType {
  code: string;
  text: string;
  name: string;
}

interface OverMarketPriceInfo {
  tradingSessionType: string;
  overMarketStatus: string;
  overPrice: string;
  compareToPreviousPrice: CompareToPreviousPrice;
  compareToPreviousClosePrice: string;
  fluctuationsRatio: string;
  localTradedAt: string;
}

interface CurrencyType {
  code: string;
  text: string;
  name: string;
}

interface StockData {
  reutersCode: string;
  stockName: string;
  symbolCode: string;
  stockExchangeType: StockExchangeType;
  closePrice: string;
  compareToPreviousClosePrice: string;
  compareToPreviousPrice: CompareToPreviousPrice;
  fluctuationsRatio: string;
  tradeStopType: TradeStopType;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  accumulatedTradingVolume: string;
  accumulatedTradingValue: string;
  localTradedAt: string;
  marketStatus: string;
  overMarketPriceInfo: OverMarketPriceInfo;
  currencyType: CurrencyType;
  isinCode: string;
  myDataCode: string | null;
  stockEndUrl: string | null;
  marketValueFull: string;
  marketValueHangeul: string;
  marketValueKrwHangeul: string;
}

export interface StockResponse {
  pollingInterval: number;
  datas: Array<StockData>;
  time: string;
}
