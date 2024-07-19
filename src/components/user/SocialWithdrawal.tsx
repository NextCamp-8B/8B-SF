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
import { signOut } from 'next-auth/react';
import { User } from 'next-auth';
import { useTranslations } from 'next-intl';

type SocialWithdrawal = {
  user: User;
};

// 소셜 회원탈퇴
export default function SocialWithdrawal({ user }: SocialWithdrawal) {
  const [isLoading, setIsLoading] = useState(false); //api 로딩 체크
  const [etc, setEtc] = useState(''); //회원탈퇴 사유 기타
  const [reason, setReason] = useState(''); //선택한 회원탈퇴 사유
  const t = useTranslations('MyPage');

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
      t('accountDeletionMessages.warningTitle'),
      t('accountDeletionMessages.warningMessage'),
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
        t('accountDeletionMessages.errorTitle'),
        t('accountDeletionMessages.errorMessage'),
      );
    }
    setIsLoading(false);
  };

  const handleSelected = (value: SelectedOption) => {
    setReason(value.text);
  };

  const withdrawalOptions: SelectedOption[] = [
    {
      value: 'reason1',
      text: t('reason_1'),
      selected: false,
    },
    {
      value: 'reason2',
      text: t('reason_2'),
      selected: false,
    },
    {
      value: 'reason3',
      text: t('reason_3'),
      selected: false,
    },
    {
      value: 'reason4',
      text: t('reason_4'),
      selected: false,
    },
    {
      value: 'reason5',
      text: t('reason_5'),
      selected: false,
    },
  ];

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
            {t('delete_account')}
          </h3>
          <form
            className="flex flex-col justify-start w-[386px] h-full"
            onSubmit={chekckWithdrawal}
          >
            <InputSet className="flex flex-col gap-2">
              <Dropdown.Default
                label={t('delete_account_reason')}
                initialOptions={withdrawalOptions}
                selectOption={handleSelected}
              />
              {reason === t('reason_5') && (
                <CompositeInput.Input
                  id="stock"
                  type="text"
                  value={etc}
                  onChange={(e) => setEtc(e.target.value)}
                  className="border border-grayscale-400 b4 font-normal placeholder-grayscale-400 p-4 rounded-lg"
                  placeholder={t('placeholder_account')}
                />
              )}
            </InputSet>
            <TextButton className="w-full mt-8">
              {t('delete_account')}
            </TextButton>
          </form>
        </Wrapper>
      </LoadingSpinnerWrapper>
    </ModalWrapper>
  );
}
