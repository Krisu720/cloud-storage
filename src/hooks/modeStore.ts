import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ModeState {
  isDark: boolean;
  changeMode: () => void;
  setMode: (isDark: boolean)=>void;
}

export const useModeStore = create<ModeState>()((set) => ({
  isDark: false,
  changeMode: () => set((state) => ({ isDark: !state.isDark })),
  setMode: (isDark)=> set(()=>({isDark}))
}));
