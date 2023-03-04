import * as React from "react";
import { GenerateWordleButton } from "./generateWordleButton";
import { LetterCountButtons } from "./letterCountButtons";

export const LetterSelectionLayout: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-5">
      <span className="text-xl">Choose number of letters</span>
      <LetterCountButtons />
      <GenerateWordleButton />
    </div>
  );
};
