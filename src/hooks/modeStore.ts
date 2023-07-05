import { create } from "zustand";
import { persist } from "zustand/middleware";
interface ModeState {
  isDark: boolean;
  changeMode: () => void;
}

export const useModeStore = create<ModeState>()(
  persist(
    (set) => ({
    isDark: false,
    changeMode: () => set((state) => ({ isDark: !state.isDark })),
  }),
  {name: "modeStorage"}
  )
);
