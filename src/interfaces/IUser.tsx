import API from "@/api";

export default interface IUser {
  id: number;
  username: string;
  api: API;
  access_token: string;
}
