import { type NextPage } from "next";
import { LetterCountButtons } from "~/components/letterCountButtons";
import { LetterSelectionLayout } from "~/components/letterSelectionLayout";

const Home: NextPage = () => {
  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <LetterSelectionLayout />
    </div>
  );
};

export default Home;
