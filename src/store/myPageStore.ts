import create from 'zustand';

type ModalName =
  | 'isProfileSetup'
  | 'isPasswordCheck'
  | 'isUserAccountdit'
  | 'isWithdrawal';

type MyPageState = {
  isProfileSetup: boolean; //프로필 수정
  isPasswordCheck: boolean; //비밀번호 확인
  isUserAccountdit: boolean; //개인정보 수정
  isWithdrawal: boolean; //회원탈퇴
  openModal: (modalName: ModalName) => void;
  closeModal: (modalName: ModalName) => void;
  setIsWithdrawal: () => void; //탈퇴 성공 모달
  closeAllModals: () => void; //전체 모달창 닫기
};

// Zustand 스토어 생성
const myPageStore = create<MyPageState>((set) => ({
  isProfileSetup: false,
  isPasswordCheck: false,
  isUserAccountdit: false,
  isWithdrawal: false,

  openModal: (modalName) => set({ [modalName]: true }),
  closeAllModals: () =>
    set({
      isProfileSetup: false,
      isPasswordCheck: false,
      isUserAccountdit: false,
      isWithdrawal: false,
    }),
  closeModal: (modalName) => set({ [modalName]: false }),
  setIsWithdrawal: () => set({ isWithdrawal: true }),
}));

export default myPageStore;
