import { getTranslations } from 'next-intl/server';
import NotFind from '../search/NotFind';
import FavoriteItem from './FavoriteItem';
import { Stock } from '@/types/stock';

export default async function Recent({
  data,
}: {
  data: Stock[] | null;
}) {
  const t = await getTranslations('Home');

  return (
    <>
      <div className="flex flex-col">
        <div className="h4 font-bold text-primary-900">
          {t('interest')}
        </div>
        <div className="flex flex-col justify-center items-center bg-[#FFFFFF] rounded-2xl mt-6 min-w-[590px] min-h-[374px] ">
          {data ? (
            <FavoriteItem stocks={data} />
          ) : (
            <NotFind type="stock" />
          )}
        </div>
      </div>
    </>
  );
}
