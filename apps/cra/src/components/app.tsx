import { Button } from "@nighttrax/components/button";
import { useMeaningOfLife } from "@nighttrax/components/hooks/useMeaningOfLife";
import { meaningOfLife } from "@nighttrax/foo";
import React from "react";

export const App = () => {
  useMeaningOfLife();

  return (
    <div>
      {meaningOfLife}
      <Button />
    </div>
  );
};
