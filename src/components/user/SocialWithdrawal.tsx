import React, { FormEvent, useCallback, useState } from 'react';
import myPageStore from '@/store/myPageStore';
import { SelectedOption } from '../shared/dropdown/types';
import usePopupStore from '@/store/userPopup';
import AuthPopup from '../signup/Popup';
import LoadingSpinnerWrapper from '../shared/LoadingSpinnerWrapper';
import ConfirmCancelPopup from './ConfirmCanclePopup';
import { signOut } from 'next-auth/react';
import { User } from 'next-auth';
import { useTranslations } from 'next-intl';
import ModalLayout from '../shared/modal/ModalLayout';
import WithdrawalForm from './WithdrawalForm';

type SocialWithdrawal = {
  user: User;
  isSocial: boolean;
};

// 소셜 회원탈퇴
export default function SocialWithdrawal({
  user,
  isSocial,
}: SocialWithdrawal) {
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
  const handleSetWithdrawal = useCallback(() => {
    closeAllModals();
    setIsWithdrawal();
  }, [closeAllModals, setIsWithdrawal]);

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

  const handleConfirmWithdrawal = useCallback(async () => {
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
  }, [
    hidePopup,
    setIsLoading,
    reason,
    etc,
    user.userId,
    handleSetWithdrawal,
    showPopup,
    t,
  ]);

  const handleSelected = (value: SelectedOption) => {
    setReason(value.text);
  };

  return (
    <>
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

      {!isShowPopup && !isConfirmPopup && (
        <ModalLayout
          handleIsOpen={handleCloseWidthdrawl}
          isOpen={isWithdrawal}
          title={t('delete_account')}
          width="w-[590px]"
        >
          <LoadingSpinnerWrapper isLoading={isLoading}>
            <WithdrawalForm
              etc={etc}
              handleSelected={handleSelected}
              reason={reason}
              setEtc={setEtc}
              handleWithdrawal={chekckWithdrawal}
              isSocial={isSocial}
            />
          </LoadingSpinnerWrapper>
        </ModalLayout>
      )}
    </>
  );
}
