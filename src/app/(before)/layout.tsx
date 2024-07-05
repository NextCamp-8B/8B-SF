import Logo from '@/assets/logos/logo_dark.svg';
import Link from 'next/link';
export default function BeforeLayout({
  children,
}: // modal,
Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`w-full min-h-dvh bg-background-100 pt-32 pb-20 px-14 text-grayscale-900 flex justify-center`}
    >
      <div className="w-full min-w-[1200px] h-[80px] flex items-center px-28 bg-[#FFFFFF] fixed top-0 z-50">
        <Link href="/login">
          <Logo />
        </Link>
      </div>
      {children}
    </div>
  );
}
