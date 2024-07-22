import SectionProfile from './SectionProfile';
import SectionAccount from './SectionAccount';
import { auth as getSession } from '@/auth';
import { Session } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function MyPage() {
  const { user } = (await getSession()) as Session;

  if (!user) {
    return redirect('/login/error?error=SessionExpired');
  }
  const isSocial =
    user?.provider &&
    ['kakao', 'google', 'naver'].includes(user.provider)
      ? true
      : false;

  return (
    <>
      {/* 유저 프로필 설정 */}
      <SectionProfile user={user} />
      {/* 유저 계정 설정 */}
      <SectionAccount user={user} isSocial={isSocial} />
    </>
  );
}
