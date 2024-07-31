import React, { useCallback, useEffect, useState } from 'react';
import useInputChange from '@/hooks/input/useInputChange';
import { conceptMap } from '@/components/shared/input/inputConfig';
import AuthPopup from '../signup/Popup';
import ProfileDetails from '../shared/ProfileDetails';
import { useProfileUpdate } from '@/hooks/user/useProfileUpdated';
import LoadingSpinnerWrapper from '../shared/LoadingSpinnerWrapper';
import usePopupStore from '@/store/userPopup';
import myPageStore from '@/store/myPageStore';
import { useImageUpload } from '@/hooks/user/useImageUpload';
import { useStockSelection } from '@/hooks/user/useStockSelection';
import { User } from 'next-auth';
import { useTranslations } from 'next-intl';
import ModalLayout from '../shared/modal/ModalLayout';
import { UUID } from 'crypto';

type ProfileUpdate = {
  user: User;
};
export default function ProfileUpdate({ user }: ProfileUpdate) {
  const t = useTranslations('MyPage');
  const { closeAllModals, isProfileSetup } = myPageStore();

  const {
    profileImg: userImage,
    profileImgName: userImageName,
    accessToken,
    refreshToken,
    id,
  } = user;

  const { value, onChangeInputValue, setValue } = useInputChange(); //Input 관리
  const [isSubmit, setIsSubmit] = useState(false); // 폼 submit
  const [isFormValid, setIsFormValid] = useState(false); //폼 유효성 체크
  const { profileImage, profileFile, handleImageUpload } =
    useImageUpload(userImage); // 이미지 업로드 훅
  const [initialNickname, setInitialNickname] = useState(''); // 초기 닉네임 값
  const { isLoading, handleProfileUpdate } = useProfileUpdate(); //프로필 수정 api
  const { isShowPopup, popupMsg, hidePopup } = usePopupStore();

  const {
    searchText,
    isLoading: stockLoading,
    setSearchText,
    options,
    selectedDataset,
    focusedIndex,
    handleSelected,
    handleOptionsKey,
    validateAndUpdateStock,
  } = useStockSelection(id as UUID); // 관심종목 설정 훅

  const validateForm = useCallback(() => {
    const isNicknameChanged = value.nickname !== initialNickname;
    const isNicknameValid = conceptMap.nickname.doValidation(
      value.nickname,
    );
    setIsFormValid(isNicknameValid && isNicknameChanged);
  }, [value.nickname, initialNickname]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  // 닉네임 값 초기 설정
  useEffect(() => {
    if (user) {
      setValue((prevValue) => ({
        ...prevValue,
        nickname: user.nickname || '',
      }));
      setInitialNickname(user.nickname);
    }
  }, [user, setValue]);

  const onHandleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmit(true);
      if (!isFormValid) return;
      // 관심종목 id값 text로 변환
      setIsFormValid(false);
      const validStock = validateAndUpdateStock(searchText); // 유효하지 않은 입력, 주식 값 제거
      const formData = new FormData();
      formData.append('nickname', value.nickname.trim());
      formData.append('id', id as UUID);
      formData.append('interestStock', validStock);
      formData.append('profileImg', profileFile as File);
      formData.append('accessToken', accessToken || '');
      formData.append('refreshToken', refreshToken || '');
      formData.append('userBaseImg', userImageName || '');
      handleProfileUpdate(formData);
    },
    [
      isFormValid,
      searchText,
      validateAndUpdateStock,
      value.nickname,
      id,
      accessToken,
      refreshToken,
      handleProfileUpdate,
      profileFile,
      userImageName,
    ],
  );

  // session값 loadindg이면 팝업창 닫기 불가
  const handleCloseProfileModal = useCallback(() => {
    if (isLoading) return;
    closeAllModals();
  }, [isLoading, closeAllModals]);

  return (
    <>
      {/* 수정 성공/에러 메시지 팝업 */}
      {isShowPopup ? (
        <AuthPopup
          onClose={hidePopup}
          error={true}
          title={popupMsg.title}
          errorMessage={popupMsg.msg}
        />
      ) : (
        <ModalLayout
          isOpen={isProfileSetup}
          handleIsOpen={handleCloseProfileModal}
          title={t('edit_profile')}
          width="w-[590px]"
        >
          <LoadingSpinnerWrapper isLoading={isLoading}>
            <ProfileDetails
              profileImage={profileImage}
              handleImageUpload={handleImageUpload}
              nickname={value.nickname}
              onChangeNickname={onChangeInputValue}
              isSubmit={isSubmit}
              stock={searchText}
              setStock={setSearchText}
              options={options}
              focusedIndex={focusedIndex}
              onHandleSubmit={onHandleSubmit}
              selectedDataset={selectedDataset}
              handleSelected={handleSelected}
              handleOptionsKey={handleOptionsKey}
              buttonText={t('edit')}
              isLoading={stockLoading}
            />
          </LoadingSpinnerWrapper>
        </ModalLayout>
      )}
    </>
  );
}
