import React from "react";
import AbstractComponent from "../AbstractComponent";
import { createRandomId } from "@/utils/util";

export default class PaddingComponent extends AbstractComponent {
  constructor(name?: string, desc?: string) {
    super(
      name ? name : "Padding",
      desc ? desc : "Simple padding component",
      "padding",
    );
    this.setValue("padding", "10px");
  }

  render(
    setSelectedComponent: (component: AbstractComponent) => void,
    selectedComponent?: AbstractComponent,
  ) {
    return (
      <div
        style={{
          padding: this.getValue("padding") || "10px",
          border: selectedComponent === this ? "1px solid #000" : "none",
        }}
      >
        {this.subComponents.map((component) =>
          component.render(setSelectedComponent, selectedComponent),
        )}
        <button onClick={() => setSelectedComponent(this)}>
          Edit {this.name}
        </button>
      </div>
    );
  }

  clone(): AbstractComponent {
    return new PaddingComponent(createRandomId(), createRandomId());
  }
}
