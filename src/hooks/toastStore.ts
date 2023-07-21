import { create } from "zustand";

interface ToastInfo {
  title: string;
  type?: "error";
}

interface ModeState {
  toastInfo: ToastInfo | null;
  toast: (toastInfo: ToastInfo) => void;
}

export const useToast = create<ModeState>((set) => ({
  toastInfo: null,
  toast: (info) => {
    set(({ toastInfo }) => ({ toastInfo: info }));
    setTimeout(() => set(() => ({ toastInfo: null })), 3000);
  },
}));
