import React from 'react';
import Card from '../shared/Card';
import { News } from '@/types/news';

export default async function TodayPopularNews() {
  const { newsList }: { newsList: News[] } = await (
    await fetch('http://localhost:3000/api/news/related/news')
  ).json();
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
