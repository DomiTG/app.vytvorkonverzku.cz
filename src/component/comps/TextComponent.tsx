import React from "react";
import AbstractComponent from "../AbstractComponent";
import { createRandomId } from "@/utils/util";

export default class TextComponent extends AbstractComponent {
  editing: boolean = false;
  text: string;

  constructor(text: string, name?: string, desc?: string) {
    super(
      name ? name : "Text",
      desc ? desc : "A simple text component",
      "text",
    );
    this.text = text;
  }

  render(
    setSelectedComponent: (component: AbstractComponent) => void,
    selectedComponent?: AbstractComponent,
  ) {
    return this.editing ? (
      <input
        type="text"
        className="border-2 border-gray-300"
        value={this.text}
        onChange={(e) => {
          this.text = e.target.value;
        }}
        onBlur={() => {
          this.editing = false;
        }}
      />
    ) : (
      <p
        onClick={() => {
          this.editing = true;
          setSelectedComponent(this);
        }}
      >
        {this.text}
      </p>
    );
  }

  clone(): AbstractComponent {
    return new TextComponent(this.text, createRandomId(), createRandomId());
  }
}
