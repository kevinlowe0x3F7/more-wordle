export interface WordleState {
  stagedLetters: number;
  letters: number;
  setStagedLetters: (stagedLetters: number) => void;
  setLetters: () => void;
}
