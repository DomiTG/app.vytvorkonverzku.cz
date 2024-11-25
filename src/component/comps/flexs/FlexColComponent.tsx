import React from "react";
import AbstractComponent from "../../AbstractComponent";

export default class FlexColComponent extends AbstractComponent {
  constructor(name?: string, description?: string) {
    super(
      name || "Flex Col",
      description || "A flex col component",
      "flex-col",
    );
  }

  render(
    setSelectedComponent: (component: AbstractComponent) => void,
    selectedComponent?: AbstractComponent,
  ) {
    return (
      <div className={`w-full flex flex-col`}>
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
    return new FlexColComponent();
  }
}
