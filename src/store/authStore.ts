import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: any | null;
  setUser: (userData: any) => void;
  clearUser: () => void;
  updateUser: (updatedFields: Partial<any>) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (userData) => set({ user: userData }),
      clearUser: () => set({ user: null }),
      updateUser: (updatedFields) =>
        set({
          user: {
            ...get().user,
            ...updatedFields,
          },
        }),
    }),
    {
      name: "userDetails",
    }
  )
);

export default useAuthStore;
