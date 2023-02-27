import * as React from "react";

export const NavBar: React.FC = () => {
  return (
    <div className="flex h-10 w-full items-center justify-center border-b-[1px] border-gray-50 bg-[#2e026d] p-6">
      <div className="text-2xl font-bold text-white">More Wordle</div>
    </div>
  );
};
