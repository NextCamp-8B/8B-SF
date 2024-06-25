import React from 'react';
import NewsListItem, { News } from '../shared/NewsListItem';

type RecentNewsProps = {
  newsList: News[];
};

export default function RecentNews({ newsList }: RecentNewsProps) {
  return (
    <div className="bg-grayscale-0 p-12 flex flex-col rounded-2xl">
      {newsList.map((news) => (
        <NewsListItem type="large" news={news} key={news.id} />
      ))}
    </div>
  );
}
