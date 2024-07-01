import React from 'react';
import NewsBorder from './NewsBorder';
import NewsListItem from '../shared/NewsListItem';
import { News } from '@/types/news';

export default async function HomeRecentNews() {
  const limit = 3;
  const { newsList }: { newsList: News[] } = await (
    await fetch(`http://localhost:3000/api/news?limit=${limit}`)
  ).json();

  return (
    <NewsBorder>
      {newsList.map((news) => (
        <NewsListItem key={news.news_id} type="medium" news={news} />
      ))}
    </NewsBorder>
  );
}
