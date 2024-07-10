import React from 'react';
import NewsBorder from './NewsBorder';
import NewsListItem from '../shared/NewsListItem';
import { News } from '@/types/news';

export default async function ImportantNews() {
  const { news }: { news: News } = await (
    await fetch(`${process.env.NEXTAUTH_URL}/api/news/important`)
  ).json();
  return (
    <NewsBorder>
      <NewsListItem type="important" news={news} />
    </NewsBorder>
  );
}
