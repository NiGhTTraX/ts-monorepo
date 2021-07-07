import React from "react";
import ReactDOM from "react-dom";
import { meaningOfLife } from "@nighttrax/foo";
import { Button } from "@nighttrax/components/button";

ReactDOM.render(
  <React.StrictMode>
    {meaningOfLife}
    <Button />
  </React.StrictMode>,
  document.getElementById("root")
);
