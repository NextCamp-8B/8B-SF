import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export type NewsListItem = {
  type?: 'related' | 'medium' | 'large' | 'find' | 'important';
  news: News;
};

export type News = {
  thumbnail: string;
  title: string;
  content?: string;
  publishedTime: string;
  company: string;
  date: string;
  id: string;
};

export default function NewsListItem({
  type = 'medium',
  news,
}: NewsListItem) {
  const { thumbnail, title, content, publishedTime, company, id } =
    news;
  return (
    <>
      {type === 'find' && (
        <Link href={`/news/${id}`}>
          <article className="flex gap-5 cursor-pointer">
            <div className="w-[120px] h-16 bg-primary-200 rounded-lg relative overflow-hidden group">
              <Image
                src={thumbnail}
                alt="thumbnail"
                fill
                className="group-hover:scale-125 duration-700"
              />
            </div>
            <div className="py-1 flex flex-col justify-between">
              <h2 className="b4 font-medium flex-1 hover:underline">
                {title}
              </h2>
              <div className="flex b5 font-medium text-grayscale-600 gap-2">
                <span>{publishedTime}</span>
                <span>∙</span>
                <span>{company}</span>
              </div>
            </div>
          </article>
        </Link>
      )}
      {type === 'medium' && (
        <Link
          href={`/news/${id}`}
          className="pb-8 pt-8 border-b border-b-grayscale-400 last:border-none last:pb-0 first:pt-0 "
        >
          <article className="flex gap-5 hover:underline cursor-pointer group">
            <div
              className={`w-[172px] h-[100px] bg-primary-100 rounded-2xl relative overflow-hidden `}
            >
              <Image
                src={thumbnail}
                alt="thumbnail"
                fill
                className="group-hover:scale-125 duration-700"
              />
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex justify-between items-center gap-3">
                <h2 className="b3 font-bold flex-1 text-overflow-1">
                  {title}dsds
                </h2>
                <div className="flex b5 font-medium text-grayscale-600 gap-2">
                  <span>{publishedTime}</span>
                  <span>∙</span>
                  <span>{company}</span>
                </div>
              </div>
              <div className={`b4 font-normal text-overflow-2`}>
                {content}
              </div>
            </div>
          </article>
        </Link>
      )}
      {type === 'large' && (
        <Link
          href={`/news/${id}`}
          className="pb-8 pt-8 border-b border-b-grayscale-400 last:border-none last:pb-0 first:pt-0"
        >
          <article className="flex gap-5 hover:underline cursor-pointer group">
            <div
              className={`w-[252px] h-[148px] bg-primary-100 rounded-2xl relative overflow-hidden `}
            >
              <Image
                src={thumbnail}
                alt="thumbnail"
                fill
                className="group-hover:scale-125 duration-700"
              />
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex justify-between items-center gap-3">
                <h2 className="b3 font-bold flex-1 text-overflow-1">
                  {title}
                </h2>
                <div className="flex b5 font-medium text-grayscale-600 gap-2">
                  <span>{publishedTime}</span>
                  <span>∙</span>
                  <span>{company}</span>
                </div>
              </div>
              <div className={`b4 font-normal text-overflow-4`}>
                {content}
              </div>
            </div>
          </article>
        </Link>
      )}
      {type === 'important' && (
        <Link href={`/news/${id}`}>
          <article className="flex gap-5 hover:underline cursor-pointer group">
            <div className="rounded-3xl w-[338px] h-[240px] relative overflow-hidden">
              <Image
                src={thumbnail}
                alt="thumbnail"
                className=" group-hover:scale-125 duration-700"
                fill
              />
            </div>
            <div className="flex-1">
              <h2 className="b1 font-medium pb-6 border-b border-b-grayscale-400">
                {title}
              </h2>
              <p className="pt-6 b3 font-normal text-overflow-5 ">
                {content}
              </p>
            </div>
          </article>
        </Link>
      )}
      {type === 'related' && (
        <Link href={`/news/${id}`}>
          <article className="py-[10px] border-b border-b-grayscale-400 cursor-pointer last:border-none last:pb-0">
            <div className="text-overflow-1 b4 font-medium text-grayscale-900  hover:underline">
              {title}
            </div>
            <div className="flex b5 font-medium text-grayscale-600 gap-2 pt-[14px]">
              <span>{publishedTime}</span>
              <span>∙</span>
              <span>{company}</span>
            </div>
          </article>
        </Link>
      )}
    </>
  );
}
