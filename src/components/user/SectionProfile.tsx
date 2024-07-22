'use client';
import myPageStore from '@/store/myPageStore';
import MyPageSection from './MyPageSection';
import UserProfile from './UserProfile';
import { User } from 'next-auth';
import ProfileUpdate from './ProfileUpdated';
import CommonSection from './CommonSection';
import { useTranslations } from 'next-intl';

type SectionProfile = {
  user: User;
};

export default function SectionProfile({ user }: SectionProfile) {
  const t = useTranslations();
  const { openModal, isProfileSetup } = myPageStore();

  const handleProfileEdit = () => openModal('isProfileSetup');

  return (
    <>
      {isProfileSetup && <ProfileUpdate user={user} />}
      <MyPageSection>
        <CommonSection
          title={t('MyPage.edit_profile_title')}
          description={t('MyPage.edit_profile_content')}
          buttonText={t('MyPage.edit_profile')}
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
