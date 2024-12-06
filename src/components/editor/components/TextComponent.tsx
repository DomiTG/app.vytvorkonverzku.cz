import React, { useState } from "react";
import IEditorComponent from "../classes/IEditorComponent";
import { CiText } from "react-icons/ci";

export default class TextComponent extends IEditorComponent {
  constructor() {
    super("text", "text", "text", CiText, [
      {
        "id": "text",
        "name": "Text",
        "type": "TEXT",
        "value": "Text",
      },
    ])
  }

  render() {
    return (
      <p className="text-gray-800 text-lg font-medium hover:border hover:border-zinc-700" onMouseEnter={() => this.getHoveredComponentMethod()(this)} onMouseLeave={() => this.getHoveredComponentMethod()(null)} onClick={(e) => {
        e.preventDefault();
        this.getSelectedComponentMethod()(this);
      } }>
        {this.getSetting("text")?.value as string || "Text"}
      </p>
    )
  }

  clone() {
    return new TextComponent();
  }
}