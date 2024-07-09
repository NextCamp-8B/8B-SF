import create from 'zustand';

interface User {
  name?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  birth?: string;
  profileImg?: File | string;
  nickname?: string;
  interestStock?: string;
  updatedAt?: string;
  userId?: string;
  providerAccountId?: string;
}

interface UserStore {
  user: User;
  setUser: (user: Partial<User>) => void;
  clearUser: () => void;
}

const useUserStore = create<UserStore>()((set) => ({
  user: {},
  setUser: (user: Partial<User>) =>
    set((state) => ({
      user: { ...state.user, ...user },
    })),
  clearUser: () => set({ user: {} }),
}));

export default useUserStore;
