'use client';

import { useState } from 'react';
import ThatGoAddInterest from './ThatGoAddInterest';
import ShowingInterest from './ShowingInterest';
import { useInView } from 'react-intersection-observer';

export default function RequestWrapper() {
  const [isLoading, setIsLoading] = useState(false);
  const [stocks, setStocks] = useState<Array<any>>([]);
  const [stockQuantity, setStockQuantity] = useState({
    page: 1,
    size: 17,
  });
  const { page, size } = stockQuantity;

  /**
   * @description
   *  - 임시 API 요청
   *  - 소통 후 HTTP Client 적용 예정
   */
  function getInterest() {
    if (!isLoading) {
      setIsLoading(true);

      try {
        fetch(
          `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${size}`,
        )
          .then((res) => res.json())
          .then((stocksRes) => {
            if (stocksRes.length !== 0) {
              setStockQuantity((prev) => ({
                ...prev,
                page: page + 1,
              }));
              setStocks((prev) => [...prev, ...stocksRes]);
            }
            setIsLoading(false);
          });
      } catch (e) {
        console.error(`Request: ${e}`);
        setIsLoading(false);
      }
    }
  }
  /**
   * - initialInView: inView 초기값
   * - onChange: inView 상태가 변화할때 마다 실행되는 콜백함수
   * - threshold: Target Element가 얼마나 보였을때 노출됐다 판단 비율
   * - triggerOnce: Observer가 딱 한 번만 실행
   */
  const { ref } = useInView({
    initialInView: true,
    threshold: 0.1,
    onChange(inView) {
      if (inView) {
        getInterest();
      }
    },
  });

  return (
    <>
      <ThatGoAddInterest />
      <ShowingInterest stocks={stocks} isLoading={isLoading} />
      <span ref={ref} />
    </>
  );
}
