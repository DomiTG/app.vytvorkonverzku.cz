import { useState } from "react";
import AbstractComponent from "@/component/AbstractComponent";
import availableComponents from "@/utils/availableComponents";
export default function Home() {
  const [flag, setFlag] = useState<boolean>(false);

  const [newComponentModal, setNewComponentModal] =
    useState<AbstractComponent | null>(null);

  const [canvasComponents, setCanvasComponents] = useState<AbstractComponent[]>(
    [],
  );
  const [selectedComponent, setSelectedComponent] =
    useState<AbstractComponent | null>(null);

  return (
    <div className="flex flex-row min-h-screen">
      {newComponentModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-3xl font-semibold text-center mb-6">
              New Component
            </h2>
            <div className="space-y-4">
              {Object.keys(newComponentModal.values).length === 0 && (
                <p className="text-center text-zinc-500 py-2">
                  Nejsou žádné dostupné hodnoty k změně
                </p>
              )}
              {Object.keys(newComponentModal.values).map((key, i) => (
                <div key={i} className="flex justify-between items-center">
                  <label
                    htmlFor={key}
                    className="text-lg font-medium text-gray-700"
                  >
                    {key}
                  </label>
                  <input
                    type="text"
                    id={key}
                    className="w-full bg-gray-100 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onChange={(e) => {
                      newComponentModal.setValue(key, e.target.value);
                      setFlag(!flag);
                    }}
                    value={newComponentModal.values[key]}
                  />
                </div>
              ))}
              {/* add own stylr value */}
            </div>
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => {
                  if (selectedComponent) {
                    selectedComponent.addSubComponent(newComponentModal);
                  } else {
                    setCanvasComponents([
                      ...canvasComponents,
                      newComponentModal,
                    ]);
                  }
                  setNewComponentModal(null);
                }}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Add Component
              </button>
              <button
                onClick={() => setNewComponentModal(null)}
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="w-[300px] min-w-[300px] h-screen bg-gray-200 border-r border-gray-300 flex flex-col">
        <h2 className="text-2xl font-bold p-4">Components</h2>
        {availableComponents.map((category) => (
          <div key={category.category_name}>
            <h3 className="text-xl font-semibold p-2">
              {category.category_name}
            </h3>
            {category.components.map((comp) => (
              <button
                key={comp.name}
                className="bg-zinc-200 p-2 rounded-lg m-2"
                onClick={() => {
                  setNewComponentModal(comp.clone());
                }}
              >
                {comp.name}
              </button>
            ))}
          </div>
        ))}
        <h2 className="text-2xl font-bold p-4">Information</h2>
        <p className="text-zinc-500 text-md px-2">
          Active Comp:{" "}
          {selectedComponent ? selectedComponent.name : "Not selected"}
        </p>
        <button
          className="bg-zinc-200 p-2 rounded-lg m-2"
          onClick={() => {
            setSelectedComponent(null);
          }}
        >
          Deselect
        </button>
        <h2 className="text-2xl font-bold p-4">Saving</h2>
        <button
          className="bg-zinc-200 p-2 rounded-lg m-2"
          onClick={() => {
            console.log(JSON.stringify(canvasComponents));
          }}
        >
          Print code
        </button>
      </div>
      <div className="flex flex-col w-full h-full">
        {render(selectedComponent, setSelectedComponent, canvasComponents)}
      </div>
    </div>
  );
}

function render(
  selectedComponent: AbstractComponent | null,
  setSelectedComponent: (component: AbstractComponent) => void,
  components: AbstractComponent[],
) {
  return components.map((comp) => {
    return comp.render(
      setSelectedComponent,
      selectedComponent ? selectedComponent : undefined,
    );
  });
}
