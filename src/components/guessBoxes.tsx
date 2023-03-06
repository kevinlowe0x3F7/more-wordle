/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { useStore } from "~/store/store";
import * as React from "react";
import clsx from "clsx";
import { shallow } from "zustand/shallow";
import { calculateGuessColoring, type GuessColoring } from "~/utils/guesses";

export const GuessBoxes: React.FC = () => {
  const {
    letters,
    guesses: currentGuesses,
    stagedGuess: currentStagedGuess,
    addToStagedGuess,
    removeLastStagedGuess,
    submitGuess,
    answer,
  } = useStore((state) => {
    return {
      letters: state.letters,
      guesses: state.guesses,
      stagedGuess: state.stagedGuess,
      addToStagedGuess: state.addToStagedGuess,
      removeLastStagedGuess: state.removeLastStagedGuess,
      submitGuess: state.submitGuess,
      answer: state.answer,
    };
  }, shallow);
  const numGuesses = React.useMemo(() => Math.ceil(26 / letters), [letters]);

  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) {
        return;
      }

      if (e.key === "Backspace") {
        removeLastStagedGuess();
      } else if (e.key === "Enter") {
        submitGuess();
      } else {
        addToStagedGuess(e.key);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    // Don't forget to clean up
    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [addToStagedGuess, removeLastStagedGuess, submitGuess]);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const boxes = [...Array(numGuesses)].flatMap((_, g) => {
    const guess = currentGuesses[g];
    const guessColoring = calculateGuessColoring(guess ?? "", answer);
    return [...Array(letters)].map((_, i) => {
      const letter =
        g < currentGuesses.length
          ? currentGuesses[g]?.charAt(i)
          : g === currentGuesses.length
          ? currentStagedGuess.charAt(i)
          : undefined;
      return (
        <GuessBox
          key={`${g}:${i}`}
          guessIndex={i}
          isSubmittedGuess={g < currentGuesses.length}
          guessColoring={guessColoring[i] ?? "absent"}
          letter={letter !== "" ? letter : undefined}
        />
      );
    });
  });
  const classNames = clsx("grid gap-1", getGridColClassName(letters));
  return <div className={classNames}>{boxes}</div>;
};

const GuessBox: React.FC<{
  isSubmittedGuess: boolean;
  letter: string | undefined;
  guessColoring: GuessColoring;
  guessIndex: number;
}> = ({ isSubmittedGuess, letter, guessIndex, guessColoring }) => {
  return (
    <div className="h-10 w-10 [perspective:1000px] sm:h-16 sm:w-16">
      <div
        className={clsx(
          "relative h-full w-full border-2 text-3xl font-bold transition-transform duration-1000 [transform-style:preserve-3d]",
          { "[transform:rotateX(180deg)]": isSubmittedGuess },
          {
            "border-gray-600": letter == null,
            "border-gray-200": letter != null,
          },
          getTransitionDelayClassName(guessIndex)
        )}
      >
        <div
          className={clsx(
            "absolute flex h-full w-full items-center justify-center [backface-visibility:hidden]"
          )}
        >
          {letter}
        </div>
        <div
          className={clsx(
            "absolute flex h-full w-full items-center justify-center [backface-visibility:hidden]",
            { "[transform:rotateX(180deg)]": isSubmittedGuess },
            {
              "bg-green-800": isSubmittedGuess && guessColoring === "correct",
              "bg-yellow-500": isSubmittedGuess && guessColoring === "present",
            }
          )}
        >
          {letter}
        </div>
      </div>
    </div>
  );
};

/**
 * Tailwind needs the whole classname to make sure the css is grabbed
 * https://tailwindcss.com/docs/content-configuration#dynamic-class-names
 */
function getGridColClassName(letters: number) {
  switch (letters) {
    case 3:
      return "grid-cols-3";
    case 4:
      return "grid-cols-4";
    case 5:
      return "grid-cols-5";
    case 6:
      return "grid-cols-6";
    case 7:
      return "grid-cols-7";
    case 8:
      return "grid-cols-8";
    default:
      return "";
  }
}

/**
 * Tailwind needs the whole classname to make sure the css is grabbed
 * https://tailwindcss.com/docs/content-configuration#dynamic-class-names
 */
function getTransitionDelayClassName(letterIndex: number) {
  switch (letterIndex) {
    case 0:
      return "";
    case 1:
      return "delay-[150ms]";
    case 2:
      return "delay-[300ms]";
    case 3:
      return "delay-[450ms]";
    case 4:
      return "delay-[600ms]";
    case 5:
      return "delay-[750ms]";
    case 6:
      return "delay-[900ms]";
    case 7:
      return "delay-[1050ms]";
    default:
      return "";
  }
}
