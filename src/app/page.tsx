import { type NextPage } from "next";
import { GuessesLayout } from "~/components/guessesLayout";
import { LetterSelectionLayout } from "~/components/letterSelectionLayout";

const Home: NextPage = () => {
  return (
    <div className="container flex flex-col items-center gap-12 p-10">
      <LetterSelectionLayout />
      <GuessesLayout />
    </div>
  );
};

export default Home;
