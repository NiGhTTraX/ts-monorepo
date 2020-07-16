import {whatIsTheMeaningOfLife} from "../src";

describe("meaning of life", function() {
  it("should be 42", function() {
    expect(whatIsTheMeaningOfLife()).toEqual(42);
  });
});
