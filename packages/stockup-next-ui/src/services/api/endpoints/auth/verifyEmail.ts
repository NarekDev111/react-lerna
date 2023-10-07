import { post } from "../../../axios";

/**
 * Verify email
 *
 * @param email Email
 */
export default async function verifyEmail(email: string) {
  return post(`/auth/verifyEmail`, {
    email,
  });
}
