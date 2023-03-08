import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";
import { type WordleState } from "./state";

export const useStore = create<WordleState>()((set, get) => ({
  stagedLetters: 5,
  letters: 5,
  setStagedLetters: (stagedLetters: number) => set(() => ({ stagedLetters })),
  setLetters: () => set((state) => ({ letters: state.stagedLetters, stagedGuess: "", guesses: [], answer: "A".repeat(state.stagedLetters), })),

  stagedGuess: "",
  guesses: [],
  addToStagedGuess: (letter: string) => set((state) => {
    if (letter.length !== 1 || !letter.match("[a-zA-Z]") || state.stagedGuess.length === state.letters) {
      return state;
    }

    return ({ stagedGuess: state.stagedGuess + letter.toLocaleUpperCase()})
  }),
  removeLastStagedGuess: () => set((state) => ({ stagedGuess: state.stagedGuess.substring(0, state.stagedGuess.length - 1)})),
  submitGuess: () => {
    const { stagedGuess, letters, guesses } = get();
    /*
    if (stagedGuess.length !== letters) {
      return;
    }
    */
    console.log("submitting guess", guesses, stagedGuess, letters);

    set(() => ({ stagedGuess: "", guesses: [...guesses, stagedGuess]}));
  },

  answer: "AAAAA",
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("WordleStore", useStore);
}
