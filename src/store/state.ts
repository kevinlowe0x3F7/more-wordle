export type WordleState = LettersState;

export interface LettersState {
  stagedLetters: number;
  letters: number;
  setStagedLetters: (stagedLetters: number) => void;
  setLetters: () => void;
}
