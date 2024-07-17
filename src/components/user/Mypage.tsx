'use client';
import useSessionData from '@/hooks/user/useSessionData';
import SkeletonProfileSection from '../skeleton/mypage/SkeletonProfile';
import SectionProfile from './SectionProfile';
import SectionAccount from './SectionAccount';

export default function MyPage() {
  const { user, isSocial, loading } = useSessionData();

  // useSession loading이라면 skeleton ui
  if (loading) {
    return <SkeletonProfileSection />;
  }

  return (
    <>
      {/* 유저 프로필 설정 */}
      <SectionProfile user={user} />
      {/* 유저 계정 설정 */}
      <SectionAccount user={user} isSocial={isSocial} />
    </>
  );
}
