import create from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  name?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  birth?: string;
  profileImg?: string;
  nickname?: string;
  interestStock?: string;
  updatedAt?: string;
  userId?: string;
}

interface UserStore {
  user: User;
  setUser: (user: Partial<User>) => void;
  clearUser: () => void;
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: {},
      setUser: (user: Partial<User>) =>
        set((state) => ({
          user: { ...state.user, ...user },
        })),
      clearUser: () => set({ user: {} }),
    }),
    {
      name: 'user-storage', // 로컬 스토리지에 저장될 이름
      getStorage: () => localStorage, // 기본값은 'localStorage'
    },
  ),
);

export default useUserStore;
