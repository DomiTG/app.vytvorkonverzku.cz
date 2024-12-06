import { CiImageOn, CiTextAlignCenter } from "react-icons/ci";
import IEditorComponent from "../classes/IEditorComponent";
import FloatingAddCompComponent from "../FloatingAddCompComponent";
import IMediaAttachment from "@/interfaces/IMediaAttachment";

export default class ImageElement extends IEditorComponent {
  constructor() {
    super("Image", "an image element", "image", CiImageOn, [
      {
        id: "image",
        name: "Select Image",
        type: "IMAGE",
        value: null,
      },
    ]);
  }

  render() {
    const src = this.getSetting("image")?.value as IMediaAttachment | null;
    return (
      <img
        src={src?.url ? src.url : "https://placehold.co/600x400"}
        alt="Image"
      />
    );
  }

  clone() {
    return new ImageElement();
  }
}
