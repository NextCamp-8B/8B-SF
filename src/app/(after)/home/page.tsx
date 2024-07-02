import NewsSection from '@/components/news/NewsSection';
import Recent from '../../../components/recent/Recent';
import Card from '@/components/shared/Card';
import NewsBorder from '@/components/news/NewsBorder';
import NewsListItem from '@/components/shared/NewsListItem';
import HomeRecentNews from '@/components/news/HomeRecentNews';
import { TMP_NEWS } from '@/constants';
import HomeRelatedNews from '@/components/news/HomeRelatedNews';
import HomeNewsTab from '@/components/news/HomeNewsTab';
import FavoriteMain from '@/components/homefavorite/FavoriteMain';

const tmpStock = [
  {
    stock_id: '1a1a1a',
    stock_name: '애플1',
    stock_code: 'AAPL',
    compare_to_previous_close_price: 1.2,
    fluctuations_ratio: 0.82,
    logo_path:
      'https://zlxqxgiycccjxcwzonsx.supabase.co/storage/v1/object/public/8b-sf/stock_logo/unity_logo.svg',
    price: 123123,
  },
  {
    stock_id: '2b2b2b',
    stock_name: '애플2',
    stock_code: 'AAPL',
    compare_to_previous_close_price: 1.0,
    fluctuations_ratio: -0.72,
    logo_path: '',
    price: 123123,
  },
  {
    stock_id: '3c3c3c',
    stock_name: '애플3',
    stock_code: 'AAPL',
    compare_to_previous_close_price: 2.0,
    fluctuations_ratio: -0.62,
    logo_path: '',
    price: 123123,
  },
  {
    stock_id: '4d4d4d',
    stock_name: '애플4',
    stock_code: 'AAPL',
    compare_to_previous_close_price: 3.0,
    fluctuations_ratio: -0.52,
    logo_path: '',
    price: 123123,
  },
];
export default function Home() {
  return (
    <>
      <main className="flex items-center justify-center w-full flex-col gap-12">
        <div className="w-[1200px] flex gap-5">
          <Recent data={tmpStock} />
          <FavoriteMain data={tmpStock} />
        </div>
        <HomeNewsTab />
      </main>
    </>
  );
}
