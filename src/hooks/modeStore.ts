import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ModeState {
  isDark: boolean;
  setMode: (isDark: boolean)=>void;
}

export const useModeStore = create<ModeState>()((set) => ({
  isDark: false,
  setMode: (isDark)=> set(()=>({isDark}))
}));
