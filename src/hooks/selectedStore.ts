import { Photos } from "@prisma/client";
import { create } from "zustand";
type CallbackFunction = (previousValue: Photos | null) => Photos | null;

interface ModeState {
  selected: Photos | null;
  setSelected: (photo: Photos | null | CallbackFunction) => void;
}

export const useSelected = create<ModeState>((set) => ({
  selected: null,
  setSelected: (photo) => {
    if (typeof photo === "function")
      set(({ selected }) => ({ selected: photo(selected) }));

    if (typeof photo !== "function") set({ selected: photo });
  },
}));
