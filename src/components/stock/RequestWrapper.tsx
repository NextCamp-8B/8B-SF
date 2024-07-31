import { useEffect, useState } from 'react';
import ThatGoAddInterest from './ThatGoAddInterest';
import ShowingInterest from './ShowingInterest';
import { useInView } from 'react-intersection-observer';
import { businessAPI } from '@/service/apiInstance';
import { UUID } from 'crypto';
import { Stock } from '@/types/stock';
import { UserData } from '@/service/serviceType';
import NotFind from '../search/NotFind';

export default function RequestWrapper({
  handleIsOpen,
  user,
  isOpen,
}: {
  handleIsOpen: () => void;
  user: UserData;
  isOpen: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [stocks, setStocks] = useState<Array<{ stock: Stock }>>([]);
  const [stockQuantity, setStockQuantity] = useState({
    page: 1,
    size: 17,
  });
  const { page, size } = stockQuantity;
  const { getInterestStock } = businessAPI;
  const userId = user && (user.id as UUID);
  const { deleteInterestStock } = businessAPI;

  useEffect(() => {
    /** 소통 예정, 현재 모달창에서 변경 후 초기화 */
    if (userId && !isOpen) {
      getInterestStock({ userId, page: 1, size: 17 }).then((res) => {
        setStocks(res);
      });
    }
  }, [isOpen]);

  function getInterest() {
    if (!isLoading) {
      setIsLoading(true);

      getInterestStock({ userId, page, size })
        .then((stocksRes) => {
          setStockQuantity((prev) => ({
            ...prev,
            page: prev.page + 1,
          }));
          setStocks((prev) => {
            const stockIds = new Set(
              prev.map(({ stock }) => stock.stock_id),
            );
            const newStocks = stocksRes.filter(
              ({ stock }: { stock: Stock }) =>
                !stockIds.has(stock.stock_id),
            );
            return [...prev, ...newStocks];
          });

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

  useEffect(() => {
    /**
     * 임시 기획
     *  - 페이지를 이동할 때 상태를 기억해두지 않고 초기화
     *  - 그로 인해 페이지에 돌아왔을 때 데이터 호출을 처음부터 시도
     */
    return () => {
      setStocks([]);
      setStockQuantity({ page: 1, size: 17 });
    };
  }, []);

  const handleDeleteInterest = async (stockId: UUID) => {
    const status = await deleteInterestStock({
      userId,
      stockId: stockId as UUID,
    });

    if (status === 204) {
      setStocks((prevStocks) =>
        prevStocks.filter(({ stock }) => stock.stock_id !== stockId),
      );
    }
  };

  return (
    <>
      <ThatGoAddInterest handleIsOpen={handleIsOpen} user={user} />
      {stocks &&
      typeof stocks?.length === 'number' &&
      stocks?.length > 0 ? (
        <ShowingInterest
          stocks={stocks}
          isLoading={isLoading}
          handleDeleteInterest={handleDeleteInterest}
        />
      ) : (
        <div className="flex flex-col pt-20 mt-8">
          <NotFind type="stock" />
        </div>
      )}
      <span ref={ref} />
    </>
  );
}
