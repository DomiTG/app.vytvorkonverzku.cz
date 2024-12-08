import { CiTextAlignCenter } from "react-icons/ci";
import IEditorComponent from "../classes/IEditorComponent";
import FloatingAddCompComponent from "../FloatingAddCompComponent";

export default class FlexComponent extends IEditorComponent {
  constructor() {
    super("Flex", "A flex row component", "flex", CiTextAlignCenter, [
      {
        "id": "align",
        "name": "Align",
        "type": "SELECT",
        "options": [
          { id: "stretch", name: "Stretch" },
          { id: "center", name: "Center" },
          { id: "start", name: "Start" },
          { id: "end", name: "End" },

        ],
        "value": "start",
      },
      {
        "id": "justify",
        "name": "Justify",
        "type": "SELECT",
        "options": [
          { id: "start", name: "Start" },
          { id: "center", name: "Center" },
          { id: "space-between", name: "Space between" },
          { id: "space-around", name: "Space around" },
          { id: "space-evenly", name: "Space evenly" },
        ],
        "value": "start",
      },
      {
        "id": "direction",
        "name": "Direction",
        "type": "SELECT",
        "options": [
          { id: "row", name: "Row" },
          { id: "row-reverse", name: "Row reverse" },
          { id: "column", name: "Column" },
          { id: "column-reverse", name: "Column reverse" },
        ],
        "value": "row",
      },
      {
        "id": "gap",
        "name": "Gap",
        "type": "NUMBER",
        "value": 0,
      }
    ]);
  }

  render() {
    const subCompLength = this.subComponents.length;
    return (
      <div
        className={`relative w-full flex  items-center ${subCompLength === 0 && "p-4"} p-1 hover:border border-gray-700 hover:p-4`}
        style={{
          justifyContent: this.getSetting("justify")?.value as string || "flex-start",
          alignItems: this.getSetting("align")?.value as string || "flex-start",
          flexDirection: this.getSetting("direction")?.value as ("row" | "row-reverse" | "column" | "column-reverse") || "row",
          gap: this.getSetting("gap")?.value as number || 0,
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

  clone() {
    return new FlexComponent();
  }
}
