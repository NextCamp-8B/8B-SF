import React from 'react';
import Card from '../shared/Card';
import { News } from '../shared/NewsListItem';

type TodayPopularNewsProps = {
  newsList: News[];
};

export default function TodayPopularNews({
  newsList,
}: TodayPopularNewsProps) {
  return (
    <div className="flex gap-5">
      <Card type="News3" news={newsList[0]} />
      <div className="flex flex-col gap-5">
        <Card type="News4" news={newsList[1]} />
        <Card type="News4" news={newsList[2]} />
      </div>
    </div>
  );
}
