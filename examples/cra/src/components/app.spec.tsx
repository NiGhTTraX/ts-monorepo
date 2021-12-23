import React from "react";
import { render } from "react-dom";
import { App } from "./app";

describe("App", () => {
  it("should render without crashing", () => {
    const div = document.createElement("div");
    render(<App />, div);
  });
});
