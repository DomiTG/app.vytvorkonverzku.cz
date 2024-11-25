import AbstractComponent from "../../AbstractComponent";
import { createRandomId } from "@/utils/util";

export default class ParagraphComponent extends AbstractComponent {
  constructor(name?: string, desc?: string) {
    super(
      name ? name : "Paragraph",
      desc ? desc : "Paragraph component (<p></p>)",
      "paragraph",
    );
    this.setValue("text", "Hello World");
    this.setValue("font-size", "24px");
    this.setValue("color", "#000000");
    this.setValue("tracking", "0px");
    this.setValue("font-weight", "200");
    this.setValue("centered-text", "false");
  }

  render(
    setSelectedComponent: (component: AbstractComponent) => void,
    selectedComponent?: AbstractComponent,
  ) {
    return (
      <p
        style={{
          fontSize: this.getValue("font-size") || "10px",
          color: this.getValue("color") || "#000000",
          letterSpacing: this.getValue("tracking") || "0px",
          fontWeight: this.getValue("font-weight") || "200",
          textAlign:
            this.getValue("centered-text") === "true" ? "center" : "left",
        }}
        onClick={() => setSelectedComponent(this)}
      >
        {this.getValue("text")}
      </p>
    );
  }

  clone(): AbstractComponent {
    return new ParagraphComponent(createRandomId(), createRandomId());
  }
}
