import React from 'react';
import Card from '../shared/Card';
import { News } from '../shared/NewsListItem';
import NewsListItem from '../shared/NewsListItem';

type RelatedNews = {
  newsList: News[];
  related?: 'stock' | 'news';
};

export default function RelatedNews({
  newsList,
  related = 'stock',
}: RelatedNews) {
  return (
    <>
      {related === 'stock' && (
        <div className="flex gap-5">
          {newsList.map((news) => (
            <Card key={news.id} type="News2" news={news} />
          ))}
        </div>
      )}
      {related === 'news' && (
        <div>
          {newsList.map((news) => (
            <NewsListItem type="related" key={news.id} news={news} />
          ))}
        </div>
      )}
    </>
  );
}
