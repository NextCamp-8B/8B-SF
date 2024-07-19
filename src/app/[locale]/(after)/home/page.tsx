import Recent from '../../../../components/recent/Recent';
import HomeNewsTab from '@/components/news/HomeNewsTab';
import FavoriteMain from '@/components/homefavorite/FavoriteMain';
import AIReport from '@/components/home/AIReport';
import { auth as getSession } from '@/auth';
import { UUID } from 'crypto';
import { businessAPI } from '@/service/apiInstance';
import { Stock } from '@/types/stock';

export default async function Home() {
  const authData = await getSession();
  const user = authData?.user;
  const { id: userId, nickname } = user || {
    id: null,
    nickname: null,
  };
  const { getInterestStock } = businessAPI;
  const interestStocks = (
    userId &&
    (await getInterestStock({
      userId: userId as UUID,
      page: 1,
      size: 4,
      isServer: true,
    }))
  ).map(({ stock }: { stock: Stock }) => stock);
  console.log('test', nickname);

  return (
    <>
      <main className="flex items-center justify-center w-full flex-col gap-12">
        <AIReport nickname={nickname} stocks={interestStocks} />
        <div className="w-[1200px] flex gap-5">
          <Recent />
          <FavoriteMain data={interestStocks} />
        </div>
        <HomeNewsTab />
      </main>
    </>
  );
}
