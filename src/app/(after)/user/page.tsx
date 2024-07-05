'use client';
import Wrapper from '@/components/shared/Wrapper';
import Sidebar from '@/components/user/Sidebar';
import ProfileSetup from '@/components/signup/ProfileSetup';
import { useState } from 'react';
import CheckPassword from '@/components/user/CheckPassword';
import UserProfileEdit from '@/components/user/UserProfileEdit';
import WithdrawalComplete from '@/components/user/ithdrawalComplete';
import LanguageSection from '@/components/user/LanguageSection';
import { LanguageType, SectionType } from '@/components/user/types';
import ProfileSection from '@/components/user/ProfileSection';
import TermsSection from '@/components/user/TermsSection';

export default function User() {
  const [isProfileSetup, setIsProfileSetup] = useState(false); //프로필 수정
  const [isPasswordCheck, setIsPasswordCheck] = useState(false); //비밀번호 체크
  const [isUserProfileEdit, setIsUserProfileEdit] = useState(false); //정보 수정
  const [isWithdrawal, setIsWithdrawal] = useState(false); //회원삭제
  const [selectedSection, setSelectedSection] =
    useState<SectionType>('profile'); // 사이드바 섹션 종류
  const [selectedLanguage, setSelectedLanguage] =
    useState<LanguageType>('kr');
  const userInfo = [
    { label: '아이디', value: 'sfacspaceid' },
    { label: '이름', value: '김스펙' },
    { label: '생년월일', value: '991231' },
  ];
  const handleProfileEdit = () => {
    // 프로필 수정 로직
    setIsProfileSetup(true);
  };
  const handleAccountEdit = () => {
    // 계정 수정 로직
    setIsPasswordCheck(true);
  };

  const handleCheckPassword = () => {
    //유저 비밀번호 확인 로직
    setIsUserProfileEdit(true);
    setIsPasswordCheck(false);
  };

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
      {(isProfileSetup || isPasswordCheck || isUserProfileEdit) && (
        <>
          {/* 프로필 수정 */}
          {isProfileSetup && (
            <ProfileSetup
              buttonText="수정하기"
              isModal={true}
              onClose={handleCloseModal}
            />
          )}
          {/* 비밀번호 확인 */}
          {isPasswordCheck && (
            <CheckPassword
              handleSubmit={handleCheckPassword}
              onClose={handleCloseModal}
            />
          )}
          {/* 유저 정보 수정 */}
          {isUserProfileEdit && (
            <UserProfileEdit
              isWithdrawal={isWithdrawal}
              setIsWithdrawal={setIsWithdrawal}
              handleSubmit={handleUserProfileEdit}
              handleSetWithdrawal={handleSetWithdrawal}
              onClose={handleCloseModal}
            />
          )}
        </>
      )}
      {/* 회원탈퇴 성공 */}
      {isWithdrawal ? (
        <WithdrawalComplete />
      ) : (
        <main className="w-full min-w-[1200px] min-h-dvh  bg-background-100 pt-6 pb-20 px-16 text-grayscale-900">
          <h1 className="h4 font-bold text-primary-900">
            마이 페이지
          </h1>
          <div className="flex mt-6 gap-x-10 min-h-[720px]">
            {/*  Sidebar */}
            <Sidebar
              handleSelectedSection={handleSelectedSection}
              selectedSection={selectedSection}
            />
            {/* Content */}
            <Wrapper padding="px-6 py-8" width="w-full">
              {selectedSection === 'profile' ? (
                // 유저 정보설정
                <ProfileSection
                  handleProfileEdit={handleProfileEdit}
                  handleAccountEdit={handleAccountEdit}
                  userInfo={userInfo}
                />
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
