import React from 'react';
import ProfileUpdate from '@/components/user/ProfileUpdated';
import CheckPassword from '@/components/user/CheckPassword';
import UserAccountEdit from '@/components/user/UserAccountEdit';
import myPageStore from '@/store/myPageStore';

const Modals = () => {
  const {
    isProfileSetup,
    isPasswordCheck,
    isUserAccountdit,
    isWithdrawal,
    openModal,
    closeModal,
    setIsWithdrawal,
    closeAllModals,
  } = myPageStore();

  const handleAccountEdit = () => openModal('isUserAccountdit');

  // 비밀번호 체크 모달 딛기
  const handleClosePwCheckModal = () => {
    closeModal('isPasswordCheck');
  };

  const handleSetWithdrawal = () => {
    //회원 삭제처리 되었는지
    setIsWithdrawal();
    closeAllModals();
  };

  return (
    <>
      {isProfileSetup && <ProfileUpdate onClose={closeAllModals} />}
      {isPasswordCheck && (
        <CheckPassword
          onClose={handleClosePwCheckModal}
          onSuccess={handleAccountEdit}
        />
      )}
      {isUserAccountdit && (
        <UserAccountEdit
          isWithdrawal={isWithdrawal}
          handleSetWithdrawal={handleSetWithdrawal}
          onClose={closeAllModals}
        />
      )}
    </>
  );
};

export default Modals;
