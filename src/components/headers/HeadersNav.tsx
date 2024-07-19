import Link from 'next/link';
import Logo from '@/assets/logos/logo_dark.svg';
import { getLocale, getTranslations } from 'next-intl/server';
import SignOutButton from '../user/SignoutButton';

export default async function HeadersNav() {
  const t = await getTranslations('Header');
  const locale = getLocale();

  return (
    <>
      <div className="w-full h-[80px] flex justify-center bg-[#FFFFFF] fixed top-0 left-0 z-50">
        <div className="w-[1200px] flex items-center justify-center">
          <Link href="/home">
            <Logo />
          </Link>

          <div className="flex ">
            <div className="w-[160px] justify-center flex b3 font-medium text-grayscale-900">
              <Link
                href="/search"
                className="hover:underline hover:scale-110"
              >
                {t('search')}
              </Link>
            </div>
            <div className="w-[160px] justify-center flex b3 font-medium text-grayscale-900">
              <Link
                href="/news"
                className="hover:underline hover:scale-110"
              >
                {t('news')}
              </Link>
            </div>
            <div className="w-[160px] justify-center flex b3 font-medium text-grayscale-900">
              <Link
                href="/stock"
                className="hover:underline hover:scale-110"
              >
                {t('stock')}
              </Link>
            </div>
            <div className="w-[160px] justify-center flex b3 font-medium text-grayscale-900">
              <Link
                href="/stock/interest"
                className="hover:underline hover:scale-110"
              >
                {t('interest')}
              </Link>
            </div>
            <div className="w-[160px] justify-center flex b3 font-medium text-grayscale-900">
              <Link
                href="/user"
                className="hover:underline hover:scale-110"
              >
                {t('my')}
              </Link>
            </div>
          </div>
          <div className="w-[160px] flex ml-auto ">
            <SignOutButton> {t('logout')}</SignOutButton>
          </div>
        </div>
      </div>
    </>
  );
}
