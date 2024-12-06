import IMediaAttachment from "@/interfaces/IMediaAttachment";

export default interface SettingType {
  id: string;
  name: string;
  type:
    | "TEXT"
    | "NUMBER"
    | "BOOLEAN"
    | "SELECT"
    | "COLOR"
    | "IMAGE"
    | "VIDEO"
    | "UNKNOWN";
  value: string | number | boolean | IMediaAttachment | null;
}
