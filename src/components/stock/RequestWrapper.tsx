import { useEffect, useState } from 'react';
import ThatGoAddInterest from './ThatGoAddInterest';
import ShowingInterest from './ShowingInterest';
import { InView, useInView } from 'react-intersection-observer';
import { useSession } from 'next-auth/react';
import { businessAPI } from '@/service/apiInstance';
import { UUID } from 'crypto';
import { Stock } from '@/types/stock';

export default function RequestWrapper({
  handleIsOpen,
}: {
  handleIsOpen: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [stocks, setStocks] = useState<Array<Stock>>([]);
  const [stockQuantity, setStockQuantity] = useState({
    page: 1,
    size: 17,
  });
  const { page, size } = stockQuantity;
  const { getInterestStock } = businessAPI;
  const { data } = useSession();
  const userId = data?.user.id as UUID;

  /**
   * @description
   *  - 임시 API 요청
   *  - 소통 후 HTTP Client 적용 예정
   */
  function getInterest() {
    if (!isLoading) {
      setIsLoading(true);

      getInterestStock({ userId, page, size })
        .then((stocksRes) => {
          if (stocksRes.length !== 0) {
            setStockQuantity((prev) => ({
              ...prev,
              page: page + 1,
            }));
            setStocks((prev) => [...prev, ...stocksRes]);
          }
          setIsLoading(false);
        })
        .catch((e) => {
          setIsLoading(false);
          console.error(e);
        });
    }
  }
  /**
   * - initialInView: inView 초기값
   * - onChange: inView 상태가 변화할때 마다 실행되는 콜백함수
   * - threshold: Target Element가 얼마나 보였을때 노출됐다 판단 비율
   * - triggerOnce: Observer가 딱 한 번만 실행
   */
  const { ref, inView } = useInView({
    initialInView: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (userId && inView) {
      getInterest();
    }
  }, [userId, inView]);

  return (
    <>
      <ThatGoAddInterest handleIsOpen={handleIsOpen} />
      <ShowingInterest stocks={stocks} isLoading={isLoading} />
      <span ref={ref} />
    </>
  );
}
