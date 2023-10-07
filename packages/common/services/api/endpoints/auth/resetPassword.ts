import { post } from "../../../axios";

/**
 *
 * @param email Email
 * @param password Password
 * @param type user type
 */
export default async function resetPassword(
  email: string,
  token: string,
  password: string
) {
  return post("/auth/resetPassword", { email, token, password });
}
