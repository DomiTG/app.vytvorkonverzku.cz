import Axios, { AxiosError, Method } from "axios";

export class APIError extends Error {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export default class API {
  accessToken?: string;

  async request({
    endpoint,
    method,
    body,
    headers,
  }: {
    endpoint: string;
    method: Method;
    body?: object;
    headers?: object;
  }) {
    try {
      const { data } = await Axios({
        url: `/${endpoint}`,
        method,
        data: body ? body : null,
        headers: {
          ...headers,
          "x-access-token": `Bearer ${this.accessToken}`,
        },
        withCredentials: true,
      });

      return data;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new APIError(
          err.response?.status || 500,
          err.response?.data.message || "An error occurred",
        );
      } else {
        throw new APIError(500, "An error occurred");
      }
    }
  }

  async refreshToken() {
    const data = await this.request({
      endpoint: "/auth/token",
      method: "POST",
    });

    this.accessToken = data.accessToken;

    return data;
  }

  async login(username: string, password: string) {
    const data = await this.request({
      endpoint: "/auth/login",
      method: "POST",
      body: {
        username,
        password,
      },
    });
    this.accessToken = data.accessToken;
    return data;
  }
}
