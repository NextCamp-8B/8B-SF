import myPageStore from '@/store/myPageStore';
import MyPageSection from './MyPageSection';
import UserProfile from './UserProfile';
import { User } from 'next-auth';
import ProfileUpdate from './ProfileUpdated';
import CommonSection from './CommonSection';

type SectionProfile = {
  user: User;
};

export default function SectionProfile({ user }: SectionProfile) {
  const { openModal } = myPageStore();

  const handleProfileEdit = () => openModal('isProfileSetup');

  return (
    <>
      <ProfileUpdate user={user} />
      <MyPageSection>
        <CommonSection
          title="프로필 설정"
          description="서비스 사용시 보여지는 프로필을 생성 및 변경합니다. 프로필을 설정해보세요."
          buttonText="프로필 수정"
          onButtonClick={handleProfileEdit}
        />
        <UserProfile
          nickname={user.nickname!}
          profileImg={user.profileImg as string}
        />
      </MyPageSection>
    </>
  );
}
