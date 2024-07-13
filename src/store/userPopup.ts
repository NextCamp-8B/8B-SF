import create from 'zustand';

type PopupState = {
  isShowPopup: boolean;
  popupMsg: { title: string; msg: string };
  showPopup: (title: string, msg: string) => void;
  hidePopup: () => void;
};

const usePopupStore = create<PopupState>((set) => ({
  isShowPopup: false,
  popupMsg: { title: '', msg: '' },
  showPopup: (title, msg) =>
    set({ isShowPopup: true, popupMsg: { title, msg } }),
  hidePopup: () =>
    set({ isShowPopup: false, popupMsg: { title: '', msg: '' } }),
}));

export default usePopupStore;
