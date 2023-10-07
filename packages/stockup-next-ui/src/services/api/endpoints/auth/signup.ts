import { post } from "../../../axios";

interface ISignUpInput {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
  dealership: {
    name: string;
    address: {
      state: string;
      city: string;
      zip: string;
      street: string;
    };
    website: string;
  };
}

export default async function signup(data: ISignUpInput) {
  return post("/auth/signup", data);
}
