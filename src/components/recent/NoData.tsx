import Exclamation from '@/assets/icons/exclamation.svg';
import { useTranslations } from 'next-intl';

export default function NoData() {
  const t = useTranslations('Home');
  return (
    <>
      <div className="flex flex-col">
        <div className="items-center justify-center flex">
          <Exclamation />
        </div>
        <div className="b1 font-medium mt-3">
          {t('recent_not_search')}
        </div>
      </div>
    </>
  );
}
