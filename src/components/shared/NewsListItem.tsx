import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { diffCreatedTime } from '@/utils/date';
import { News } from '@/types/news';
import LogoDark from '@/assets/logos/logo_dark.svg';
import { Locale } from '@/types/next-auth';
import { getTranslatedNews } from '@/utils/translate';

export type NewsListItemProps = {
  type?: 'related' | 'medium' | 'large' | 'find' | 'important';
  news: News;
  locale: Locale;
};

function NewsListItem({
  type = 'medium',
  news,
  locale,
}: NewsListItemProps) {
  const { thumbnail, published_at, publisher, news_id } = news;

  return (
    <>
      {type === 'find' && (
        <Link href={`/news/${news_id}`}>
          <article className="flex gap-5 cursor-pointer">
            <div className="w-[120px] h-16 bg-primary-200 rounded-lg relative overflow-hidden group">
              {thumbnail ? (
                <Image
                  src={thumbnail}
                  alt="thumbnail"
                  fill
                  className="group-hover:scale-125 duration-700"
                  objectFit="cover"
                />
              ) : (
                <div>
                  <LogoDark />
                </div>
              )}
            </div>
            <div className="py-1 flex flex-col justify-between">
              <h2 className="b4 font-medium flex-1 hover:underline">
                {getTranslatedNews(news, locale, 'title')}
              </h2>
              <div className="flex b5 font-medium text-grayscale-600 gap-2">
                <span>{diffCreatedTime(published_at)}</span>
                <span>∙</span>
                <span>{publisher}</span>
              </div>
            </div>
          </article>
        </Link>
      )}
      {type === 'medium' && (
        <Link
          href={`/news/${news_id}`}
          className="pb-8 pt-8 border-b border-b-grayscale-400 last-of-type:border-none last-of-type:pb-0 first-of-type:pt-0 "
        >
          <article className="flex gap-5 hover:underline cursor-pointer group">
            <div
              className={`w-[172px] h-[100px] bg-primary-100 rounded-2xl relative overflow-hidden `}
            >
              {thumbnail ? (
                <Image
                  src={thumbnail}
                  alt="thumbnail"
                  fill
                  className="group-hover:scale-125 duration-700"
                  objectFit="cover"
                />
              ) : (
                <div>
                  <LogoDark />
                </div>
              )}
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex justify-between items-center gap-3">
                <h2 className="b3 font-bold flex-1 text-overflow-1">
                  {getTranslatedNews(news, locale, 'title')}
                </h2>
                <div className="flex b5 font-medium text-grayscale-600 gap-2 hover:no-underline">
                  <span>{diffCreatedTime(published_at)}</span>
                  <span>∙</span>
                  <span>{publisher}</span>
                </div>
              </div>
              <div className={`b4 font-normal text-overflow-2`}>
                {getTranslatedNews(news, locale, 'content')}
              </div>
            </div>
          </article>
        </Link>
      )}
      {type === 'large' && (
        <Link
          href={`/news/${news_id}`}
          className="pb-8 pt-8 border-b border-b-grayscale-400 last-of-type:border-none last-of-type:pb-0 first:pt-0"
        >
          <article className="flex gap-5 hover:underline cursor-pointer group">
            <div
              className={`w-[252px] h-[148px] bg-grayscale-0 rounded-2xl relative overflow-hidden flex items-center justify-center`}
            >
              {thumbnail ? (
                <Image
                  src={thumbnail}
                  alt="thumbnail"
                  fill
                  className="group-hover:scale-125 duration-700"
                  objectFit="cover"
                />
              ) : (
                <div>
                  <LogoDark />
                </div>
              )}
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex justify-between items-center gap-3">
                <h2 className="b3 font-bold flex-1 text-overflow-1">
                  {getTranslatedNews(news, locale, 'title')}
                </h2>
                <div className="flex b5 font-medium text-grayscale-600 gap-2 no-underline">
                  <span>{diffCreatedTime(published_at)}</span>
                  <span>∙</span>
                  <span>{publisher}</span>
                </div>
              </div>
              <div className={`b4 font-normal text-overflow-4`}>
                {getTranslatedNews(news, locale, 'content')}
              </div>
            </div>
          </article>
        </Link>
      )}
      {type === 'important' && (
        <Link href={`/news/${news_id}`}>
          <article className="flex gap-5 hover:underline cursor-pointer group">
            <div className="rounded-3xl w-[338px] h-[240px] relative overflow-hidden">
              {thumbnail ? (
                <Image
                  src={thumbnail}
                  alt="thumbnail"
                  fill
                  className="group-hover:scale-125 duration-700"
                  objectFit="cover"
                />
              ) : (
                <div>
                  <LogoDark />
                </div>
              )}
            </div>
            <div className="flex-1">
              <h2 className="b1 font-medium pb-4 border-b border-b-grayscale-400">
                {getTranslatedNews(news, locale, 'title')}
              </h2>
              <p className="pt-4 b3 font-normal text-overflow-5 ">
                {getTranslatedNews(news, locale, 'content')}
              </p>
            </div>
          </article>
        </Link>
      )}
      {type === 'related' && (
        <Link href={`/news/${news_id}`}>
          <article className="py-[10px] border-b border-b-grayscale-400 cursor-pointer last-of-type:border-none last-of-type:pb-0">
            <div className="text-overflow-1 b4 font-medium text-grayscale-900  hover:underline">
              {getTranslatedNews(news, locale, 'title')}
            </div>
            <div className="flex b5 font-medium text-grayscale-600 gap-2 pt-[8px]">
              <span className="text-nowrap">
                {diffCreatedTime(published_at)}
              </span>
              <span>∙</span>
              <span className="flex-1 text-overflow-1">
                {publisher}
              </span>
            </div>
          </article>
        </Link>
      )}
    </>
  );
}

export default React.memo(NewsListItem);
