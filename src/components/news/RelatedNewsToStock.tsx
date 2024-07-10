import React from 'react';
import Card from '../shared/Card';
import { News } from '@/types/news';

export default async function RelatedNewsToStock() {
  const { newsList }: { newsList: News[] } = await (
    await fetch(`${process.env.NEXTAUTH_URL}/api/news/related/stock`)
  ).json();

  return (
    <div className="flex gap-5">
      {newsList.map((news) => (
        <Card key={news.news_id} type="News2" news={news} />
      ))}
    </div>
  );
}
