import AbstractComponent from "../../AbstractComponent";
import { createRandomId } from "@/utils/util";

export default class H1Component extends AbstractComponent {
  constructor(name?: string, desc?: string) {
    super(name ? name : "H1", desc ? desc : "Heading 1 component", "h1");
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
      <h1
        style={{
          fontSize: this.getValue("font-size") || "20px",
          color: this.getValue("color") || "#000000",
          letterSpacing: this.getValue("tracking") || "0px",
          fontWeight: this.getValue("font-weight") || "200",
          textAlign:
            this.getValue("centered-text") === "true" ? "center" : "left",
        }}
        onClick={() => setSelectedComponent(this)}
      >
        {this.getValue("text")}
      </h1>
    );
  }

  clone(): AbstractComponent {
    return new H1Component(createRandomId(), createRandomId());
  }
}
