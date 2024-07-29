import Link from 'next/link';
import { useTranslations } from 'next-intl';

const SignupLink = () => {
  const t = useTranslations('Login');

  return (
    <div className="flex justify-between px-1 b5">
      <p className="text-sm">{t('signup')}</p>
      <Link
        href="/signup"
        className="text-secondary-600 underline"
        aria-label={t('signup')}
      >
        {t('signup')}
      </Link>
    </div>
  );
};

export default SignupLink;
