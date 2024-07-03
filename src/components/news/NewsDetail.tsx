import React from 'react';

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

export default async function NewsDetail({ id }: NewsDetailProps) {
  const { news }: { news: News } = await (
    await fetch(`http://localhost:3000/api/news/${id}`)
  ).json();

  const {
    publisher,
    published_at,
    title_en,
    summary_en,
    content_en,
    thumbnail,
    origin_url,
    view,
  } = news;

  return (
    <>
      <div>
        <h1 className="h4 font-bold pb-4">{title_en}</h1>
        <div className="flex justify-between">
          <div className="b5 font-medium text-grayscale-600 flex gap-[6px]">
            <span>{publisher}</span>
            <span>∙</span>
            <span>{diffCreatedTime(published_at)}</span>
            <span>∙</span>
            <span>{`${view}회`}</span>
          </div>
          {/* <ButtonBase
            iconSvg={Translate}
            iconClassName="w-5"
            className="flex b5 font-medium text-grayscale-0 bg-primary-900 rounded-lg w-[176px] h-[36px] items-center justify-center gap-1"
          >
            <span>번역하기</span>
          </ButtonBase> */}
        </div>
      </div>
      <div>
        <div className="flex gap-3 items-center pb-6">
          <div className="w-6 h-6 bg-primary-900 rounded flex items-center justify-center">
            <SmallLogoLight className="w-4" />
          </div>
          <span className="b4 font-bold">아잇나우 AI요약</span>
        </div>
        <div className="b4">{summary_en}</div>
      </div>
      {thumbnail && (
        <div className="relative rounded-lg overflow-hidden">
          <Image
            src={thumbnail}
            width="800"
            height="370"
            alt="thumbnail"
          />
        </div>
      )}

      <div className="b4 ">
        <h4 className="h4 font-bold pb-4">Article</h4>
        {content_en.split('\n').map((c, i) => (
          <p className="pb-4 last-of-type:pb-14" key={i}>
            {c}
          </p>
        ))}
        <OriginNewsCard
          origin_url={origin_url}
          content={content_en}
          title={title_en}
          thumbnail={thumbnail}
        />
      </div>
    </>
  );
}
