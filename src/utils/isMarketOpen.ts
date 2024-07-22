/**
 * 현재 시간이 미국 동부 표준시(EST) 기준으로 주식 시장의 정규 거래 시간 내에 있는지 여부를 확인하는 헬퍼 함수입니다.
 *
 * 미국 동부 표준시(EST) 기준으로 주식 시장의 정규 거래 시간은 오전 9시 30분부터 오후 4시까지입니다.
 * 이 시간은 한국 표준시(KST) 기준으로 다음과 같습니다:
 * - 시장 개장 시간: 밤 11시 30분 (KST)
 * - 시장 마감 시간: 새벽 6시 (KST)
 * - 즉, 현재 시간이 한국 표준시(KST) 기준으로 위의 시간 범위 내에 있는지를 확인합니다.
 */
export function isMarketOpen() {
  const now = new Date();
  const utcHours = now.getUTCHours();
  const utcMinutes = now.getUTCMinutes();

  // 한국 표준시(KST)를 UTC로 변환
  const marketOpenHourUTC = 14; // 11:30 PM KST는 UTC 기준으로 2:30 PM
  const marketOpenMinuteUTC = 30;
  const marketCloseHourUTC = 21; // 6:00 AM KST는 UTC 기준으로 9:00 PM (이전 날)
  const marketCloseMinuteUTC = 0;

  const afterMarketOpen =
    utcHours > marketOpenHourUTC ||
    (utcHours === marketOpenHourUTC &&
      utcMinutes >= marketOpenMinuteUTC);

  const beforeMarketClose =
    utcHours < marketCloseHourUTC ||
    (utcHours === marketCloseHourUTC &&
      utcMinutes < marketCloseMinuteUTC);

  return afterMarketOpen && beforeMarketClose;
}
