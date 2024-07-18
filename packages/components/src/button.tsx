/* eslint-disable no-alert */
import { useMeaningOfLife } from "@components/hooks/useMeaningOfLife";
import React, { FC } from "react";

export const Button: FC = () => {
  const meaningOfLife = useMeaningOfLife();

  return (
    <button
      type="button"
      onClick={() => alert(`the meaning of life is ${meaningOfLife}`)}
    >
      Click me
    </button>
  );
};
