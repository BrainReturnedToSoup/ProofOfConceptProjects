export const cap = (str) => {
  if (typeof str !== "string" || str.length <= 0) {
    return "Cannot capitalize, arg is not a valid string";
  }

  const strArr = str.split(""),
    testForNonLetters = /[^a-zA-Z]/;

  if (testForNonLetters.test(strArr[0])) {
    return "Cannot capitalize, first character of string is not a valid letter";
  }

  strArr[0] = strArr[0].toUpperCase();
  return strArr.join("");
};

export function reverseString(str) {
  if (typeof str !== "string" || str.length <= 0) {
    return "Cannot reverse the supplied string, supplied arg is either not a string or empty";
  }

  return str.split("").reverse().join("");
}
