import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";
import { type WordleState } from "./state";
import { FIVE_LETTER_WORDS } from "~/words/words-5";
import { THREE_LETTER_WORDS } from "~/words/words-3";
import { FOUR_LETTER_WORDS } from "~/words/words-4";
import { SIX_LETTER_WORDS } from "~/words/words-6";
import { SEVEN_LETTER_WORDS } from "~/words/words-7";
import { EIGHT_LETTER_WORDS } from "~/words/words-8";

const getRandomWord = (letters: number) => {
  let words: string[] = [];
  if (letters === 3) {
    words = THREE_LETTER_WORDS;
  } else if (letters === 4) {
    words = FOUR_LETTER_WORDS;
  } else if (letters === 5) {
    words = FIVE_LETTER_WORDS;
  } else if (letters === 6) {
    words = SIX_LETTER_WORDS;
  } else if (letters === 7) {
    words = SEVEN_LETTER_WORDS;
  } else if (letters === 8) {
    words = EIGHT_LETTER_WORDS;
  }

  return words[Math.floor(Math.random() * (words.length - 1))];
}

const isInWords = (guess: string) => {
  let words: string[] = [];
  if (guess.length === 3) {
    words = THREE_LETTER_WORDS;
  } else if (guess.length === 4) {
    words = FOUR_LETTER_WORDS;
  } else if (guess.length === 5) {
    words = FIVE_LETTER_WORDS;
  } else if (guess.length === 6) {
    words = SIX_LETTER_WORDS;
  } else if (guess.length === 7) {
    words = SEVEN_LETTER_WORDS;
  } else if (guess.length === 8) {
    words = EIGHT_LETTER_WORDS;
  }

  return words.includes(guess);
}

export const useStore = create<WordleState>()((set, get) => ({
  stagedLetters: 5,
  letters: 5,
  setStagedLetters: (stagedLetters: number) => set(() => ({ stagedLetters })),
  setLetters: () => set((state) => ({ letters: state.stagedLetters, stagedGuess: "", guesses: [], answer: getRandomWord(state.stagedLetters)?.toLocaleUpperCase() ?? "", })),

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
    if (stagedGuess.length !== letters || !isInWords(stagedGuess)) {
      return;
    }

    set(() => ({ stagedGuess: "", guesses: [...guesses, stagedGuess]}));
  },

  answer: getRandomWord(5)?.toLocaleUpperCase() ?? "",
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("WordleStore", useStore);
}
