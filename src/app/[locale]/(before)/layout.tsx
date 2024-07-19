import Logo from '@/assets/logos/logo_dark.svg';
import { auth as getSession } from '@/auth';
import IntlClientProvider from '@/components/shared/IntlClientProvider';
import Link from 'next/link';
import { redirect } from 'next/navigation';
export default async function BeforeLayout({
  children,
}: // modal,
Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  if (session && new Date(session.expires) > new Date()) {
    redirect('/home');
  }
  return (
    <div
      className={`w-full min-h-dvh bg-background-100 pt-32 pb-20 px-14 text-grayscale-900 flex justify-center`}
    >
      <div className="w-full min-w-[1200px] h-[80px] flex items-center px-28 bg-[#FFFFFF] fixed top-0 z-50">
        <div className="w-[1200px] flex items-center mx-auto">
          <Link href="/login">
            <Logo />
          </Link>
        </div>
      </div>
      <IntlClientProvider>{children}</IntlClientProvider>
    </div>
  );
}
