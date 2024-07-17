'use client';
import { useEffect, useState } from 'react';
import Wrapper from '../shared/Wrapper';
import PopularItem from './PopularItem';
import SearchHeading from './SearchHeading';
import SkeletonPopularStock from '../skeleton/search/SkeletonPopularStock';
import { stocksProps } from './InputItem';
import { useTranslations } from 'next-intl';

export default function PopularSearch({ session }: { session: any }) {
  const [popularList, setPopularList] = useState<stocksProps[]>([]);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const t = useTranslations('Search');
  useEffect(() => {
    const fetchPopular = async () => {
      const response = await fetch('/api/search/popular');

      if (response.ok) {
        const data = await response.json();
        setPopularList(data.stocks);
      }
    };
    const debounceTimeout: number = window.setTimeout(() => {
      fetchPopular();
    }, 1000);

    setShowSkeleton(false);
    return () => clearTimeout(debounceTimeout);
  }, []);

  const viewUpdate = async (stock_id: string) => {
    const response = await fetch('/api/search/popular', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ stock_id }),
    });
  };

  const recentUpdate = async (stock_id: string) => {
    const response = await fetch('/api/search/recent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ stock_id, session }),
    });
  };

  return (
    <>
      <div className="w-[590px]">
        <div className="flex items-center">
          <SearchHeading> {t('popular_search')}</SearchHeading>
          <span className="text-sm px-4 underline text-grayscale-600 font-medium">
            00:00 {t('standard')}
          </span>
        </div>
        <Wrapper width="590px" padding="p-6">
          <div className="w-[542px]  flex justify-center">
            <div className="w-[263px] flex justify-start flex-col">
              {showSkeleton
                ? Array.from({ length: 5 }).map((_, idx) => (
                    <SkeletonPopularStock key={idx} />
                  ))
                : popularList.map((popularData, idx) => {
                    if (idx < 5) {
                      return (
                        <div
                          key={idx}
                          onClick={() => {
                            popularData.stock_id &&
                              (viewUpdate(popularData.stock_id),
                              recentUpdate(popularData.stock_id));
                          }}
                        >
                          <PopularItem
                            popularData={popularData}
                            idx={idx}
                          />
                        </div>
                      );
                    }
                  })}
            </div>
            <div className="w-[263px] flex justify-start flex-col">
              {showSkeleton
                ? Array.from({ length: 5 }).map((_, idx) => (
                    <SkeletonPopularStock key={idx} />
                  ))
                : popularList.map((popularData, idx) => {
                    if (idx >= 5) {
                      return (
                        <div
                          key={idx}
                          onClick={() =>
                            popularData.stock_id &&
                            (viewUpdate(popularData.stock_id),
                            recentUpdate(popularData.stock_id))
                          }
                        >
                          <PopularItem
                            popularData={popularData}
                            idx={idx}
                            key={idx}
                          />
                        </div>
                      );
                    }
                  })}
            </div>
          </div>
        </Wrapper>
      </div>
    </>
  );
}
