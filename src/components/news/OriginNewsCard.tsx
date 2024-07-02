import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type OriginNewsCardProps = {
  origin_url: string;
  thumbnail: string;
  title: string;
  content: string;
};

export default function OriginNewsCard({
  origin_url,
  thumbnail,
  title,
  content,
}: OriginNewsCardProps) {
  return (
    <Link
      href={origin_url}
      className="hover:underline flex shadow-lg rounded-lg"
      target="_blank"
    >
      <div className="relative rounded-l-lg overflow-hidden w-40 h-24">
        <Image src={thumbnail} fill alt="thumbnail" />
      </div>
      <div className="flex-1 px-6">
        <h3 className="font-bold b4 text-overflow-1">{title}</h3>
        <span className="b5 text-overflow-3">{content}</span>
      </div>
    </Link>
  );
}
