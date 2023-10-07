import { post } from "../../../axios";

/**
 * Request Password Reset Token
 *
 * @param email
 */
export default async function resetToken(email: string) {
  return post("/auth/resetToken", { email });
}
