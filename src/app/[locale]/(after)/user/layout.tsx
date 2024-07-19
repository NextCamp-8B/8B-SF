import Sidebar from '@/components/user/Sidebar';
import Wrapper from '@/components/shared/Wrapper';
import IntlClientProvider from '@/components/shared/IntlClientProvider';

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full max-w-[1200px] min-h-dvh bg-background-100 pt-6 pb-20 text-grayscale-900 m-auto">
      <h1 className="h4 font-bold text-primary-900">마이 페이지</h1>
      <div className="flex mt-6 gap-x-8 min-h-[720px]">
        <IntlClientProvider>
          <Sidebar />
          <Wrapper padding="px-8 py-8" width="w-[900px]">
            {children}
          </Wrapper>
        </IntlClientProvider>
      </div>
    </main>
  );
}
