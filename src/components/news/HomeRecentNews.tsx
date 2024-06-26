import React from 'react';
import NewsBorder from './NewsBorder';
import { News } from '../shared/NewsListItem';
import NewsListItem from '../shared/NewsListItem';

type HomeRecentNewsProps = {
  newsList: News[];
};

export default function HomeRecentNews({
  newsList,
}: HomeRecentNewsProps) {
  return (
    <NewsBorder>
      {newsList.map((news) => (
        <NewsListItem key={news.id} type="medium" news={news} />
      ))}
    </NewsBorder>
  );
}
