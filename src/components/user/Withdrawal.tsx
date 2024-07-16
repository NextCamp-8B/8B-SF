import ModalWrapper from './ModalWrapper';
import React, {
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import Wrapper from '@/components/shared/Wrapper';
import TextButton from '@/components/shared/buttons/TextButton';
import InputSet from '@/components/shared/input';
import useInputChange from '@/hooks/input/useInputChange';
import myPageStore from '@/store/myPageStore';
import { SelectedOption } from '../shared/dropdown/types';
import { Dropdown } from '../shared/dropdown';
import usePopupStore from '@/store/userPopup';
import AuthPopup from '../signup/Popup';
import LoadingSpinnerWrapper from '../shared/LoadingSpinnerWrapper';
import { conceptMap } from '../shared/input/inputConfig';
import ConfirmCancelPopup from './ConfirmCanclePopup';
import CompositeInput from '../shared/input/CompositeInput';
import { withdrawalOptions } from '@/constants';
import { useCheckPassword } from '@/hooks/user/useCheckPw';

// 회원탈퇴
export default function Withdrawal() {
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
    setIsWithdrawal();
    closeAllModals();
  };

  // 회원정보 수정 모달 닫기
  const handleCloseWidthdrawl = () => closeModal('isWithdrawal');

  const validateForm = useCallback(() => {
    const isPasswordValid = conceptMap.password.doValidation(
      value.password,
    );
    setIsFormValid(isPasswordValid);
  }, [value.password]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  const chekckWithdrawal = async (e: FormEvent) => {
    e.preventDefault();
    // 회원탈퇴 로직
    setIsSubmit(true);
    if (!isFormValid) return;
    const isValid = await checkPassword(value.password);
    if (isValid) {
      // 유저가 확인 누를시 handleConfirmWithdrawal 회원탈퇴 api 요청
      showConfirmPopup(
        '회원탈퇴 경고',
        '탈퇴 후 7일간 가입하신 이메일로\n재가입이 불가합니다. 정말 탈퇴하시겠습니까?',
      );
    }
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
      handleSetWithdrawal();
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
                label="테스트"
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
              <InputSet.Validated
                onChange={onChangeInputValue}
                value={value.password}
                type="password"
                concept="password"
                isSubmit={isSubmit}
              />
            </InputSet>
            <TextButton className="w-full mt-8">회원탈퇴</TextButton>
          </form>
        </Wrapper>
      </LoadingSpinnerWrapper>
    </ModalWrapper>
  );
}
