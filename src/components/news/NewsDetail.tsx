'use client';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import ButtonBase from '@/components/shared/buttons/ButtonBase';
import Translate from '@/assets/icons/translate.svg';
import SmallLogoLight from '@/assets/logos/small_logo_light.svg';
import { diffCreatedTime } from '@/utils/date';
import OriginNewsCard from './OriginNewsCard';
import { News } from '@/types/news';

type NewsDetailProps = {
  id: string;
};

type Lang = 'ko' | 'en' | 'fr' | 'ja' | 'zh';

export default function NewsDetail({ id }: NewsDetailProps) {
  const [news, setNews] = useState<News | null>(null);
  const [lang, setLang] = useState<Lang>('en');
  const getNews = async () => {
    const { news }: { news: News } = await (
      await fetch(`/api/news/${id}`)
    ).json();
    setNews(news);
  };

  useEffect(() => {
    getNews();
  }, []);

  useEffect(() => {}, [lang]);
  // const {
  //   publisher,
  //   published_at,
  //   title_en,
  //   summary_en,
  //   content_en,
  //   thumbnail,
  //   origin_url,
  //   view,
  // } = news;
  return (
    <>
      {news && (
        <>
          <div>
            <h1 className="h4 font-bold pb-4">
              {news['title_' + lang]}
            </h1>
            <div className="flex justify-between">
              <div className="b5 font-medium text-grayscale-600 flex gap-[6px]">
                <span>{news.publisher}</span>
                <span>∙</span>
                <span>{diffCreatedTime(news.published_at)}</span>
                <span>∙</span>
                <span>{`${news.view}회`}</span>
              </div>
              <ButtonBase
                iconSvg={<Translate className="w-6" />}
                className="flex b5 font-medium text-grayscale-0 bg-primary-900 rounded-lg w-[176px] h-[36px] items-center justify-center gap-1"
                onClick={() => {
                  setLang((prev) => (prev === 'ko' ? 'en' : 'ko'));
                }}
              >
                <span>번역하기</span>
              </ButtonBase>
            </div>
          </div>
          <div>
            <div className="flex gap-3 items-center pb-6">
              <div className="w-6 h-6 bg-primary-900 rounded flex items-center justify-center">
                <SmallLogoLight className="w-4" />
              </div>
              <span className="b4 font-bold">아잇나우 AI요약</span>
            </div>
            <div className="b4">{news['summary_' + lang]}</div>
          </div>
          {news.thumbnail && (
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src={news.thumbnail}
                width="800"
                height="370"
                alt="thumbnail"
              />
            </div>
          )}

          <div className="b4 ">
            <h4 className="h4 font-bold pb-4">Article</h4>
            {lang === 'ko'
              ? news.content_ko.split('\n').map((c, i) => (
                  <p className="pb-4 last-of-type:pb-14" key={i}>
                    {c}
                  </p>
                ))
              : news.content_en.split('\n').map((c, i) => (
                  <p className="pb-4 last-of-type:pb-14" key={i}>
                    {c}
                  </p>
                ))}
            <OriginNewsCard
              origin_url={news.origin_url}
              content={news.content_en}
              title={news.title_en}
              thumbnail={news.thumbnail}
            />
          </div>
        </>
      )}
    </>
  );
}
