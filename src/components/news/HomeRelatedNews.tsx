import React from 'react';
import Card from '../shared/Card';
import { News } from '../shared/NewsListItem';

type HomeRelatedNewsProps = {
  newsList: News[];
};

export default function HomeRelatedNews({
  newsList,
}: HomeRelatedNewsProps) {
  return (
    <div className="flex gap-5">
      {newsList.map((news) => (
        <Card type="News1" key={news.id} news={news} />
      ))}
    </div>
  );
}
