import { getGreeting } from "./greeting";

it("should say hello", () => {
  expect(getGreeting()).toEqual("hello mr alan 2");
});
