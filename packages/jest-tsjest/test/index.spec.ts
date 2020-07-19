import { whatIsTheMeaningOfLife } from "../src";

describe("meaning of life", () => {
  it("should be 42", () => {
    expect(whatIsTheMeaningOfLife()).toEqual(42);
  });
});
