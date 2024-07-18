import { useHook } from "@hooks/hook";
import { Button } from "@nighttrax/components/button";
import { meaningOfLife } from "@nighttrax/foo";
import React from "react";

export const App = () => {
  useHook();

  return (
    <div>
      {meaningOfLife}
      <Button />
    </div>
  );
};
