import React from 'react';

import NewsListItem from '../shared/NewsListItem';
import { News } from '@/types/news';

type RelatedNewsToNewsProps = {
  id: string;
};

export default async function RelatedNewsToNews({
  id,
}: RelatedNewsToNewsProps) {
  const { newsList }: { newsList: News[] } = await (
    await fetch(`http://localhost:3000/api/news/related/news/${id}`)
  ).json();

  return (
    <div>
      {newsList.map((news) => (
        <NewsListItem type="related" key={news.news_id} news={news} />
      ))}
    </div>
  );
}
