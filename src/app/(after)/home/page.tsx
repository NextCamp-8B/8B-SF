import NewsSection from '@/components/news/NewsSection';
import Recent from '../../../components/recent/Recent';
import Card from '@/components/shared/Card';
import NewsBorder from '@/components/news/NewsBorder';
import NewsListItem from '@/components/shared/NewsListItem';
import HomeRecentNews from '@/components/news/HomeRecentNews';
import { TMP_NEWS } from '@/constants';
import HomeRelatedNews from '@/components/news/HomeRelatedNews';
import HomeNewsTab from '@/components/news/HomeNewsTab';
import FavoriteMain from '@/components/favorite/FavoriteMain';

const tmpStock = [
  {
    id: '1a1a1a',
    name: '애플1',
    subname: 'AAPL',
    value: '00.00',
    tmp1: 0.82,
    tmp2: 1.75,
    path: '',
  },
  {
    id: '2b2b2b',
    name: '애플2',
    subname: 'AAPL',
    value: '01.00',
    tmp1: -0.72,
    tmp2: 1.75,
    path: '',
  },
  {
    id: '3c3c3c',
    name: '애플3',
    subname: 'AAPL',
    value: '02.00',
    tmp1: -0.62,
    tmp2: 1.75,
    path: '',
  },
  {
    id: '4d4d4d',
    name: '애플4',
    subname: 'AAPL',
    value: '03.10',
    tmp1: -0.52,
    tmp2: 1.75,
    path: '',
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
