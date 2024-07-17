import Close from '@/assets/icons/close.svg';
import { stocksProps } from './InputItem';
import { UUID } from 'crypto';
import { businessAPI } from '@/service/apiInstance';
import { useTranslations } from 'next-intl';

export default function DeleteSearch({
  type = 'all',
  stockId,
  userId,
  setRecentDatas,
}: {
  type?: 'all' | 'select';
  stockId?: UUID;
  userId: UUID;
  setRecentDatas: (data: stocksProps[] | null) => void;
}) {
  const t = useTranslations('Search');
  const { deleteRecentSearch, getRecentSearch } = businessAPI;
  const deleteSerachStock = async ({
    type = 'all',
    userId,
    stockId,
  }: {
    type?: 'all' | 'select';
    userId: UUID;
    stockId?: UUID | undefined;
  }) => {
    const response = await deleteRecentSearch({
      type,
      userId,
      stockId,
    });
    const { success } = response;

    if (success) {
      const { stocks } = await getRecentSearch({ userId });
      setRecentDatas(stocks);
    }
  };

  return (
    <>
      {type === 'all' && (
        <button
          className="text-grayscale-600 font-medium text-md underline"
          onClick={() => deleteSerachStock({ userId })}
        >
          {t('delete_all')}
        </button>
      )}
      {type === 'select' && (
        <div
          onClick={() =>
            deleteSerachStock({ type: 'select', userId, stockId })
          }
        >
          <Close width={24} height={24} />
        </div>
      )}
    </>
  );
}
