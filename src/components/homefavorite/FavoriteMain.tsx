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
        <div className="flex flex-col items-center bg-[#FFFFFF] rounded-2xl mt-6 min-w-[590px] min-h-[374px] ">
          {data &&
          typeof data?.length === 'number' &&
          data?.length > 0 ? (
            <div className="mt-8">
              <FavoriteItem stocks={data} />
            </div>
          ) : (
            <div className="flex flex-col pt-20 mt-8">
              <NotFind type="stock" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
