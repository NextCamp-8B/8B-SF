'use client';

import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { News } from '@/types/news';
import dynamic from 'next/dynamic';
import SkeletonNewsListItem from '../skeleton/news/SkeletonNewsListItem';

const NewsListItem = dynamic(
  () => import('@/components/shared/NewsListItem'),
  {
    loading: () => <SkeletonNewsListItem type="large" />,
  },
);

function RecentNews() {
  const { ref, inView } = useInView();
  const [newsList, setNewsList] = useState<News[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoadging] = useState(false);

  const getNewsList = async () => {
    if (inView && !loading) {
      setLoadging(true);
      const { newsList, lastPage } = await (
        await fetch(`/api/news?page=${page}`)
      ).json();

      if (page < lastPage) {
        setNewsList((prev) => [...prev, ...newsList]);
        setPage((prev) => prev + 1);
      }
    }

    setTimeout(() => {
      setLoadging(false);
    }, 1000);
  };

  useEffect(() => {
    getNewsList();
  }, [inView]);

  return (
    <div className="bg-grayscale-0 p-12 flex flex-col rounded-2xl">
      {newsList.map((news) => (
        <NewsListItem type="large" news={news} key={news.news_id} />
      ))}
      <span ref={ref} />
    </div>
  );
}

export default RecentNews;
