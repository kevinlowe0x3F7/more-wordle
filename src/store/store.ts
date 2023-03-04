import { create, type StateCreator } from "zustand";
import { type WordleState, type LettersState } from "./state";

export const createLettersStore: StateCreator<LettersState> = (set) => ({
  stagedLetters: 5,
  letters: 5,
  setStagedLetters: (stagedLetters: number) => set(() => ({ stagedLetters })),
  setLetters: () => set((state) => ({ letters: state.stagedLetters })),
});

export const useStore = create<WordleState>()((...params) => ({
  ...createLettersStore(...params),
}));
