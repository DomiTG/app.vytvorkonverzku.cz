export default interface ITemplate {
  id: number;
  name: string;
  description: string;
  created_at: Date;
  template?: string;
  thumbnail_url: string;
  converse_type: "PRODUCT" | "EMAIL";
  creator: {
    username: string;
  };
}
