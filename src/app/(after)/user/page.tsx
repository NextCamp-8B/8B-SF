'use client';
import Wrapper from '@/components/shared/Wrapper';
import Sidebar from '@/components/user/Sidebar';
import { useState } from 'react';
import CheckPassword from '@/components/user/CheckPassword';
import UserAccountEdit from '@/components/user/UserAccountEdit';
import WithdrawalComplete from '@/components/user/ithdrawalComplete';
import LanguageSection from '@/components/user/LanguageSection';
import { LanguageType, SectionType } from '@/components/user/types';
import ProfileSection from '@/components/user/ProfileSection';
import TermsSection from '@/components/user/TermsSection';
import { User as UserType } from '@/store/userStore';
import SkeletonProfileSection from '@/components/skeleton/mypage/SkeletonProfile';
import ProfileUpdate from '@/components/user/ProfileUpdated';
import useSessionData from '@/hooks/user/useSessionData';

export default function User() {
  const [isProfileSetup, setIsProfileSetup] = useState(false); //프로필 수정
  const [isPasswordCheck, setIsPasswordCheck] = useState(false); //비밀번호 체크
  const [isUserProfileEdit, setIsUserProfileEdit] = useState(false); //정보 수정
  const [isWithdrawal, setIsWithdrawal] = useState(false); //회원삭제
  const [selectedSection, setSelectedSection] =
    useState<SectionType>('profile'); // 사이드바 섹션 종류
  const [selectedLanguage, setSelectedLanguage] =
    useState<LanguageType>('kr');

  const { user, isSocial, loading } = useSessionData();

  // 프로필 수정 모달 열기
  const handleProfileEdit = () => setIsProfileSetup(true);
  // 비밀번호 체크 모달 열기
  const handlePwCheckModal = () => {
    if (isSocial) {
      setIsUserProfileEdit(true);
    }
    setIsPasswordCheck(true);
  };
  // 개인 정보 수정 모달 열기
  const handleAccountEdit = () => setIsUserProfileEdit(true);

  const handleUserProfileEdit = () => {
    //유저 정보수정 로직
  };

  const handleSetWithdrawal = () => {
    //회원 삭제처리 되었는지
    setIsWithdrawal(true);
    handleCloseModal();
  };
  const handleCloseModal = () => {
    setIsProfileSetup(false);
    setIsPasswordCheck(false);
    setIsUserProfileEdit(false);
  };

  const handleSelectedSection = (section: SectionType) => {
    setSelectedSection(section);
  };

  return (
    <>
      {/* 모달 */}
      {!loading && (
        <>
          {/* 프로필 수정 */}
          {isProfileSetup && (
            <ProfileUpdate onClose={handleCloseModal} />
          )}
          {/* 비밀번호 확인 */}
          {isPasswordCheck && (
            <CheckPassword
              onClose={handleCloseModal}
              onSuccess={handleAccountEdit} // 성공시 개인정보 수정 모달
            />
          )}
          {/* 유저 정보 수정 */}
          {isUserProfileEdit && (
            <UserAccountEdit
              isWithdrawal={isWithdrawal}
              setIsWithdrawal={setIsWithdrawal}
              handleSubmit={handleUserProfileEdit}
              handleSetWithdrawal={handleSetWithdrawal}
              onClose={handleCloseModal}
              isSocial={isSocial}
              user={user}
            />
          )}
        </>
      )}
      {/* 회원탈퇴 성공 */}
      {isWithdrawal ? (
        <WithdrawalComplete />
      ) : (
        <main className="w-full max-w-[1200px] min-h-dvh  bg-background-100 pt-6 pb-20 text-grayscale-900 m-auto">
          <h1 className="h4 font-bold text-primary-900">
            마이 페이지
          </h1>
          <div className="flex mt-6 gap-x-8 min-h-[720px]">
            {/*  사이드 바 */}
            <Sidebar
              handleSelectedSection={handleSelectedSection}
              selectedSection={selectedSection}
            />
            {/* 유저 정보, 언어설정, 이용약관*/}
            <Wrapper padding="px-8 py-8" width="w-[900px]">
              {selectedSection === 'profile' ? (
                // 유저 정보설정
                loading ? (
                  <SkeletonProfileSection />
                ) : (
                  <ProfileSection
                    handleProfileEdit={handleProfileEdit}
                    handlePwCheckModal={handlePwCheckModal}
                    user={user as UserType}
                  />
                )
              ) : selectedSection === 'language' ? (
                // 언어설정
                <LanguageSection
                  selectedLanguage={selectedLanguage}
                  setSelectedLanguage={setSelectedLanguage}
                />
              ) : (
                // 이용약관
                selectedSection === 'terms' && <TermsSection />
              )}
            </Wrapper>
          </div>
        </main>
      )}
    </>
  );
}
