import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import useInputChange from '@/hooks/input/useInputChange';
import Wrapper from '@/components/shared/Wrapper';
import { conceptMap } from '@/components/shared/input/inputConfig';
import AuthPopup from '../signup/Popup';
import ProfileDetails from '../shared/ProfileDetails';
import { useProfileUpdate } from '@/hooks/user/useProfileUpdated';
import LoadingSpinnerWrapper from '../shared/LoadingSpinnerWrapper';
import ModalWrapper from './ModalWrapper';
import usePopupStore from '@/store/userPopup';
import myPageStore from '@/store/myPageStore';
import { useImageUpload } from '@/hooks/user/useImageUpload';
import { useStockSelection } from '@/hooks/user/useStockSelection';
import { User } from 'next-auth';
import { stockList } from '@/constants';
import { useTranslations } from 'next-intl';

type ProfileUpdate = {
  user: User;
};
export default function ProfileUpdate({ user }: ProfileUpdate) {
  const t = useTranslations();
  const { closeAllModals, isProfileSetup } = myPageStore();

  const {
    nickname,
    interestStock,
    profileImg: userImage,
    profileImgName: userImageName,
    accessToken,
    refreshToken,
  } = user;

  const { value, onChangeInputValue } = useInputChange(); //Input 관리
  const [isSubmit, setIsSubmit] = useState(false); // 폼 submit
  const [isFormValid, setIsFormValid] = useState(false); //폼 유효성 체크
  const { profileImage, profileFile, handleImageUpload } =
    useImageUpload(userImage); // 이미지 업로드 훅
  const initialNicknameRef = useRef(false); //닉네임 초기값 설정
  const { isLoading, handleProfileUpdate } = useProfileUpdate(); //프로필 수정 api
  const { isShowPopup, popupMsg, hidePopup } = usePopupStore();

  const {
    stock,
    setStock,
    options,
    selectedDataset,
    focusedIndex,
    setFocusedIndex,
    handleSelected,
    handleOptionsKey,
  } = useStockSelection(interestStock); // 관심종목 설정 훅

  // 유효하지 않은 주식 값 제거
  const validateAndUpdateStock = () => {
    const validStocks = stock
      .split(' ')
      .filter(
        (part) => part.startsWith('#') && stockList.includes(part),
      ) // #으로 시작하고 유효한 주식인지 검사
      .join(' ');

    return validStocks;
  };

  const validateForm = useCallback(() => {
    const isNicknameValid = conceptMap.nickname.doValidation(
      value.nickname,
    );
    setIsFormValid(isNicknameValid);
  }, [value.nickname]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  // 닉네임 값 초기 설정
  useEffect(() => {
    if (!initialNicknameRef.current && nickname) {
      value.nickname = nickname;
      initialNicknameRef.current = true;
    }
  }, [nickname, value]);

  const onHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmit(true);
    if (!isFormValid) return;
    setIsFormValid(false);

    const validStock = validateAndUpdateStock(); // 유효하지 않은 입력, 주식 값 제거

    const formData = new FormData();
    formData.append('nickname', value.nickname.trim());
    formData.append('interestStock', validStock);
    formData.append('profileImg', profileFile as File);
    formData.append('accessToken', accessToken || '');
    formData.append('refreshToken', refreshToken || '');
    formData.append('userBaseImg', userImageName || '');
    handleProfileUpdate(formData);
  };

  // session값 loadindg이면 팝업창 닫기 불가
  const handleCloseProfileModal = () => {
    if (isLoading) return;
    closeAllModals();
  };

  return (
    <ModalWrapper
      onClose={handleCloseProfileModal}
      isOpen={isProfileSetup}
    >
      <Wrapper padding="px-24 py-20" width="w-[590px]">
        <div className="flex flex-col justify-start w-[386px] h-full">
          <h3 className="h3 font-bold text-center mb-8 text-primary-900">
            {t('MyPage.edit_profile')}
          </h3>
          {/* 수정 성공/에러 메시지 팝업 */}
          {isShowPopup && (
            <AuthPopup
              onClose={hidePopup}
              error={true}
              title={popupMsg.title}
              errorMessage={popupMsg.msg}
            />
          )}
          <LoadingSpinnerWrapper isLoading={isLoading}>
            <ProfileDetails
              profileImage={profileImage}
              handleImageUpload={handleImageUpload}
              nickname={value.nickname}
              onChangeNickname={onChangeInputValue}
              isSubmit={isSubmit}
              stock={stock}
              setStock={setStock}
              options={options}
              focusedIndex={focusedIndex}
              onHandleSubmit={onHandleSubmit}
              selectedDataset={selectedDataset}
              handleSelected={handleSelected}
              handleOptionsKey={handleOptionsKey}
              buttonText={t('MyPage.edit')}
            />
          </LoadingSpinnerWrapper>
        </div>
      </Wrapper>
    </ModalWrapper>
  );
}
