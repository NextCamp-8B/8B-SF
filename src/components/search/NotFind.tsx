import Exclamation from '@/assets/icons/exclamation.svg';
import { useTranslations } from 'next-intl';

export default function NotFind({
  type,
}: {
  type: 'stock' | 'news';
}) {
  const t = useTranslations('Search');

  const comment = () => {
    if (type === 'stock') {
      return t('not_found_stock');
    }
    if (type === 'news') {
      return t('not_found_news');
    }
  };

  return (
    <>
      <div className="flex flex-col ">
        <div className="items-center justify-center flex">
          <Exclamation />
        </div>
        <div className="b1 font-bold text-primary-900 mt-3 flex justify-center">
          {comment()}
        </div>
      </div>
    </>
  );
}
