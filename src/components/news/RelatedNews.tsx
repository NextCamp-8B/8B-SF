import React from 'react';
import Card from '../shared/Card';
import NewsListItem from '../shared/NewsListItem';
import { News } from '@/types/news';

type RelatedNewsProps = {
  id: string;
  related?: 'stock' | 'news';
};

export default async function RelatedNews({
  related = 'stock',
}: RelatedNewsProps) {
  const { newsList }: { newsList: News[] } = await (
    await fetch('http://localhost:3000/api/news/related/stock')
  ).json();

  console.log(newsList);
  return (
    <>
      {related === 'stock' && (
        <div className="flex gap-5">
          {newsList.map((news) => (
            <Card key={news.news_id} type="News2" news={news} />
          ))}
        </div>
      )}
      {related === 'news' && (
        <div>
          {newsList.map((news) => (
            <NewsListItem
              type="related"
              key={news.news_id}
              news={news}
            />
          ))}
        </div>
      )}
    </>
  );
}
