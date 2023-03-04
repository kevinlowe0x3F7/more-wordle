export interface WordleState {
  stagedLetters: number;
  letters: number;
  setStagedLetters: (stagedLetters: number) => void;
  setLetters: () => void;

  stagedGuess: string;
  guesses: string[];
  addToStagedGuess: (letter: string) => void;
  removeLastStagedGuess: () => void;
  submitGuess: () => void;
}
