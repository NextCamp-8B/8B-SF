import Image from 'next/image';
import React from 'react';

interface NewsListItem {
  size?: 'small' | 'medium' | 'large';
  news: News;
}

interface News {
  thumbnail: string;
  title: string;
  content?: string;
  publishedTime: string;
  company: string;
}

export default function NewsListItem({
  size = 'medium',
  news,
}: NewsListItem) {
  const { thumbnail, title, content, publishedTime, company } = news;
  return (
    <article
      className={`flex gap-5 ${
        size !== 'small' &&
        `pb-8 border-b border-b-grayscale-400 
        last:border-none
        `
      }`}
    >
      {size === 'small' ? (
        <>
          <div className="w-[120px] h-16 bg-primary-200 rounded-lg relative overflow-hidden">
            <Image src={thumbnail} alt="thumbnail" fill />
          </div>
          <div className="py-1 flex flex-col justify-between">
            <h2 className="b4 font-medium flex-1">{title}</h2>
            <div className="flex b5 font-medium text-grayscale-600 gap-2">
              <span>{publishedTime}</span>
              <span>∙</span>
              <span>{company}</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className={`${
              size === 'medium' && 'w-[172px] h-[100px]'
            } ${
              size === 'large' && 'w-[252px] h-[148px]'
            } bg-primary-100 rounded-2xl relative overflow-hidden `}
          >
            <Image src={thumbnail} alt="thumbnail" fill />
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
            <div
              className={`b4 font-normal ${
                size === 'medium' && 'text-overflow-2'
              } ${size === 'large' && 'text-overflow-4'}`}
            >
              {content}
            </div>
          </div>
        </>
      )}
    </article>
  );
}
