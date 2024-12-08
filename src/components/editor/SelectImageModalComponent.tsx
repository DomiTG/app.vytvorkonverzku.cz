import { Dispatch, SetStateAction, useEffect } from "react";
import IEditorComponent from "./classes/IEditorComponent";
import RootComponent from "./components/RootComponent";
import IMediaAttachment from "@/interfaces/IMediaAttachment";
import Image from "next/image";

export default function SelectImageModalComponent({
  component,
  media,
  setModal,
  setting_name
}: {
  component: IEditorComponent;
  media: IMediaAttachment[];
  setModal: Dispatch<SetStateAction<{ component: IEditorComponent | null; setting_name: string; } | undefined>>
  setting_name: string;
}) {
  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModal(undefined);
      }
    };
    window.addEventListener("keydown", keyHandler);
    return () => {
      window.removeEventListener("keydown", keyHandler);
    };
  }, []);

  const setting = component.settings.find((settings) =>settings.id === setting_name)!;

  return (
    <div className="absolute inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[50] transition-opacity duration-300">
      <div className="bg-white w-4/5 md:w-1/3 rounded-lg shadow-lg transform transition-all scale-95 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 p-4">
          <h2 className="text-lg font-semibold text-gray-800 uppercase">
            Přidat komponentu - {component.name}
          </h2>
          <button
            onClick={() => setModal(undefined)}
            className="text-gray-500 hover:text-gray-800 focus:outline-none"
            aria-label="Close Modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center justify-center p-4 gap-4 max-h-[50vh] overflow-y-auto">
          {component && (
            <div className="flex flex-row items-center justify-center flex-wrap gap-4 w-full">
              {media.map((media, i) => (
                <button
                  key={i}
                  className="w-28 h-28 flex flex-col items-center justify-center border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  onClick={() => setting.value = media.url}
                >
                  <Image
                    src={media.url}
                    alt={media.name}
                    className="w-full h-full object-cover rounded-lg"
                    width={400}
                    height={200}
                />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
