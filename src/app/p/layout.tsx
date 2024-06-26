import Logo from '@/assets/logos/logo_dark.svg';
import Link from 'next/link';
export default function PopupLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
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
      {/* 병렬,인터셉트 라우트 활용해서 임시발급 비밀번호 모달창 발생*/}
      {/* p/find/pw?modal=true 경로에서 발생 */}
      {modal}
    </div>
  );
}
