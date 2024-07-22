import React, {
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import useInputChange from '@/hooks/input/useInputChange';
import myPageStore from '@/store/myPageStore';
import { SelectedOption } from '../shared/dropdown/types';
import usePopupStore from '@/store/userPopup';
import AuthPopup from '../signup/Popup';
import LoadingSpinnerWrapper from '../shared/LoadingSpinnerWrapper';
import { conceptMap } from '../shared/input/inputConfig';
import ConfirmCancelPopup from './ConfirmCanclePopup';
import { useCheckPassword } from '@/hooks/user/useCheckPw';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import ModalLayout from '../shared/modal/ModalLayout';
import WithdrawalForm from './WithdrawalForm';

// 회원탈퇴
export default function Withdrawal() {
  const t = useTranslations('MyPage');
  const { value, onChangeInputValue } = useInputChange();
  const [isLoading, setIsLoading] = useState(false); //api 로딩 체크
  const [isSubmit, setIsSubmit] = useState(false); // 폼 submit
  const [isFormValid, setIsFormValid] = useState(false); //폼 유효성 체크
  const [etc, setEtc] = useState(''); //회원탈퇴 사유 기타
  const [reason, setReason] = useState(''); //선택한 회원탈퇴 사유

  const { checkPassword } = useCheckPassword();

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
    value.password = '';
  };

  const validateForm = useCallback(() => {
    const isPasswordValid = conceptMap.password.doValidation(
      value.password,
    );
    setIsFormValid(isPasswordValid);
  }, [value.password]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  // 회월탈퇴 경고 팝업
  const chekckWithdrawal = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmit(true);
    if (!isFormValid) return;
    setIsLoading(true);
    const isValid = await checkPassword(value.password);
    if (isValid) {
      // 유저가 확인 누를시 handleConfirmWithdrawal 회원탈퇴 api 요청
      showConfirmPopup(
        t('accountDeletionMessages.warningTitle'),
        t('accountDeletionMessages.warningMessage'),
      );
    }
    setIsLoading(false);
  };

  const handleConfirmWithdrawal = async () => {
    hidePopup();
    setIsLoading(true);
    const formData = new FormData();
    const withdrawalReason = reason === '기타' ? etc : reason;
    formData.append('password', value.password.trim());
    formData.append('reason', withdrawalReason);

    const response = await fetch('/api/withdrawal', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      handleSetWithdrawal();
      value.password = '';
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
            <form
              className="flex flex-col items-center justify-start h-full mt-10"
              onSubmit={chekckWithdrawal}
            >
              <WithdrawalForm
                etc={etc}
                handleSelected={handleSelected}
                reason={reason}
                setEtc={setEtc}
              />
            </form>
          </LoadingSpinnerWrapper>
        </ModalLayout>
      )}
    </>
  );
}
