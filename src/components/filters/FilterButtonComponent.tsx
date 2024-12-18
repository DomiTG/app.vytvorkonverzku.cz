import IFilterType from "@/interfaces/IFilterType";
import { useState } from "react";

export default function FilterButtonComponent({
  filterTypes,
  setFilter,
  filter,
}: {
  filterTypes: IFilterType[];
  setFilter: (filter: IFilterType) => void;
  filter: IFilterType;
}) {
  const [modal, setModal] = useState<boolean>(false);

  return (
    <>
      {modal ? (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white w-96 p-4">
            <h2 className="text-lg font-semibold uppercase mb-2">
              Vyber filtr
            </h2>
            <div className="flex flex-col gap-2 max-h-96 overflow-y-auto">
              {filterTypes.map((type, i) => (
                <button
                  key={i}
                  className={`text-xs font-semibold bg-gray-100 text-gray-700 px-4 py-2 rounded-md uppercase hover:bg-gray-300  cursor-pointer ${
                    filter.name === type.name ? "bg-gray-200" : ""
                  }`}
                  onClick={() => {
                    setFilter(type);
                    setModal(false);
                  }}
                >
                  {type.byName}
                </button>
              ))}
            </div>
            <button
              className="text-xs font-semibold bg-gray-200 text-gray-700 px-4 py-2 rounded-md uppercase hover:bg-gray-300  cursor-pointer disabled:opacity-50 mt-2"
              onClick={() => setModal(false)}
            >
              Zavřít
            </button>
          </div>
        </div>
      ) : null}
      <button
        className="text-xs font-semibold bg-gray-200 text-gray-700 px-4 py-2 rounded-md uppercase hover:bg-gray-300  cursor-pointer disabled:opacity-50"
        onClick={() => setModal(true)}
      >
        Filtrovat média
      </button>
    </>
  );
}
