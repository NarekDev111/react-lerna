import { post } from "../../../axios";

/**
 * Legacy login method
 *
 * @deprecated
 *
 * @param email Email
 * @param password Password
 */
export default async function login(
  email: string,
  password: string,
  type = "DealerBuyer"
) {
  return post("/auth/login", {
    user: {
      email,
      password,
      type,
    },
  });
}
