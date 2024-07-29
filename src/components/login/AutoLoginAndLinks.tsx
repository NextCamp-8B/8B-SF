import CheckBox from '@/components/shared/Checkbox';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

type AutoLoginAndLinksProps = {
  isAutoLogin: boolean;
  setIsAutoLogin: (autoLogin: boolean) => void;
};

const AutoLoginAndLinks = ({
  isAutoLogin,
  setIsAutoLogin,
}: AutoLoginAndLinksProps) => {
  const t = useTranslations('Login');

  return (
    <div className="flex px-1 justify-between font-nomal b5">
      <CheckBox
        label={t('auto_login')}
        checked={isAutoLogin}
        onChange={() => setIsAutoLogin(!isAutoLogin)}
      />
      <div className="flex flex-nowrap space-x-2">
        <Link
          href="/find/id"
          className="text-sm text-blue-500 hover:underline text-right"
          aria-label={t('find_id')}
        >
          {t('find_id')}
        </Link>
        <span>|</span>
        <Link
          href="/find/pw"
          className="text-sm text-blue-500 hover:underline text-left"
          aria-label={t('find_pw')}
        >
          {t('find_pw')}
        </Link>
      </div>
    </div>
  );
};

export default AutoLoginAndLinks;
