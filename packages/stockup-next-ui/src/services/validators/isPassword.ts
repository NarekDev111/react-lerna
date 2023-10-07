import { IValidationResult } from "../../components/SUInput";

export default function isPassword(input: string): IValidationResult | boolean {
  if (input.length < 5) {
    return {
      result: false,
      msg: "Password must be at least 5 characters long",
    };
  } return true;
}
