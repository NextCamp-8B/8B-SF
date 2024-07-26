import React, { useCallback, useEffect, useState } from 'react';
import useInputChange from '@/hooks/input/useInputChange';
import Wrapper from '@/components/shared/Wrapper';
import { conceptMap } from '@/components/shared/input/inputConfig';
import useUserStore from '@/store/userStore';
import AuthPopup from './Popup';
import usePageStore from '@/store/signupStepStore';
import ProfileDetails from '../shared/ProfileDetails';
import LoadingSpinnerWrapper from '../shared/LoadingSpinnerWrapper';
import usePopupStore from '@/store/userPopup';
import { useImageUpload } from '@/hooks/user/useImageUpload';
import { useStockSelection } from '@/hooks/user/useStockSelection';
import { useTranslations } from 'next-intl';

// 마이페이지 설정에서 모달 과 회원가입 페이지에서 사용
export default function ProfileSetup() {
  const t = useTranslations();
  const { clearUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(false); //api 로딩 체크
  const { value, onChangeInputValue } = useInputChange(); //Input 관리
  const [isSubmit, setIsSubmit] = useState(false); // 폼 submit
  const [isFormValid, setIsFormValid] = useState(false); //폼 유효성 체크

  const { profileImage, profileFile, handleImageUpload } =
    useImageUpload(); // 이미지 업로드 훅

  //프로필 이미지 / null 값은 기본이미지
  const { setPageStep } = usePageStore(); //페이지 이동
  const { isShowPopup, popupMsg, hidePopup, showPopup } =
    usePopupStore();

  const {
    searchText,
    setSearchText,
    options,
    selectedDataset,
    focusedIndex,
    handleSelected,
    handleOptionsKey,
    validateAndUpdateStock,
  } = useStockSelection(); // 관심종목 설정 훅

  const validateForm = useCallback(() => {
    const isNicknameValid = conceptMap.nickname.doValidation(
      value.nickname,
    );
    setIsFormValid(isNicknameValid);
  }, [value.nickname]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  const onHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmit(true);
    if (!isFormValid) return;
    setIsFormValid(false);
    setIsLoading(true);
    // 관심종목 id값 text로 변환
    const validStock = validateAndUpdateStock(searchText); // 유효하지 않은 입력, 주식 값 제거
    setIsFormValid(false);
    const formData = new FormData();
    formData.append('nickname', value.nickname.trim());
    formData.append('interestStock', validStock);
    formData.append('profileImg', profileFile as File);

    // Zustand에서 유저 정보 가져오기 (회원가입일 경우)
    const updatedUser = useUserStore.getState().user;
    Object.entries(updatedUser).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await fetch('/api/user', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      clearUser(); // Zustand 스토리지에서 유저 데이터 삭제
      setPageStep('welcome');
    } else {
      showPopup(
        t('SignUp.sign_up_failed_title'),
        t('SignUp.sign_up_failed_content'),
      );
    }
    setIsLoading(false);
  };

  return (
    <>
      {/* 에러메시지 팝업 */}
      {isShowPopup && (
        <AuthPopup
          onClose={hidePopup}
          error={true}
          title={popupMsg.title}
          errorMessage={popupMsg.msg}
        />
      )}
      <Wrapper padding="px-24 py-20" width="w-[590px]">
        <div className="flex flex-col justify-start w-[386px] h-full">
          <h3 className="h3 font-bold text-center mb-8 text-primary-900">
            {t('SignUp.setting_profile')}
          </h3>
          <LoadingSpinnerWrapper isLoading={isLoading}>
            <ProfileDetails
              profileImage={profileImage}
              handleImageUpload={handleImageUpload}
              nickname={value.nickname}
              onChangeNickname={onChangeInputValue}
              isSubmit={isSubmit}
              options={options}
              focusedIndex={focusedIndex}
              stock={searchText}
              setStock={setSearchText}
              selectedDataset={selectedDataset}
              handleSelected={handleSelected}
              handleOptionsKey={handleOptionsKey}
              onHandleSubmit={onHandleSubmit}
              buttonText={t('SignUp.sign_up_btn')}
            />
          </LoadingSpinnerWrapper>
        </div>
      </Wrapper>
    </>
  );
}
