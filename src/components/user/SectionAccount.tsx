import myPageStore from '@/store/myPageStore';
import MyPageSection from './MyPageSection';
import { User } from 'next-auth';
import CheckPassword from './CheckPassword';
import UserAccountEdit from './UserAccountEdit';
import CommonSection from './CommonSection';
import UserInfoList from './UserInfoList';
import { useTranslations } from 'next-intl';

type SectionAccount = {
  user: User;
  isSocial: boolean;
};

export default function SectionAccount({
  user,
  isSocial,
}: SectionAccount) {
  const t = useTranslations();
  const { openModal } = myPageStore();

  const handlePwCheckModal = () => {
    if (isSocial) {
      openModal('isUserAccountdit');
    } else {
      openModal('isPasswordCheck');
    }
  };

  const userInfo = [
    // isSocal값이 true라면 id값 보이게
    ...(!isSocial
      ? [{ label: `${t('MyPage.id')}`, value: user?.userId! }]
      : []),
    { label: `${t('MyPage.name')}`, value: user?.name! },
    { label: `${t('MyPage.birth')}`, value: user?.birth! },
    {
      label: `${t('MyPage.phone_number')}`,
      value: user?.phoneNumber!,
    },
  ];

  return (
    <>
      {!isSocial && <CheckPassword />}
      <UserAccountEdit user={user} isSocial={isSocial} />
      <MyPageSection className="mt-14">
        <CommonSection
          title={t('MyPage.edit_account_title')}
          description={t('MyPage.edit_account_content')}
          buttonText={t('MyPage.edit_account')}
          onButtonClick={handlePwCheckModal}
        />
        <UserInfoList userInfo={userInfo} />
      </MyPageSection>
    </>
  );
}
