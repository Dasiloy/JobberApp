import { TUser } from "@/types/user.type";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface IStore {
  user: TUser | null;
  setUser: (user: TUser) => void;
}

/**
 * Create a store using the immer middleware
 */
export const useStore = create<IStore>()(
  immer((set) => ({
    user: null,
    setUser: (user) =>
      set((state) => {
        state.user = user;
      }),
  }))
);
