import Sidebar from '@/components/user/Sidebar';
import Wrapper from '@/components/shared/Wrapper';
import IntlClientProvider from '@/components/shared/IntlClientProvider';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import SkeletonProfileSection from '@/components/skeleton/mypage/SkeletonProfile';

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = await getTranslations('MyPage');
  return (
    <main className="w-full max-w-[1200px] min-h-dvh bg-background-100 pt-6 pb-20 text-grayscale-900 m-auto">
      <h1 className="h4 font-bold text-primary-900">
        {t('my_page')}
      </h1>
      <div className="flex mt-6 gap-x-8 min-h-[720px]">
        <IntlClientProvider>
          <Sidebar />
          <Wrapper padding="px-8 py-8" width="w-[900px]">
            <Suspense fallback={<SkeletonProfileSection />}>
              {children}
            </Suspense>
          </Wrapper>
        </IntlClientProvider>
      </div>
    </main>
  );
}
