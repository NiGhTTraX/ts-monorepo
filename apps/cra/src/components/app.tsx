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
    </div>
  );
};
