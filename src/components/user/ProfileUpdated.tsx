'use client';

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
import useSessionData from '@/hooks/user/useSessionData';
import ModalWrapper from './ModalWrapper';
import usePopupStore from '@/store/userPopup';

type TProfileUpdate = {
  onClose: () => void;
};

const ProfileUpdate = ({ onClose }: TProfileUpdate) => {
  const { user } = useSessionData();
  const {
    nickname,
    interestStock,
    profileImg: userImage,
    profileImgName: userImageName,
    accessToken,
    refreshToken,
  } = user || {};
  const { value, onChangeInputValue } = useInputChange(); //Input 관리
  const [isSubmit, setIsSubmit] = useState(false); // 폼 submit
  const [isFormValid, setIsFormValid] = useState(false); //폼 유효성 체크
  const [stock, setStock] = useState(interestStock || ''); //관심종목
  const [profileImage, setProfileImage] = useState(userImage || ''); //base54 프로필 이미지
  const [profileFile, setProfileFile] = useState<File>(); // 프로필 이미지 파일
  const initialNicknameRef = useRef(false); //닉네임 초기값 설정
  const { isLoading, handleProfileUpdate } = useProfileUpdate(); //프로필 수정 api
  const { isShowPopup, popupMsg, hidePopup } = usePopupStore();

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

  const handleStockChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setStock(e.target.value);
  };

  const onHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmit(true);
    if (!isFormValid) return;
    setIsFormValid(false);

    const formData = new FormData();
    formData.append('nickname', value.nickname.trim());
    formData.append('interestStock', stock);
    formData.append('profileImg', profileFile as File);
    formData.append('accessToken', accessToken || '');
    formData.append('refreshToken', refreshToken || '');
    formData.append('userBaseImg', userImageName || '');
    handleProfileUpdate(formData);
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0] as File;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader?.result?.toString() as string;
        setProfileImage(base64String);
        setProfileFile(file);
      };
      reader.readAsDataURL(file);
    }
  };
  // session값 loadindg이면 팝업창 닫기 불가
  const handleCloseProfileModal = () => {
    if (isLoading) return;
    onClose();
  };

  return (
    <ModalWrapper onClose={handleCloseProfileModal}>
      <Wrapper padding="px-24 py-20" width="w-[590px]">
        <div className="flex flex-col justify-start w-[386px] h-full">
          <h3 className="h3 font-bold text-center mb-8 text-primary-900">
            프로필 수정
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
              handleStockChange={handleStockChange}
              onHandleSubmit={onHandleSubmit}
              buttonText="수정하기"
            />
          </LoadingSpinnerWrapper>
        </div>
      </Wrapper>
    </ModalWrapper>
  );
};

export default ProfileUpdate;
