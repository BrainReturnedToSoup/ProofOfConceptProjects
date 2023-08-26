import { cap, reverseString } from "./randomFuncs";

test("should capitalize the first letter of a valid string", () => {
  expect(cap("test")).toBe("Test");

  expect(cap("1string")).toBe(
    "Cannot capitalize, first character of string is not a valid letter"
  );

  expect(cap(12354)).toBe("Cannot capitalize, arg is not a valid string");

  expect(reverseString("test")).toBe("tset");
  expect(reverseString(12351)).toBe(
    "Cannot reverse the supplied string, supplied arg is either not a string or empty"
  );
  expect(reverseString("")).toBe(
    "Cannot reverse the supplied string, supplied arg is either not a string or empty"
  );
});
