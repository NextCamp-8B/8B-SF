import myPageStore from '@/store/myPageStore';
import MyPageSection from './MyPageSection';
import { User } from 'next-auth';
import CheckPassword from './CheckPassword';
import UserAccountEdit from './UserAccountEdit';
import CommonSection from './CommonSection';
import UserInfoList from './UserInfoList';

type SectionAccount = {
  user: User;
  isSocial: boolean;
};

export default function SectionAccount({
  user,
  isSocial,
}: SectionAccount) {
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
    ...(!isSocial ? [{ label: '아이디', value: user?.userId! }] : []),
    { label: '이름', value: user?.name! },
    { label: '생년월일', value: user?.birth! },
    { label: '핸드폰번호', value: user?.phoneNumber! },
  ];

  return (
    <>
      {!isSocial && <CheckPassword />}
      <UserAccountEdit user={user} isSocial={isSocial} />
      <MyPageSection className="mt-14">
        <CommonSection
          title="계정 설정"
          description="서비스 이용시 사용하는 계정을 생성 및 변경합니다. 계정을 인증하여 다양한 서비스를 이용해보세요."
          buttonText="개인정보 수정"
          onButtonClick={handlePwCheckModal}
        />
        <UserInfoList userInfo={userInfo} />
      </MyPageSection>
    </>
  );
}
