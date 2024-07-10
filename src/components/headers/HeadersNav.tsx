import Link from 'next/link';
import Logo from '@/assets/logos/logo_dark.svg';
import TextButton from '../shared/buttons/TextButton';
export default function HeadersNav() {
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
                href="/user"
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
    </>
  );
}
