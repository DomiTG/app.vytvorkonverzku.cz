import React, { useState } from "react";
import { CiText } from "react-icons/ci";
import IEditorComponent from "../../classes/IEditorComponent";

export default class NavbarLinkComponent extends IEditorComponent {
  constructor() {
    super("Navbar Link", "navbar link", "navbar_link", CiText, [
      {
        id: "text",
        name: "Text",
        type: "TEXT",
        value: "Link",
      },
      {
        id: "link",
        name: "Link",
        type: "TEXT",
        value: "#",
      },
      {
        id: "text-color",
        name: "Text Color",
        type: "COLOR",
        value: "#000000",
      },
    ]);
  }

  render() {
    return (
      <a
        className="text-gray-800 text-lg font-medium hover:border hover:border-zinc-700"
        onMouseEnter={() => this.getHoveredComponentMethod()(this)}
        onMouseLeave={() => this.getHoveredComponentMethod()(null)}
        href={"#!"}
        onClick={(e) => {
          e.preventDefault();
          this.getSelectedComponentMethod()(this);
        }}
        style={{
          color: (this.getSetting("text-color")?.value as string) || "#000000",
        }}
      >
        {(this.getSetting("text")?.value as string) || "Link"}
      </a>
    );
  }

  clone() {
    return new NavbarLinkComponent();
  }
}
