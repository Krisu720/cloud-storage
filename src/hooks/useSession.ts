import { User } from "lucia/dist/core";
import { create } from "zustand";

type SessionStoreType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useSession = create<SessionStoreType>((set) => ({
  user: null,
  setUser: (user: User | null) => set(() => ({ user })),
}));
