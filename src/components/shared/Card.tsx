import Image from 'next/image';
import StockIcon from './StockIcon';
import AI from '@/assets/icons/ai.svg';
import { createdDate, diffCreatedTime } from '@/utils/date';
import { News } from '@/types/news';
import LogoDark from '@/assets/logos/logo_dark.svg';

type TStock = {
  stock_id: string;
  stock_name: string;
  stock_code: string;
  compare_to_previous_close_price: number;
  fluctuations_ratio: number;
  logo_path: string;
  price: number;
};

type CardProps = {
  type: 'News1' | 'News2' | 'News3' | 'News4' | 'Stock';
  news?: News;
  stock?: TStock;
};

export default function Card(props: CardProps) {
  const { type, news, stock } = props;

  const newstime = news ? createdDate(news.published_at) : '';
  const diffTime = news ? diffCreatedTime(news.published_at) : null;

  return (
    <>
      {/* type == News1 (뉴스 날짜, 제목, 종목아이콘, 신문사) */}
      {type === 'News1' && news && (
        <div className="flex border-2 border-primary-100 w-[355px] h-[100px] items-center rounded-3xl justify-center bg-[#FFFFFF]">
          <div className="w-[323px] h-[52px] items-center flex">
            <div className="pr-8">
              <p className="b5 text-grayscale-400 mb-1">{newstime}</p>
              <span className="b2 text-grayscale-900 font-bold line-clamp-1 hover:underline cursor-pointer">
                {news.title_en}
              </span>
            </div>
            <div>
              <StockIcon size="small" path={stock?.logo_path} />
            </div>
          </div>
        </div>
      )}

      {/* type == Stock (종목이름, 종목아이콘) */}
      {type === 'Stock' && stock && (
        <div className="w-[275px] h-[56px] flex justify-between">
          <div className=" items-center flex overflow-hidden">
            <p className="b1 font-bold pr-2">{stock.stock_name} </p>
            <p className="b4">{stock.stock_code}</p>
          </div>
          <div className="pr-2 items-center flex">
            <StockIcon size="small" path="logo_path" />
          </div>
        </div>
      )}

      {/* type == News2 (뉴스제목, 뉴스썸네일, 뉴스시간) */}
      {type === 'News2' && news && (
        <div className="w-[388px] h-[360px] flex flex-col justify-center items-center bg-grayscale-0 rounded-t-2xl overflow-hidden">
          <div className="w-[388px] h-[236px] flex justify-center items-center relative overflow-hidden">
            {news.thumbnail ? (
              <Image
                src={news.thumbnail}
                alt="thumbnail"
                fill
                className="rounded-t-2xl transform transition-transform duration-700 ease-in-out hover:scale-125 cursor-pointer"
              />
            ) : (
              <LogoDark />
            )}
          </div>
          <div className="w-[388px] h-[124px] flex flex-col rounded-b-2xl justify-center items-center shadow-md bg-[#FFFFFF]">
            <p className="b3 font-medium px-6 overflow-hidden line-clamp-2  hover:underline cursor-pointer">
              {news.title_en}
            </p>
            <div className="flex justify-between w-[340px] mt-2">
              <div className="b5 font-medium text-grayscale-600 ">
                {diffTime} · {news.publisher}
              </div>
              <div className="b5 cursor-pointer">더보기 →</div>
            </div>
          </div>
        </div>
      )}

      {/* type === News3 (뉴스제목, 뉴스내용, 날짜) */}
      {type === 'News3' && news && (
        <div className="w-[590px] h-[420px] flex flex-col bg-grayscale-0">
          <div className=" h-[420px] relative flex flex-col overflow-hidden rounded-2xl items-center justify-center">
            {news.thumbnail ? (
              <Image
                src={news.thumbnail}
                alt="thumbnail"
                fill
                className=" object-cover transition-transform duration-700 ease-in-out hover:scale-125 cursor-pointer"
              />
            ) : (
              <LogoDark />
            )}

            <div className="w-full h-[168px] absolute text-center bottom-0 inset-x-0 bg-gradient-to-t from-[rgba(63,63,63,1)] to-[rgba(63,63,63,0)] ">
              <p className="b1 font-bold text-overflow-1 px-6 pt-6 text-[#FFFFFF] hover:underline cursor-pointer ">
                {news.title_en}
              </p>
              <p className="b5 font-medium text-overflow-2 px-6 pt-3 text-[#FFFFFF] hover:underline cursor-pointer">
                {news.content_en}
              </p>
              <p className="b5 font-medium text-grayscale-300 pb-6 px-6 pt-4 text-start">
                {newstime} · {news.publisher}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* type === News4 (뉴스제목, 뉴스내용, 날짜) */}
      {type === 'News4' && news && (
        <div className="w-[590px] h-[200px] relative flex flex-col overflow-hidden rounded-2xl bg-grayscale-0 items-center justify-center">
          {news.thumbnail ? (
            <Image
              src={news.thumbnail}
              alt="thumbnail"
              fill
              className="object-cover transition-transform duration-700 ease-in-out hover:scale-125 cursor-pointer"
            />
          ) : (
            <LogoDark />
          )}

          <div className=" h-[114px] absolute text-center bottom-0 inset-x-0 bg-gradient-to-t from-[rgba(63,63,63,1)] to-[rgba(63,63,63,0)]">
            <p className="b1 font-bold px-6 pt-6 pb-4 text-[#FFFFFF] overflow-hidden text-ellipsis whitespace-nowrap hover:underline cursor-pointer">
              {news.title_en}
            </p>
            <p className="b5 font-medium text-grayscale-300 pb-6 px-6 text-start">
              {newstime} · {news.publisher}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
