import { useState } from "react";
import IEditorPage from "../editor/interfaces/IEditorPage";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function PageButtonComponent({ page, setActivePage, activePage }: { page: IEditorPage, setActivePage: (page: IEditorPage) => void, activePage: IEditorPage | null }) {
  const [shownMenu, setShownMenu] = useState<boolean>(false);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setActivePage(page);
  };

  const onContextMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShownMenu(true);
  }

  return (
    <div className="relative">
      <button
        key={page.name}
        className={`w-32 h-32 bg-gray-200 text-zinc-500 p-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer uppercase text-xs font-semibold ${activePage === page ? "bg-gray-300" : ""}`}
        onClick={onClick}
        onContextMenu={onContextMenu}
        onBlur={() => setShownMenu(false)}
      >
        {page.name}
      </button>
      {shownMenu && (
        <div className="absolute bg-gray-200 p-2 rounded-lg border border-zinc-300 z-[999] mt-2 w-full">
          <button className="w-full bg-gray-200 text-zinc-500 p-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer uppercase text-xs font-semibold flex flex-row justify-center items-center">
            <FaEdit className="mr-2" /> Edit
          </button>
          <button className="w-full bg-gray-200 text-zinc-500 p-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer uppercase text-xs font-semibold flex flex-row justify-center items-center">
            <FaTrash className="mr-2" /> Delete
          </button>
        </div>
      )}
    </div>
  );
}
