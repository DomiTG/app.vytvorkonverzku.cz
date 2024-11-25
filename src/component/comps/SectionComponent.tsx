import React from "react";
import AbstractComponent from "../AbstractComponent";
import { createRandomId } from "@/utils/util";

export default class SectionComponent extends AbstractComponent {
  constructor(name?: string, desc?: string) {
    super(
      name ? name : "Section",
      desc ? desc : "Section component with max widths, responsive",
      "section",
    );
    this.setValue("section_id", "main");
    this.setValue("background_color", "#ffffff");
    this.setValue("small_size", "1OO%");
    this.setValue("medium_size", "300px");
    this.setValue("large_size", "500px");
    this.setValue("xl_size", "1000px");
    this.setValue("padding", "20px");
  }

  render(
    setSelectedComponent: (component: AbstractComponent) => void,
    selectedComponent?: AbstractComponent,
  ) {
    return (
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          backgroundColor: this.getValue("background_color") || "#fff",
          padding: this.getValue("padding") || "20px",
        }}
        id={this.getValue("section_id")}
      >
        <div
          style={{
            maxWidth: (() => {
              const smallSize = this.getValue("small_size") || "1024px"; // 'lg' = 1024px
              const mediumSize = this.getValue("medium_size") || "1280px"; // '2xl' = 1280px
              const largeSize = this.getValue("large_size") || "1536px"; // '4xl' = 1536px
              const xlSize = this.getValue("xl_size") || "1920px"; // '6xl' = 1920px
              if (window.matchMedia("(min-width: 1280px)").matches)
                return xlSize;
              if (window.matchMedia("(min-width: 1024px)").matches)
                return largeSize;
              if (window.matchMedia("(min-width: 768px)").matches)
                return mediumSize;
              return smallSize;
            })(),
            width: "100%",
            outline: selectedComponent === this ? "2px solid #000" : "none",
          }}
        >
          <button
            style={{ position: "absolute", top: 0, right: 0 }}
            onClick={() => setSelectedComponent(this)}
          >
            Select
          </button>
          {this.subComponents.map((component) =>
            component.render(setSelectedComponent, selectedComponent),
          )}
        </div>
      </section>
    );
  }

  clone(): AbstractComponent {
    return new SectionComponent(createRandomId(), createRandomId());
  }
}
