import { getTranslations } from 'next-intl/server';
import RecentItem from './RecentItem';
import IntlClientProvider from '../shared/IntlClientProvider';

export default async function Recent() {
  const t = await getTranslations('Home');

  return (
    <>
      <div className="flex flex-col">
        <div className="h4 font-bold text-primary-900">
          {t('recent_views')}
        </div>
        <div className="flex flex-col items-center bg-[#FFFFFF] rounded-2xl mt-6 min-w-[590px] min-h-[374px] ">
          <IntlClientProvider>
            <div className="mt-8">
              <RecentItem />
            </div>
          </IntlClientProvider>
        </div>
      </div>
    </>
  );
}
