import create from 'zustand';

type PopupState = {
  isShowPopup: boolean;
  isConfirmPopup?: boolean;
  popupMsg: { title: string; msg: string };
  showPopup: (title: string, msg: string) => void;
  showConfirmPopup: (title: string, msg: string) => void;
  hidePopup: () => void;
};

const usePopupStore = create<PopupState>((set) => ({
  isShowPopup: false,
  isConfirmPopup: false,
  popupMsg: { title: '', msg: '' },
  showPopup: (title, msg) =>
    set({ isShowPopup: true, popupMsg: { title, msg } }),
  hidePopup: () =>
    set({
      isShowPopup: false,
      isConfirmPopup: false,
      popupMsg: { title: '', msg: '' },
    }),
  showConfirmPopup: (title, msg) =>
    set({ isConfirmPopup: true, popupMsg: { title, msg } }),
}));

export default usePopupStore;
