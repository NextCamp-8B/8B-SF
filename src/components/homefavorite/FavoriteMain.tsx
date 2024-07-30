'use client';

import NotFind from '../search/NotFind';
import FavoriteItem from './FavoriteItem';
import { UUID } from 'crypto';
import { businessAPI } from '@/service/apiInstance';
import { useTranslations } from 'next-intl';
import { Stock } from '@/types/stock';
import { useEffect, useState } from 'react';

export default function Recent({ userId }: { userId: UUID }) {
  const [stock, setStock] = useState([]);
  const t = useTranslations();
  const { getInterestStock } = businessAPI;

  useEffect(() => {
    getInterestStock({
      userId: userId as UUID,
      page: 1,
      size: 4,
      next: { revalidate: 0 },
    }).then((res) =>
      setStock(res.map(({ stock }: { stock: Stock }) => stock)),
    );
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <div className="h4 font-bold text-primary-900">
          {t('Home.interest')}
        </div>
        <div className="flex flex-col items-center bg-[#FFFFFF] rounded-2xl mt-6 min-w-[590px] min-h-[374px] ">
          {stock &&
          typeof stock?.length === 'number' &&
          stock?.length > 0 ? (
            <div className="mt-8">
              <FavoriteItem stocks={stock} />
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
