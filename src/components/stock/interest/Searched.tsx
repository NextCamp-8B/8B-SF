import StockListItem from '@/components/shared/StockListItem';
import ButtonBase from '@/components/shared/buttons/ButtonBase';
import { businessAPI } from '@/service/apiInstance';
import { Stock } from '@/types/stock';
import { UUID } from 'crypto';
import { useState } from 'react';

type StockWithInterest = Stock & {
  isInterest: boolean;
};

export default function Searched({
  searched,
  userId,
}: {
  searched: Array<StockWithInterest>;
  userId: UUID;
}) {
  const [stocks, setStocks] =
    useState<Array<StockWithInterest>>(searched);
  const { addInterestStock, deleteInterestStock } = businessAPI;
  const btnCommonClass =
    'b5 font-medium rounded-lg min-w-[122px] h-9 hover:bg-opacity-90 active:bg-opacity-95';

  const handleAddInterest = async (stockId: string) => {
    await addInterestStock({
      userId,
      stockId: stockId as UUID,
    });
    setStocks((prevStocks) =>
      prevStocks.map((stock) =>
        stock.stock_id === stockId
          ? { ...stock, isInterest: true }
          : stock,
      ),
    );
  };

  const handleDeleteInterest = async (stockId: string) => {
    await deleteInterestStock({
      userId,
      stockId: stockId as UUID,
    });
    setStocks((prevStocks) =>
      prevStocks.map((stock) =>
        stock.stock_id === stockId
          ? { ...stock, isInterest: false }
          : stock,
      ),
    );
  };
  return (
    <>
      <h3>검색 결과</h3>
      <ul>
        {stocks.map((stock: StockWithInterest) => (
          <li key={stock.stock_id} className="flex justify-between">
            <StockListItem stock={stock} type="report" />
            {stock.isInterest ? (
              <ButtonBase
                onClick={() => handleDeleteInterest(stock.stock_id)}
                className={`${btnCommonClass} text-grayscale-600 bg-grayscale-200 hover:opacity-70 active:opacity-90`}
              >
                삭제하기
              </ButtonBase>
            ) : (
              <ButtonBase
                onClick={() => handleAddInterest(stock.stock_id)}
                className={`${btnCommonClass} text-grayscale-0 bg-primary-900 hover:opacity-90 active:opacity-95`}
              >
                추가
              </ButtonBase>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
// "related" | "find" | "default" | "report" | "description" | "popular" | "interest" |
