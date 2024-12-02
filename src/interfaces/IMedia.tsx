export default interface IMedia {
  stats: {
    available: number;
    max: number;
    used: number;
  };
  media: {
    id: number;
    name: string;
    type: "IMAGE" | "VIDEO" | "UNKNOWN";
    url: string;
    created_at: Date;
  }[];
}
