import { FaPlus } from "react-icons/fa";
import IEditorPage from "../editor/interfaces/IEditorPage";
import { useState } from "react";

export default function PageAddButtonComponent({
  pages,
  setPages,
  setSelectedPage,
}: {
  pages: IEditorPage[];
  setPages: (pages: IEditorPage[]) => void;
  setSelectedPage: (page: IEditorPage) => void;
}) {
  const [modal, setModal] = useState<boolean>(false);

  const [pageName, setPageName] = useState<string>("");
  const [pageType, setPageType] = useState<"CONVERSE_PAGE" | "BASKET">(
    "CONVERSE_PAGE"
  );
  const [url, setUrl] = useState<string>("");
  const [urlPlaceholder, setUrlPlaceholder] = useState<string>("");
  const [error, setError] = useState<string>("");

  return (
    <>
      {modal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[999] flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg w-96 relative ">
            <button
              onClick={() => setModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full"
              aria-label="Close modal"
            >
              ✕
            </button>
            <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-2 uppercase tracking-wider">
              New Page
            </h2>
            <div className="flex flex-col mt-4">
              {error && (
                <div className="bg-red-100 border-l-4 border-red-400 text-red-700 px-2 py-2 mb-4 text-xs">
                  {error}
                </div>
              )}
              <label className="text-sm font-semibold" htmlFor="page_name">
                Name
              </label>
              <input
                type="text"
                className="bg-gray-100 rounded-md p-2 text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                value={pageName}
                onChange={(e) => {
                  setPageName(e.target.value);
                  if (!url) {
                    setUrlPlaceholder(
                      e.target.value.toLowerCase().replace(/ /g, "-")
                    );
                  }
                }}
              />
              <label className="text-sm font-semibold" htmlFor="page_type">
                Type
              </label>
              <select
                className="bg-gray-100 rounded-md p-2 text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                value={pageType}
                onChange={(e) =>
                  setPageType(e.target.value as "CONVERSE_PAGE" | "BASKET")
                }
              >
                <option value="CONVERSE_PAGE">Konverzka</option>
                <option value="BASKET">Košík</option>
              </select>
              <label className="text-sm font-semibold" htmlFor="url">
                URL
              </label>
              <input
                type="text"
                className="bg-gray-100 rounded-md p-2 text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                placeholder={urlPlaceholder ? urlPlaceholder : "URL"}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <button
                className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer uppercase text-xs font-semibold"
                onClick={() => {
                  setError("");
                  if (!pageName) {
                    setError("Name is required");
                    return;
                  }
                  if (!url && !urlPlaceholder) {
                    setError("URL is required");
                    return;
                  }
                  const newPage: IEditorPage = {
                    name: pageName,
                    page_type: pageType,
                    root_component: null,
                    url: url ? url : pageName.toLowerCase().replace(/ /g, "-"),
                  };
                  setPages([...pages, newPage]);
                  setSelectedPage(newPage);
                  setModal(false);
                }}
              >
                Vytořit
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        className="w-32 h-32 bg-gray-200 text-zinc-500 p-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer uppercase text-xs font-semibold flex justify-center items-center"
        onClick={() => setModal(true)}
      >
        <FaPlus className="text-lg" />
      </button>
    </>
  );
}
