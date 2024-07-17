'use client';

import Image from 'next/image';
import { News } from '@/types/news';
import { diffCreatedTime } from '@/utils/date';
import Link from 'next/link';
import LogoDark from '@/assets/logos/logo_dark.svg';
import { Locale } from '@/types/next-auth';
import { getTranslatedNews } from '@/utils/translate';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function NewsItem({ news }: { news: News }) {
  const { published_at, publisher, news_id, thumbnail } = news;

  const locale = useLocale() as Locale;

  const t = useTranslations('Date');

  const [translatedDiffTime, setTranslatedDiffTime] = useState<
    string | null
  >(null);

  useEffect(() => {
    const diffTime = async () => {
      const result = await diffCreatedTime(published_at);
      if (result) {
        const translated = t(result.periodType, {
          period: result.period,
        });
        setTranslatedDiffTime(translated);
      }
    };
    diffTime();
  }, [published_at, t]);

  return (
    <>
      <article className="flex pb-4 cursor-pointer hover:underline  hover:brightness-110">
        <div className="w-[120px] h-16 rounded-lg relative overflow-hidden">
          <Link href={`/news/${news_id}`}>
            {thumbnail ? (
              <Image
                src={thumbnail}
                alt="thumbnail"
                fill
                objectFit="cover"
              />
            ) : (
              <LogoDark />
            )}
          </Link>
        </div>
        <div className="pl-4 flex flex-col  max-w-[406px] gap-4">
          <Link href={`/news/${news_id}`}>
            <div className="b4 font-medium text-grayscale-900 text-overflow-1 ">
              {getTranslatedNews(news, locale, 'title')}
            </div>
          </Link>
          <div className="text-sm text-grayscale-600">
            {translatedDiffTime} · {publisher}
          </div>
        </div>
      </article>
    </>
  );
}
