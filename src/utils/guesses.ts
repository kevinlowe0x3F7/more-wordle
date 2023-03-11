export type GuessColoring = "absent" | "correct" | "present";

export function calculateGuessColoring(guess: string, answer: string): GuessColoring[] {
  if (guess.length !== answer.length) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return [...guess].map(_char => "absent");
  }

  const lettersLeft = new Set();
  const coloringsMap = new Map<number, GuessColoring>();
  for (let i = 0; i < guess.length; i++) {
    if (guess.charAt(i) === answer.charAt(i)) {
      coloringsMap.set(i, "correct");
    } else {
      lettersLeft.add(answer.charAt(i));
    }
  }

  for (let i = 0; i < guess.length; i++) {
    if (lettersLeft.has(guess.charAt(i))) {
      coloringsMap.set(i, "present");
    } 
  }

  const colorings: GuessColoring[] = [];
  for (let i = 0; i < guess.length; i++) {
    colorings.push(coloringsMap.get(i) ?? "absent");
  }

  return colorings;
}
