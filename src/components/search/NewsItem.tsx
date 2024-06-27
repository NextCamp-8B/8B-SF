import Image from 'next/image';
import { NewsProps } from './FindNews';
import { diffCreatedTime } from '@/utils/date';
import Link from 'next/link';

export default function NewsItem({ news }: { news: NewsProps }) {
  const { id, thumbnail, title, content, publisher, date } = news;
  return (
    <>
      <div className="flex pb-4 cursor-pointer hover:underline  hover:brightness-110">
        <div className="w-[120px] h-16 ">
          <Link href={`/news/${id}`}>
            <Image
              src={thumbnail}
              width={120}
              height={64}
              className="rounded-lg "
              alt="이미지없음"
            />
          </Link>
        </div>
        <div className="pl-4 flex flex-col  max-w-[406px] gap-4">
          <Link href={`/news/${id}`}>
            <div className="b4 font-medium text-grayscale-900 text-overflow-1 ">
              {title}
            </div>
          </Link>
          <div className="text-sm text-grayscale-600">
            {diffCreatedTime(date)} · {publisher}
          </div>
        </div>
      </div>
    </>
  );
}
