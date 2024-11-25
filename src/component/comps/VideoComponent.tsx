import AbstractComponent from "../AbstractComponent";
import { createRandomId } from "@/utils/util";

export default class VideoComponent extends AbstractComponent {
  constructor(name?: string, desc?: string) {
    super(
      name ? name : "Video Element",
      desc ? desc : "Youtube Video",
      "video",
    );
    this.setValue("url", "https://www.youtube.com/watch?v=6n3pFFPSlW4");
    this.setValue("width", "100%");
    this.setValue("height", "100%");
  }

  render(
    setSelectedComponent: (component: AbstractComponent) => void,
    selectedComponent?: AbstractComponent,
  ) {
    return (
      <iframe
        style={{
          width: this.getValue("width"),
          height: this.getValue("height"),
        }}
        src={this.getValue("url")}
        frameBorder="0"
      />
    );
  }

  clone(): AbstractComponent {
    return new VideoComponent(createRandomId(), createRandomId());
  }
}
