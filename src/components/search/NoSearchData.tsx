import NoData from '../recent/NoData';
import SearchHeading from './SearchHeading';
import { useTranslations } from 'next-intl';

export default function NoSearchData() {
  const t = useTranslations('Search');

  return (
    <>
      <div className="w-[590px]">
        <SearchHeading> {t('recent_search')} </SearchHeading>
        <div className="w-full rounded-2xl shadow-md bg-grayscale-0 py-6 flex justify-center">
          <NoData />
        </div>
      </div>
    </>
  );
}
