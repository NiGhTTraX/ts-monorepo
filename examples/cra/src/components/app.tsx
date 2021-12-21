import React from "react";
import { Button } from "@nighttrax/components/button";
import { meaningOfLife } from "@nighttrax/foo";
import { useTest } from "@hooks/test";

export const App = () => {
  useTest();

  return (
    <div>
      {meaningOfLife}
      <Button />
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </div>
  );
};
