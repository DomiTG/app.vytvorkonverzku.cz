import { useState } from "react";
import AbstractComponent from "@/component/AbstractComponent";
import availableComponents from "@/utils/availableComponents";
export default function Home() {
  const [flag, setFlag] = useState<boolean>(false);

  const [newComponentModal, setNewComponentModal] =
    useState<AbstractComponent | null>(null);

  const [canvasComponents, setCanvasComponents] = useState<AbstractComponent[]>(
    []
  );
  const [selectedComponent, setSelectedComponent] =
    useState<AbstractComponent | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const itemsPerPage = 5;

  return (
    <div className="flex flex-row min-h-screen">
      {newComponentModal && (
        <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-75 flex justify-center items-center p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-3xl relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setNewComponentModal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Modal Header */}
            <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-800 mb-6">
              Add New Component
            </h2>

            {/* Form Container */}
            <div className="space-y-6">
              {/* No Values Message */}
              {Object.keys(newComponentModal.values).length === 0 ? (
                <p className="text-center text-gray-500 italic">
                  No available values to modify.
                </p>
              ) : (
                <div className="divide-y divide-gray-200">
                  {Object.keys(newComponentModal.values)
                    .slice(
                      currentPage * itemsPerPage,
                      (currentPage + 1) * itemsPerPage
                    )
                    .map((key, i) => (
                      <div
                        key={i}
                        className="flex flex-col md:flex-row justify-between items-center gap-4 py-4"
                      >
                        <label
                          htmlFor={key}
                          className="text-sm md:text-lg font-medium text-gray-700 w-full md:w-1/3"
                        >
                          {key}
                        </label>
                        <input
                          type="text"
                          id={key}
                          className="w-full md:w-2/3 bg-gray-100 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          onChange={(e) => {
                            newComponentModal.setValue(key, e.target.value);
                            setFlag(!flag);
                          }}
                          value={newComponentModal.values[key]}
                        />
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Pagination */}
            {Object.keys(newComponentModal.values).length > itemsPerPage && (
              <div className="mt-6 flex justify-between items-center">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 0))
                  }
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  disabled={currentPage === 0}
                >
                  Previous
                </button>
                <p className="text-gray-600 text-sm md:text-base">
                  Page {currentPage + 1} of{" "}
                  {Math.ceil(
                    Object.keys(newComponentModal.values).length / itemsPerPage
                  )}
                </p>
                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(
                        prev + 1,
                        Math.ceil(
                          Object.keys(newComponentModal.values).length /
                            itemsPerPage
                        ) - 1
                      )
                    )
                  }
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  disabled={
                    currentPage ===
                    Math.ceil(
                      Object.keys(newComponentModal.values).length /
                        itemsPerPage
                    ) -
                      1
                  }
                >
                  Next
                </button>
              </div>
            )}

            {/* Modal Actions */}
            <div className="mt-8 flex flex-col md:flex-row justify-between gap-4">
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
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Add Component
              </button>
              <button
                onClick={() => setNewComponentModal(null)}
                className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
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
  components: AbstractComponent[]
) {
  return components.map((comp) => {
    return comp.render(
      setSelectedComponent,
      selectedComponent ? selectedComponent : undefined
    );
  });
}
