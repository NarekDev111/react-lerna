import isInt from "validator/es/lib/isInt";

export default function isZipCode(input: string) {
  return isInt(input) && input.length === 5;
}
