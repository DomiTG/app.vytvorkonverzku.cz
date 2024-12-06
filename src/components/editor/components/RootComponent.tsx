import { FaCog, FaPlus, FaSquareRootAlt } from "react-icons/fa";
import IEditorComponent from "../classes/IEditorComponent";
import FloatingAddCompComponent from "../FloatingAddCompComponent";
import FlexRowComponent from "./FlexRowComponent";
import TextComponent from "./TextComponent";
import NavbarComponent from "./navbar/NavbarComponent";
import { GiSelect } from "react-icons/gi";
import NavbarLinkComponent from "./navbar/NavbarLinkComponent";
import ImageElement from "../elements/ImageElement";

export default class RootComponent extends IEditorComponent {
  availableComponents: { category: string; components: IEditorComponent[] }[] =
    [
      {
        category: "Layout",
        components: [new FlexRowComponent()],
      },
      {
        category: "Elements",
        components: [new TextComponent(), new ImageElement()],
      },
      {
        category: "Navbar",
        components: [new NavbarComponent(), new NavbarLinkComponent()]
      }
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
    console.log(this);
    return (
      <div
        className="relative w-full h-full flex flex-col hover:border hover:border-gray-500"
        onMouseEnter={() => this.getHoveredComponentMethod()(this)}
        onMouseLeave={() => this.getHoveredComponentMethod()(null)}
      >
        {this.subComponents.map((component) => component.render())}
        <div className="w-full flex flex-col justify-center items-center p-4">
          <div className="w-24 h-24 bg-gray-200 flex items-center justify-center text-zinc-500 text-2xl rounded-lg cursor-pointer hover:bg-gray-300" onClick={() => this.getModalMethod()(this)}>
            <FaPlus />
          </div>
        </div>
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
