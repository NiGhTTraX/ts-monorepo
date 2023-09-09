/* eslint-disable no-alert */
import { meaningOfLife } from "@nighttrax/foo";
import React, { FC } from "react";

export const Button: FC = () => (
  <button
    type="button"
    onClick={() => alert(`the meaning of life is ${meaningOfLife}`)}
  >
    Click me
  </button>
);
