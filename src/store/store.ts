import { create } from "zustand";
import { type WordleState } from "./state";

export const useStore = create<WordleState>()((set) => ({
  stagedLetters: 5,
  letters: 5,
  setStagedLetters: (stagedLetters: number) => set(() => ({ stagedLetters })),
  setLetters: () => set((state) => ({ letters: state.stagedLetters })),
}));
