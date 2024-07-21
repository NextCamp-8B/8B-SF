import { RegularPayData, SpecialPayData } from '@/types/stock';

/**
 * @description
 *  - 1-day 간격에 대한 데이터를 균일한 형식으로 변환
 */
const convertToRegularFormat = (
  data: SpecialPayData[],
): RegularPayData[] => {
  return data.map((item) => ({
    localDate: item.localDateTime,
    closePrice: item.currentPrice,
    openPrice: item.currentPrice,
    highPrice: item.currentPrice,
    lowPrice: item.currentPrice,
    accumulatedTradingVolume: item.accumulatedTradingVolume,
  }));
};

export const processPay = (
  data: RegularPayData[] | SpecialPayData[],
) => {
  let flatData: RegularPayData[] = [];

  if (data[0] && 'localDateTime' in data[0]) {
    /** 1-day 간격에 대한 변환 */
    flatData = convertToRegularFormat(data as SpecialPayData[]);
  } else {
    if (Array.isArray(data[0])) {
      // 데이터 수 100개 초과
      for (const subArray of data as any) {
        flatData = flatData.concat(subArray);
      }
    } else {
      // 데이터 수 100개 미만
      flatData = data as RegularPayData[];
    }
  }

  const result: {
    localDate: string;
    avgPrice: number;
  }[] = [];

  for (let i = 0; i < flatData.length; i++) {
    const slice = flatData.slice(i, i + 1);
    const avgPrice = slice.reduce(
      (sum, item) => sum + (item.lowPrice + item.highPrice) / 2,
      0,
    );

    result.push({
      localDate: slice[slice.length - 1].localDate,
      avgPrice: Number(Number(avgPrice).toFixed(2)),
    });
  }

  return result;
};
