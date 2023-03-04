export type WordleState = LettersState;

export interface LettersState {
  letters: number;
  setLetters: (letters: number) => void;
}
