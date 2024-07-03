// store/pageStore.ts
import create from 'zustand';

type PageStep =
  | 'agreement'
  | 'auth'
  | 'signupForm'
  | 'profile'
  | 'welcome';

interface PageStore {
  pageStep: PageStep;
  setPageStep: (step: PageStep) => void;
}

const usePageStore = create<PageStore>((set) => ({
  pageStep: 'agreement',
  setPageStep: (step) => set({ pageStep: step }),
}));

export default usePageStore;
