import IEditorComponent from "../classes/IEditorComponent";
import FlexRowComponent from "./FlexRowComponent";
import TextComponent from "./TextComponent";

export default class RootComponent extends IEditorComponent {
  availableComponents: IEditorComponent[] = [
    new TextComponent(),
    new FlexRowComponent(),
  ];

  constructor() {
    super("Root", "Root component", "root");
  }

  init(
    updateMethod: (component: IEditorComponent) => void,
    setModal: (component: IEditorComponent) => void,
  ) {
    this.setRootComponent(this);
    this.updateMethod = updateMethod;
    this.setModal = setModal;
    console.log("Root component initialized");
  }

  render() {
    return (
      <div className="w-full h-full flex flex-col hover:border hover:border-gray-500 hover:rounded-md">
        {this.subComponents.map((component) => component.render())}
        <button
          className="px-2 py-1 bg-gray-200 rounded-md"
          onClick={() => this.setModal(this)}
        >
          Add comp
        </button>
      </div>
    );
  }

  clone(): IEditorComponent {
    return new RootComponent();
  }

  generateJson() {
    return {
      subComponents: this.subComponents.map((component) => component),
    };
  }
}
