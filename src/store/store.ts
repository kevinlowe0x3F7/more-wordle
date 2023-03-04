import { create, type StateCreator } from "zustand";
import { type WordleState, type LettersState } from "./state";

export const createLettersStore: StateCreator<LettersState> = (set) => ({
  letters: 5,
  setLetters: (letters: number) => set(() => ({ letters, })),
});

export const useStore = create<WordleState>()((...params) => ({
  ...createLettersStore(...params),
}));
