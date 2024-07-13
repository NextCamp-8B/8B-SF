'use client';
import Wrapper from '@/components/shared/Wrapper';
import Sidebar from '@/components/user/Sidebar';
import { useState } from 'react';
import WithdrawalComplete from '@/components/user/ithdrawalComplete';
import LanguageSection from '@/components/user/LanguageSection';
import { LanguageType } from '@/components/user/types';
import ProfileSection from '@/components/user/ProfileSection';
import TermsSection from '@/components/user/TermsSection';
import myPageStore from '@/store/myPageStore';
import Modals from '@/components/user/MypageModals';

export default function MyPage() {
  const [selectedLanguage, setSelectedLanguage] =
    useState<LanguageType>('kr');

  const {
    isWithdrawal,
    selectedSection,
    openModal,
    setSelectedSection,
  } = myPageStore();

  // 프로필 수정 모달 열기
  const handleProfileEdit = () => openModal('isProfileSetup');

  // 비밀번호 체크 모달 열기
  const handlePwCheckModal = (isSocial: boolean) => {
    if (isSocial) {
      openModal('isUserAccountdit');
    }
    openModal('isPasswordCheck');
  };

  return (
    <>
      {/* 모달 */}
      <Modals />

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
              handleSelectedSection={setSelectedSection}
              selectedSection={selectedSection}
            />
            {/* 유저 정보, 언어설정, 이용약관*/}
            <Wrapper padding="px-8 py-8" width="w-[900px]">
              {selectedSection === 'profile' ? (
                <ProfileSection
                  handleProfileEdit={handleProfileEdit}
                  handlePwCheckModal={handlePwCheckModal}
                />
              ) : // 유저 정보설정
              selectedSection === 'language' ? (
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
