import StockIcon from '@/components/shared/StockIcon';
import ButtonBase from '@/components/shared/buttons/ButtonBase';
import { businessAPI } from '@/service/apiInstance';
import { StockWithInterest } from '@/service/serviceType';
import { UUID } from 'crypto';
import { useTranslations } from 'next-intl';

export default function AddInterest({
  stock,
  userId,
  handleIsInterest,
}: {
  stock: StockWithInterest;
  userId: UUID;
  handleIsInterest: (isInterest: boolean) => void;
}) {
  const {
    stock_id: stockId,
    logo_path: logoPath,
    stock_code: stockCode,
    stock_name: stockName,
    isInterest,
  } = stock;
  const { deleteInterestStock, addInterestStock } = businessAPI;
  const handleInterest = () => {
    const method = isInterest
      ? deleteInterestStock
      : addInterestStock;

    return async () => {
      const response = await method({ userId, stockId });
      if (response === 204 || response?.status === 201) {
        handleIsInterest(!isInterest);
      }
    };
  };
  const t = useTranslations();

  return (
    <div className="flex justify-between mb-[27px]">
      {/* 임시 구현 - Icon 컴포넌트 담당 한승재 (stat1202) */}
      <div className="flex items-center gap-2">
        <StockIcon path={logoPath} size="small" />
        <div className="flex gap-2 items-center b2 font-medium">
          <h2 className="b1 font-bold">{stockName}</h2>
          <span>∙</span>
          <span className="b3 font-normal">{stockCode}</span>
        </div>
      </div>
      <ButtonBase
        onClick={handleInterest()}
        className={`box-border b4 font-normal rounded-lg border border-primary-900 min-w-[167px] py-4 px-10 hover:bg-opacity-90 
        active:bg-opacity-95 ${
          isInterest ? 'text-primary-900' : 'text-grayscale-0'
        } bg-primary-900 ${
          isInterest ? 'bg-opacity-0' : 'bg-opacity-100'
        } 
hover:opacity-90 active:opacity-95`}
      >
        {isInterest ? t('Stock.unsubscribe') : t('Stock.add_stock')}
      </ButtonBase>
    </div>
  );
}
