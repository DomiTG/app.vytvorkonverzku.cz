import { CiTextAlignCenter } from "react-icons/ci";
import IEditorComponent from "../classes/IEditorComponent";
import FloatingAddCompComponent from "../FloatingAddCompComponent";

export default class FlexComponent extends IEditorComponent {
  constructor() {
    super(
      "Flex",
      "Flexbox v CSS usnadňuje rozložení prvků na stránce, umožňuje je snadno rozmístit do řady nebo sloupce a přizpůsobit velikosti obrazovky.",
      "flex",
      CiTextAlignCenter,
      [
        {
          id: "align",
          name: "Align",
          type: "SELECT",
          options: [
            { id: "stretch", name: "Stretch" },
            { id: "center", name: "Center" },
            { id: "start", name: "Start" },
            { id: "end", name: "End" },
          ],
          value: "start",
          visible: true,
        },
        {
          id: "justify",
          name: "Justify",
          type: "SELECT",
          options: [
            { id: "start", name: "Start" },
            { id: "center", name: "Center" },
            { id: "space-between", name: "Space between" },
            { id: "space-around", name: "Space around" },
            { id: "space-evenly", name: "Space evenly" },
          ],
          value: "start",
          visible: true,
        },
        {
          id: "direction",
          name: "Direction",
          type: "SELECT",
          options: [
            { id: "row", name: "Row" },
            { id: "row-reverse", name: "Row reverse" },
            { id: "column", name: "Column" },
            { id: "column-reverse", name: "Column reverse" },
          ],
          value: "row",
          visible: true,
        },
        {
          id: "gap",
          name: "Gap",
          type: "RANGE",
          value: 0,
          visible: true,
        },
        {
          id: "padding",
          name: "Padding",
          type: "RANGE",
          value: 0,
          visible: true,
        },
        {
          id: "backgroundColor",
          name: "Background Color",
          type: "COLOR",
          value: "transparent",
          visible: true,
        },
      ],
    );
  }

  render() {
    const subCompLength = this.subComponents.length;
    const padding = (this.getSetting("padding")?.value || 0) as number;
    return (
      <div
        className={`relative w-full flex  items-center hover:border border-gray-700 hover:p-4`}
        style={{
          justifyContent:
            (this.getSetting("justify")?.value as string) || "flex-start",
          alignItems:
            (this.getSetting("align")?.value as string) || "flex-start",
          flexDirection:
            (this.getSetting("direction")?.value as
              | "row"
              | "row-reverse"
              | "column"
              | "column-reverse") || "row",
          gap: (this.getSetting("gap")?.value as number) || 0,
          padding: `${subCompLength === 0 ? "10px 10px 10px 10px" : `${padding + 5}px ${padding + 5}px ${padding + 5}px ${padding + 5}px`}`,
          backgroundColor:
            (this.getSetting("backgroundColor")?.value as string) ||
            "transparent",
        }}
        onMouseEnter={() => this.getHoveredComponentMethod()(this)}
        onMouseLeave={() => this.getHoveredComponentMethod()(null)}
      >
        {this.getHoveredComponentState() === this && (
          <FloatingAddCompComponent comp={this} position="top_right" />
        )}
        {this.subComponents.map((component) => component.render())}
      </div>
    );
  }

  productionRender(): JSX.Element {
    const subCompLength = this.subComponents.length;
    const padding = (this.getSetting("padding")?.value || 0) as number;
    return (
      <div
        className={`relative w-full flex  items-center`}
        style={{
          justifyContent:
            (this.getSetting("justify")?.value as string) || "flex-start",
          alignItems:
            (this.getSetting("align")?.value as string) || "flex-start",
          flexDirection:
            (this.getSetting("direction")?.value as
              | "row"
              | "row-reverse"
              | "column"
              | "column-reverse") || "row",
          gap: (this.getSetting("gap")?.value as number) || 0,
          padding: `${subCompLength === 0 ? "10px 10px 10px 10px" : `${padding + 5}px ${padding + 5}px ${padding + 5}px ${padding + 5}px`}`,
          backgroundColor:
            (this.getSetting("backgroundColor")?.value as string) ||
            "transparent",
        }}
      >
        {this.subComponents.map((component) => component.productionRender())}
      </div>
    );
  }

  clone() {
    return new FlexComponent();
  }
}
