export type GuessColoring = "not-present" | "correct" | "wrong-location";

export function calculateGuessColoring(guess: string, answer: string): GuessColoring[] {
  if (guess.length !== answer.length) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return [...guess].map(_char => "not-present");
  }

  const coloringsMap = new Map<number, GuessColoring>();
  for (let i = 0; i < guess.length; i++) {
    if (guess.charAt(i) === answer.charAt(i)) {
      coloringsMap.set(i, "correct");
    }
  }

  for (let i = 0; i < guess.length; i++) {
    if (answer.indexOf(guess.charAt(i)) !== -1 && !coloringsMap.has(i)) {
      coloringsMap.set(i, "wrong-location");
    } 
  }

  const colorings: GuessColoring[] = [];
  for (let i = 0; i < guess.length; i++) {
    colorings.push(coloringsMap.get(i) ?? "not-present");
  }

  return colorings;
}
