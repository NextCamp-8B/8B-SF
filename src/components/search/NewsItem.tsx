import Image from 'next/image';
import { News } from '@/types/news';
import { diffCreatedTime } from '@/utils/date';
import Link from 'next/link';

export default function NewsItem({ news }: { news: News }) {
  const {
    published_at,
    publisher,
    news_id,
    thumbnail,
    title_en,
    content_en,
    summary_en,
    title_ko,
    content_ko,
    summary_ko,
    title_fr,
    content_fr,
    summary_fr,
    title_ja,
    content_ja,
    summary_ja,
    title_zh,
    content_zh,
    summary_zh,
    view,
  } = news;
  return (
    <>
      <div className="flex pb-4 cursor-pointer hover:underline  hover:brightness-110">
        <div className="w-[120px] h-16 ">
          <Link href={`/news/${news_id}`}>
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
          <Link href={`/news/${news_id}`}>
            <div className="b4 font-medium text-grayscale-900 text-overflow-1 ">
              {title_en}
            </div>
          </Link>
          <div className="text-sm text-grayscale-600">
            {diffCreatedTime(published_at)} · {publisher}
          </div>
        </div>
      </div>
    </>
  );
}
