import { FaCog, FaPlus } from "react-icons/fa";
import IEditorComponent from "./classes/IEditorComponent";

export default function FloatingAddCompComponent({
  comp,
}: {
  comp: IEditorComponent;
}) {
  {
    /* tailwind, "add component" button */
  }
  return (
    <div className="flex flex-row absolute top-0 right-0">
      <button
        className="bg-zinc-200 text-zinc-500 w-6 h-6 flex items-center justify-center hover:bg-zinc-300 focus:outline-none rounded-tl-md rounded-bl-md"
        aria-label="Add Component"
        onClick={() => comp.getModalMethod()(comp)}
      >
        <FaPlus />
      </button>
      <button
        className="bg-zinc-200 text-zinc-500 w-6 h-6 flex items-center justify-center hover:bg-zinc-300 focus:outline-none rounded-tr-md rounded-br-md"
        aria-label="Add Component"
        onClick={() => comp.getSelectedComponentMethod()(comp)}
      >
        <FaCog />
      </button>
    </div>
  );
}
