import IEditorComponent from "./classes/IEditorComponent";
import RootComponent from "./components/RootComponent";

export default function EditorModalComponent({
  rootComponent,
  component,
  setModal,
}: {
  rootComponent?: RootComponent;
  component: IEditorComponent;
  setModal: (comp: IEditorComponent | null) => void;
}) {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-1/2 flex flex-col justify-center items-center">
        <div className="flex justify-end w-full p-4">
          <button onClick={() => setModal(null)}>X</button>
        </div>
        {rootComponent &&
          rootComponent.availableComponents.map((comp, i) => (
            <button
              key={i}
              onClick={() => {
                const compp = comp.clone();
                compp.setRootComponent(rootComponent);
                component.addSubComponent(compp);
                setModal(null);
              }}
            >
              {comp.name}
            </button>
          ))}
      </div>
    </div>
  );
}
