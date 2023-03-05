import { create } from "zustand";
import { type WordleState } from "./state";

export const useStore = create<WordleState>()((set) => ({
  stagedLetters: 5,
  letters: 5,
  setStagedLetters: (stagedLetters: number) => set(() => ({ stagedLetters })),
  setLetters: () => set((state) => ({ letters: state.stagedLetters })),

  stagedGuess: "",
  guesses: [],
  addToStagedGuess: (letter: string) => set((state) => {
    if (letter.length !== 1 || !letter.match("[a-zA-Z]") || state.stagedGuess.length === state.letters) {
      return state;
    }

    return ({ stagedGuess: state.stagedGuess + letter.toLocaleUpperCase()})
  }),
  removeLastStagedGuess: () => set((state) => ({ stagedGuess: state.stagedGuess.substring(0, state.stagedGuess.length - 1)})),
  submitGuess: () => set((state) => {
    if (state.stagedGuess.length !== state.letters) {
      return state;
    }

    return ({ stagedGuess: "", guesses: [...state.guesses, state.stagedGuess]});
  }),

  answer: "AUDIO",
}));
