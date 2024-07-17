import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { getTranslations } from 'next-intl/server';

dayjs.extend(utc);
dayjs.extend(timezone);

// 뉴스 생성 날짜
export const createdDate = (date: string) => {
  const utcDate = dayjs.utc(date);
  return utcDate.format('YYYY.MM.DD');
};

// 한국 시간을 UTC로 변환
const koreaToUtc = (date: string) => {
  return dayjs.tz(date, 'Asia/Seoul').utc();
};
// 현재시간 - 뉴스 생성날짜
export const diffCreatedTime = (date: string) => {
  const newsTime = koreaToUtc(date);
  const now = dayjs().utc();

  const yearsDiff = now.diff(newsTime, 'year');
  const monthsDiff = now.diff(newsTime, 'month');
  const daysDiff = now.diff(newsTime, 'day');
  const hoursDiff = now.diff(newsTime, 'hour');
  const minutesDiff = now.diff(newsTime, 'minute');
  const secondsDiff = now.diff(newsTime, 'second');

  if (yearsDiff >= 1) {
    return { periodType: 'year', period: yearsDiff };
  }

  if (monthsDiff >= 1) {
    return { periodType: 'month', period: monthsDiff };
  }

  if (daysDiff >= 1) {
    return { periodType: 'day', period: daysDiff };
  }

  if (hoursDiff >= 1) {
    return { periodType: 'hour', period: hoursDiff };
  }

  if (minutesDiff >= 1) {
    return { periodType: 'minute', period: minutesDiff };
  }

  return { periodType: 'second', period: secondsDiff };
};

// 최근 검색어 시간
export const searchDate = (date?: string) => {
  const utcDate = dayjs.utc(date);
  return utcDate.format('MM.DD');
};
