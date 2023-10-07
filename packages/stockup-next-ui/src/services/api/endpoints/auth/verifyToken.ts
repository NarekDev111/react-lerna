import { post } from "../../../axios";

export default function verifyToken(email: string, token: string) {
  return post("/auth/verifyToken", { email, token });
}
