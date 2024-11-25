import React from "react";
import AbstractComponent from "../../AbstractComponent";

export default class FlexRowComponent extends AbstractComponent {
  constructor(name?: string, description?: string) {
    super(
      name || "Flex Row",
      description || "A flex row component",
      "flex-row",
    );
    this.setValue("gap", "0");
  }

  render(
    setSelectedComponent: (component: AbstractComponent) => void,
    selectedComponent?: AbstractComponent,
  ) {
    return (
      <div
        className={`w-full flex flex-row gap-${this.getValue("gap") || "0"}`}
      >
        <button
          onClick={() => setSelectedComponent(this)}
          className={`px-2 py-1 bg-gray-200 rounded-md ${selectedComponent === this ? "bg-gray-300" : ""}`}
        >
          Select
        </button>
        {this.subComponents.map((component) =>
          component.render(setSelectedComponent, selectedComponent),
        )}
      </div>
    );
  }

  clone() {
    return new FlexRowComponent();
  }
}
