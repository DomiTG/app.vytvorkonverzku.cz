import IEditorComponent from "../classes/IEditorComponent";

export default class FlexRowComponent extends IEditorComponent {
  constructor() {
    super("flex row", "A flex row component", "flex-row");
  }

  render() {
    const subCompLength = this.subComponents.length;
    console.log(this);
    return (
      <div
        className={`w-full flex flex-row ${subCompLength === 0 && "p-2"} hover:border hover:border-gray-700`}
      >
        {this.subComponents.map((component) => component.render())}
        <button
          onClick={() => this.getModalMethod()(this)}
          className="px-2 py-1 bg-gray-200 rounded-md"
        >
          Add component
        </button>
      </div>
    );
  }

  clone() {
    return new FlexRowComponent();
  }
}
