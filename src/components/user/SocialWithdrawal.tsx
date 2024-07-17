import ModalWrapper from './ModalWrapper';
import React, { FormEvent, useState } from 'react';
import Wrapper from '@/components/shared/Wrapper';
import TextButton from '@/components/shared/buttons/TextButton';
import InputSet from '@/components/shared/input';
import myPageStore from '@/store/myPageStore';
import { SelectedOption } from '../shared/dropdown/types';
import { Dropdown } from '../shared/dropdown';
import usePopupStore from '@/store/userPopup';
import AuthPopup from '../signup/Popup';
import LoadingSpinnerWrapper from '../shared/LoadingSpinnerWrapper';
import ConfirmCancelPopup from './ConfirmCanclePopup';
import CompositeInput from '../shared/input/CompositeInput';
import { withdrawalOptions } from '@/constants';
import { signOut } from 'next-auth/react';
import { User } from 'next-auth';

type SocialWithdrawal = {
  user: User;
};

// 소셜 회원탈퇴
export default function SocialWithdrawal({ user }: SocialWithdrawal) {
  const [isLoading, setIsLoading] = useState(false); //api 로딩 체크
  const [etc, setEtc] = useState(''); //회원탈퇴 사유 기타
  const [reason, setReason] = useState(''); //선택한 회원탈퇴 사유

  const {
    isShowPopup,
    popupMsg,
    hidePopup,
    showPopup,
    isConfirmPopup,
    showConfirmPopup,
  } = usePopupStore();

  const {
    closeModal,
    closeAllModals,
    setIsWithdrawal,
    isWithdrawal,
  } = myPageStore();

  //회원 삭제처리 성공 함수
  const handleSetWithdrawal = () => {
    closeAllModals();
    setIsWithdrawal();
  };

  // 회원정보 수정 모달 닫기
  const handleCloseWidthdrawl = () => {
    if (isLoading) return;
    closeModal('isWithdrawal');
  };

  // 회월탈퇴 경고 팝업
  const chekckWithdrawal = async (e: FormEvent) => {
    e.preventDefault();
    showConfirmPopup(
      '회원탈퇴 경고',
      '탈퇴 후 7일간 가입하신 이메일로\n재가입이 불가합니다. 정말 탈퇴하시겠습니까?',
    );
  };

  const handleConfirmWithdrawal = async () => {
    hidePopup();
    setIsLoading(true);
    const formData = new FormData();
    const withdrawalReason = reason === '기타' ? etc : reason;
    formData.append('reason', withdrawalReason);
    formData.append('password', user.userId);

    const response = await fetch('/api/withdrawal', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      handleSetWithdrawal();
      // session제거 후 withdrawal 리다이렉팅
      await signOut({ callbackUrl: data?.redirectTo });
    } else {
      showPopup(
        '회원탈퇴 오류',
        '오류가 발생했습니다. 다시 시도하시거나, 고객센터에 문의해주세요.',
      );
    }
    setIsLoading(false);
  };

  const handleSelected = (value: SelectedOption) => {
    setReason(value.text);
  };

  return (
    <ModalWrapper
      onClose={handleCloseWidthdrawl}
      isOpen={isWithdrawal}
    >
      {/* api성공/에러 팝업 */}
      {isShowPopup && (
        <AuthPopup
          onClose={hidePopup}
          error={true}
          title={popupMsg.title}
          errorMessage={popupMsg.msg}
        />
      )}
      {/* 회원탈퇴 경고 팝업 */}
      {isConfirmPopup && (
        <ConfirmCancelPopup
          onConfirm={handleConfirmWithdrawal}
          onClose={hidePopup}
          title={popupMsg.title}
          msg={popupMsg.msg}
        />
      )}
      <LoadingSpinnerWrapper isLoading={isLoading}>
        <Wrapper padding="px-24 py-20" width="w-[590px]">
          <h3 className="h3 font-bold text-center text-primary-900 mb-8">
            회원 탈퇴
          </h3>
          <form
            className="flex flex-col justify-start w-[386px] h-full"
            onSubmit={chekckWithdrawal}
          >
            <InputSet className="flex flex-col gap-2">
              <Dropdown.Default
                label="탈퇴 사유"
                initialOptions={withdrawalOptions}
                selectOption={handleSelected}
              />
              {reason === '기타' && (
                <CompositeInput.Input
                  id="stock"
                  type="text"
                  value={etc}
                  onChange={(e) => setEtc(e.target.value)}
                  className="border border-grayscale-400 b4 font-normal placeholder-grayscale-400 p-4 rounded-lg"
                  placeholder="#회원 탈퇴 사유를 입력해주세요"
                />
              )}
            </InputSet>
            <TextButton className="w-full mt-8">회원탈퇴</TextButton>
          </form>
        </Wrapper>
      </LoadingSpinnerWrapper>
    </ModalWrapper>
  );
}
