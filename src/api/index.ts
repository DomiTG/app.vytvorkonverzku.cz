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
  cdnUrl: string = "https://cdn.vytvorkonverzku.cz";

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
        url: `/api/${endpoint}`,
        method,
        data: body ? body : null,
        headers: {
          ...headers,
          authorization: `Bearer ${this.accessToken}`,
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
      endpoint: "/auth/refresh",
      method: "POST",
    });

    this.accessToken = data.accessToken;

    return data;
  }

  async logOut() {
    const data = await this.request({
      endpoint: "/auth/logout",
      method: "POST",
    });
    return data;
  }

  // Cdn Routes
  async uploadImage(file: File) {
    try {
      const formData = new FormData();
      formData.append("media", file);

      const { data } = await Axios({
        url: `${this.cdnUrl}/upload`,
        method: "POST",
        data: formData,
        headers: {
          authorization: `Bearer ${this.accessToken}`,
        },
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

  async getMedia() {
    try {
      const { data } = await Axios({
        url: `${this.cdnUrl}`,
        method: "GET",
        headers: {
          authorization: `Bearer ${this.accessToken}`,
        },
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
}
