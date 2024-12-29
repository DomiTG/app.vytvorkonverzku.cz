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

  async getConverses() {
    const data = await this.request({
      endpoint: "/conversions",
      method: "GET",
    });
    return data;
  }

  async getTemplates() {
    const data = await this.request({
      endpoint: "/templates",
      method: "GET",
    });
    return data;
  }

  //products
  async getProducts() {
    const data = await this.request({
      endpoint: "/products",
      method: "GET",
    });
    return data;
  }
  /*

  const schema = zod.object({
    name: zod.string().min(3).max(255),
    product_type: zod
      .string()
      .min(2)
      .refine((val) => {
        return ["product", "email"].includes(val);
      }),
    product_subtype: zod
      .string()
      .min(2)
      .refine((val) => {
        return ["physical", "digital"].includes(val);
      }),
    prices: zod.array(
      zod.object({
        currency: zod.string().min(3).max(3),
        price: zod.number().min(0),
      }),
    ),
    tax: zod.object({
      taxPayer: zod.boolean(),
      taxRate: zod.number().min(0),
      taxIncluded: zod.boolean(),
    }),
    digital: zod
      .object({
        html_content: zod.string().optional(),
        attachments: zod.array(zod.string()).optional(),
      })
      .optional(),
  });
  */
  async createProduct({
    name,
    product_type,
    product_subtype,
    prices,
    weight,
    tax,
    digital,
  }: {
    name: string;
    product_type: string;
    product_subtype: string;
    prices: { currency: string; price: number }[];
    weight?: number;
    tax: { taxPayer: boolean; taxRate: number; taxIncluded: boolean };
    digital: { html_content?: string; attachments?: string[] };
  }) {
    const data = await this.request({
      endpoint: "/products/createProduct",
      method: "POST",
      body: {
        name,
        product_type,
        product_subtype,
        prices,
        weight,
        tax,
        digital,
      },
    });
    return data;
  }

  //    const { name, description, template, thumbnail_url, converse_type } =
  async createTemplate({
    name,
    description,
    template,
    thumbnail_url,
    converse_type,
  }: {
    name: string;
    description: string;
    template: string;
    thumbnail_url: string;
    converse_type: string;
  }) {
    const data = await this.request({
      endpoint: "/templates/create",
      method: "POST",
      body: {
        name,
        description,
        template,
        thumbnail_url,
        converse_type,
      },
    });
    return data;
  }

  async checkDomain({ domain }: { domain: string }) {
    const data = await this.request({
      endpoint: `/conversions/checkDomain?domain=${domain}`,
      method: "GET",
    });
    return data;
  }

  /*
  const schema = zod.object({
    name: zod.string().min(3).max(50),
    type: zod.enum(["PRODUCT", "EMAIL"]),
    description: zod.string().optional(),
    domain_name: zod.string().min(3).max(50),
    product_id: zod.number(),
    template_id: zod.number(),
  });

  */
  async createConverse({
    name,
    type,
    description,
    domain_name,
    product_id,
    template_id,
  }: {
    name: string;
    type: string;
    description?: string;
    domain_name: string;
    product_id: number;
    template_id: number;
  }) {
    const data = await this.request({
      endpoint: "/conversions/create",
      method: "POST",
      body: {
        name,
        type,
        description,
        domain_name,
        product_id,
        template_id,
      },
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
