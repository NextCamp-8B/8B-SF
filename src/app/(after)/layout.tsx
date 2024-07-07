import Logo from '@/assets/logos/logo_dark.svg';
import ChatbotMain from '@/components/chatbot/ChatbotMain';
import TextButton from '@/components/shared/buttons/TextButton';
import Link from 'next/link';
export default function AfterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`min-w-full min-h-dvh bg-background-100 pt-32 pb-20 px-14 text-grayscale-900 flex justify-center`}
    >
      <div className="w-full h-[80px] flex items-center bg-[#FFFFFF] fixed top-0 z-50">
        <div className="w-[1200px] flex items-center mx-auto">
          <Link href="/home">
            <Logo />
          </Link>

          <div className="flex ">
            <div className="w-[160px] justify-center flex b3 font-medium text-grayscale-900">
              <Link
                href="/search"
                className="hover:underline hover:scale-110"
              >
                발견
              </Link>
            </div>
            <div className="w-[160px] justify-center flex b3 font-medium text-grayscale-900">
              <Link
                href="/news"
                className="hover:underline hover:scale-110"
              >
                뉴스
              </Link>
            </div>
            <div className="w-[160px] justify-center flex b3 font-medium text-grayscale-900">
              <Link
                href="/stock"
                className="hover:underline hover:scale-110"
              >
                관심종목
              </Link>
            </div>
            <div className="w-[160px] justify-center flex b3 font-medium text-grayscale-900">
              <Link
                href="user"
                className="hover:underline hover:scale-110"
              >
                마이페이지
              </Link>
            </div>
          </div>
          <div className="w-[160px] flex ml-auto ">
            <Link href="/">
              <TextButton.Light size="hf"> 로그아웃</TextButton.Light>
            </Link>
          </div>
        </div>
      </div>
      {children}
      <div className="fixed bottom-10 right-16 ">
        <ChatbotMain />
      </div>
    </div>
  );
}
