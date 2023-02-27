"use client";

import { Button } from "@mui/material";
import * as React from "react";

export const GenerateButton: React.FC = () => {
  const helloWorld = React.useCallback(
    () => console.log("clicked generate button"),
    []
  );
  return <Button onClick={helloWorld}>Generate Wordle</Button>;
};
