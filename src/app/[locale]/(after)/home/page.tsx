import Recent from '../../../../components/recent/Recent';
import HomeNewsTab from '@/components/news/HomeNewsTab';
import FavoriteMain from '@/components/homefavorite/FavoriteMain';
import AIReport from '@/components/home/AIReport';
import { auth as getSession } from '@/auth';
import { UUID } from 'crypto';
import IntlClientProvider from '@/components/shared/IntlClientProvider';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = false;

export default async function Home() {
  const authData = await getSession();
  const user = authData?.user;
  const {
    id: userId,
    nickname,
    language,
  } = user || {
    id: null,
    nickname: null,
    language: null,
  };
  const isEn = language === 'en';

  return (
    <>
      <main className="flex items-center justify-center w-full flex-col gap-12">
        <AIReport
          nickname={nickname}
          userId={userId as UUID}
          isEn={isEn}
        />
        <div className="w-[1200px] flex gap-5">
          <Recent />
          <IntlClientProvider>
            <FavoriteMain userId={userId as UUID} />
          </IntlClientProvider>
        </div>
        <HomeNewsTab />
      </main>
    </>
  );
}
