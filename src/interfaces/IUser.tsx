import API from "@/api";

export default interface IUser {
  id: number;
  username: string;
  email_address: string;
  api: API;
  access_token: string;
}
