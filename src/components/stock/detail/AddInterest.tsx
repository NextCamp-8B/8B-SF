import StockIcon from '@/components/shared/StockIcon';
import ButtonBase from '@/components/shared/buttons/ButtonBase';

export default function AddInterest() {
  const isInterest = false;
  return (
    <div className="flex justify-between mb-[27px]">
      {/* 임시 구현 - Icon 컴포넌트 담당 한승재 (stat1202) */}
      <div className="flex items-center gap-2">
        <StockIcon
          path={
            'https://zlxqxgiycccjxcwzonsx.supabase.co/storage/v1/object/public/8b-sf/stock_logo/apple_logo.svg'
          }
          size="small"
        />
        <div className="flex gap-2 items-center b2 font-medium">
          <h2 className="b1 font-bold">애플</h2>
          <span>∙</span>
          <span className="b3 font-normal">AAPL</span>
        </div>
      </div>
      <ButtonBase
        className={`box-border b4 font-normal rounded-lg border border-primary-900 min-w-[167px] py-4 px-10 hover:bg-opacity-90 
        active:bg-opacity-95 ${
          isInterest ? 'text-primary-900' : 'text-grayscale-0'
        } bg-primary-900 ${
          isInterest ? 'bg-opacity-0' : 'bg-opacity-100'
        } 
hover:opacity-90 active:opacity-95`}
      >
        관심종목 {isInterest ? '해제' : '추가'}
      </ButtonBase>
    </div>
  );
}
