import { type NextPage } from "next";
import { LetterCountButtons } from "~/components/letterCountButtons";

const Home: NextPage = () => {
  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <LetterCountButtons />
    </div>
  );
};

export default Home;
