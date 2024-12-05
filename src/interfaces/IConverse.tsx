import IConverseDomain from "./IConverseDomain";

export default interface IConverse {
  id: number;
  name: string;
  description?: string;
  type: "PRODUCT" | "EMAIL";
  created_at: Date;
  updated_at: Date;
  live_mode: boolean;
  domains: IConverseDomain[];
}
