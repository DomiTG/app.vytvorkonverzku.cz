import { CiTextAlignCenter } from "react-icons/ci";
import IEditorComponent from "../classes/IEditorComponent";
import FloatingAddCompComponent from "../FloatingAddCompComponent";

export default class FlexRowComponent extends IEditorComponent {
  constructor() {
    super("flex row", "A flex row component", "flex-row", CiTextAlignCenter);
  }

  render() {
    const subCompLength = this.subComponents.length;
    return (
      <div
        className={`w-full flex flex-row justify-between items-center ${subCompLength === 0 && "p-2"} hover:border hover:border-gray-700`}
        onMouseEnter={() => this.getHoveredComponentMethod()(this)}
        onMouseLeave={() => this.getHoveredComponentMethod()(null)}
      >
        {this.hoveredComponent === this && (
          <FloatingAddCompComponent comp={this} />
        )}
        {this.subComponents.map((component) => component.render())}
      </div>
    );
  }

  clone() {
    return new FlexRowComponent();
  }
}
