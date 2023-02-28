import { type NextPage } from "next";
import { GenerateButton } from "~/components/generateButton";

const Home: NextPage = () => {
  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
      </h1>
      <GenerateButton />
    </div>
  );
};

export default Home;
