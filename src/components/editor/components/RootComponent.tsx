import { FaCog, FaPlus, FaSquareRootAlt } from "react-icons/fa";
import IEditorComponent from "../classes/IEditorComponent";
import FloatingAddCompComponent from "../FloatingAddCompComponent";
import FlexRowComponent from "./FlexRowComponent";
import TextComponent from "./TextComponent";
import NavbarComponent from "./navbar/NavbarComponent";
import { GiSelect } from "react-icons/gi";

export default class RootComponent extends IEditorComponent {
  availableComponents: { category: string; components: IEditorComponent[] }[] =
    [
      {
        category: "Layout",
        components: [new FlexRowComponent(), new NavbarComponent()],
      },
      {
        category: "Text",
        components: [new TextComponent()],
      },
    ];

  constructor() {
    super("Root", "Root component", "root", FaSquareRootAlt);
  }

  init(
    updateMethod: (component: IEditorComponent) => void,
    setModal: (component: IEditorComponent) => void,
    setSelectedComponent: (component: IEditorComponent) => void,
    setHoveredComponent: (component: IEditorComponent | null) => void,
  ) {
    this.setRootComponent(this);
    this.updateMethod = updateMethod;
    this.setModal = setModal;
    this.setSelectedComponent = setSelectedComponent;
    this.setHoveredComponent = setHoveredComponent;
  }

  render() {
    return (
      <div
        className="relative w-full h-full flex flex-col hover:border hover:border-gray-500 hover:rounded-md"
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

  clone(): IEditorComponent {
    return new RootComponent();
  }

  getAllComponents(): IEditorComponent[] {
    return this.availableComponents
      .map((category) => category.components)
      .flat();
  }

  getComponentById(id: string): IEditorComponent | undefined {
    return this.getAllComponents().find((component) => component.id === id);
  }

  generateJson() {
    return {
      subComponents: this.subComponents.map((component) => component),
    };
  }
}
