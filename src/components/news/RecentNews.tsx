'use client';

import React, { useEffect, useState } from 'react';
import NewsListItem, { News } from '../shared/NewsListItem';
// import { useInView } from 'react-intersection-observer';
import { TMP_NEWS } from '@/constants';

export default function RecentNews() {
  // const { ref, inView } = useInView();
  const [newsList, setNewsList] = useState<News[]>([]);

  // useEffect(() => {
  //   if (inView) {
  //     setNewsList((prev) => [...prev, TMP_NEWS, TMP_NEWS, TMP_NEWS]);
  //   }
  // }, [inView]);
  return (
    <div className="bg-grayscale-0 p-12 flex flex-col rounded-2xl">
      {newsList.map((news) => (
        <NewsListItem type="large" news={news} key={news.id} />
      ))}
      {/* <span ref={ref}>end of contents</span> */}
    </div>
  );
}
