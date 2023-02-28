import * as React from "react";

export const NavBar: React.FC = () => {
  return (
    <div className="flex h-16 w-full items-center justify-center border-b-[1px] border-gray-50 p-6">
      <div className="text-3xl font-bold">More Wordle</div>
    </div>
  );
};
