import { useEffect, useState } from "react";
import IEditorPage from "./interfaces/IEditorPage";
import IEditorComponent from "./classes/IEditorComponent";
import RootComponent from "./components/RootComponent";
import EditorModalComponent from "./EditorModalComponent";
import { FaTimes } from "react-icons/fa";
import IMediaAttachment from "@/interfaces/IMediaAttachment";
import { useUser } from "@/contexts/UserContext";
import SelectImageModalComponent from "./SelectImageModalComponent";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-jsx";

export default function EditorCanvas({
  selectedPage,
  productionSee = false,
  canvasMode = "DESKTOP",
}: {
  selectedPage: IEditorPage | null;
  productionSee: boolean;
  canvasMode: "MOBILE" | "DESKTOP" | "TABLET";
}) {
  const { user } = useUser();

  const [updateFlag, setUpdateFlag] = useState<boolean>(false);
  const [modal, setModal] = useState<IEditorComponent | null>(null);

  const [media, setMedia] = useState<IMediaAttachment[]>([]);
  const [mediaModal, setMediaModal] = useState<{
    component: IEditorComponent | null;
    setting_name: string;
    media_type: "IMAGE" | "VIDEO";
  }>();

  const [selectedComponent, setSelectedComponent] =
    useState<IEditorComponent | null>(null);
  const [hoveredComponent, setHoveredComponent] =
    useState<IEditorComponent | null>(null);

  const toggle = () => {
    setUpdateFlag(!updateFlag);
  };

  useEffect(() => {
    if (!selectedPage) return;
    const root = selectedPage?.root_component as RootComponent;
    root.setHoveredComponentState(hoveredComponent as IEditorComponent);
    toggle();
  }, [hoveredComponent]);

  useEffect(() => {
    if (!user) return;
    const fetchMedia = async () => {
      try {
        const media = await user.api.getMedia();
        setMedia(media.media);
        console.log("loaded media", media);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMedia();
  }, []);

  return !selectedPage ? (
    <p className="text-center">No pages</p>
  ) : (
    <>
      {modal && (
        <EditorModalComponent
          component={modal}
          setModal={setModal}
          rootComponent={selectedPage.root_component as RootComponent}
        />
      )}
      {mediaModal && selectedComponent && (
        <SelectImageModalComponent
          component={selectedComponent}
          media={media.filter((med) => med.type === mediaModal.media_type)}
          setModal={setMediaModal}
          setting_name={mediaModal.setting_name}
          media_type={mediaModal.media_type}
        />
      )}
      {selectedComponent && (
        <div className="p-6 flex flex-row justify-between items-center bg-neutral-800 w-full gap-8">
          <div className="flex flex-col max-w-[20%]">
            <h1 className="text-xl font-semibold text-neutral-100">
              {selectedComponent.name}
            </h1>
            <p
              className="text-neutral-300 text-xs truncate"
              title={selectedComponent.description}
            >
              {selectedComponent.description}
            </p>
          </div>
          <div className="flex flex-row gap-8 overflow-x-auto h-full text-neutral-100">
            {selectedComponent.settings
              .filter((set) => set.visible)
              .map((setting, i) => (
                <div className="flex flex-col h-full p-2 flex-shrink-0" key={i}>
                  <label className="text-neutral-100 text-xs font-semibold uppercase">
                    {setting.name}
                  </label>
                  {setting.type === "TEXT" && (
                    <input
                      type="text"
                      className="w-full mt-1 p-2 text-xs bg-neutral-700 text-neutral-300 rounded-md min-w-16"
                      value={setting.value as string}
                      onChange={(e) => {
                        setting.value = e.target.value;
                        toggle();
                      }}
                    />
                  )}
                  {setting.type === "TEXTAREA" && (
                    <textarea
                      className="w-full mt-1 p-2 text-xs bg-neutral-700 text-neutral-300 rounded-md min-w-16"
                      value={setting.value as string}
                      onChange={(e) => {
                        setting.value = e.target.value;
                        toggle();
                      }}
                    />
                  )}
                  {setting.type === "BOOLEAN" && (
                    <input
                      type="checkbox"
                      className="w-full mt-1 p-2 text-xs bg-neutral-700 text-neutral-300 rounded-md min-w-16"
                      checked={setting.value as boolean}
                      onChange={(e) => {
                        setting.value = e.target.checked;
                        toggle();
                      }}
                    />
                  )}
                  {setting.type === "SELECT" && (
                    <select
                      className="w-full mt-1 p-2 text-xs bg-neutral-700 text-neutral-300 rounded-md"
                      value={setting.value as string}
                      onChange={(e) => {
                        setting.value = e.target.value;
                        toggle();
                      }}
                    >
                      {setting.options &&
                        setting.options.map((option, i) => (
                          <option key={i} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                    </select>
                  )}
                  {setting.type === "RANGE" && (
                    <input
                      type="range"
                      className="w-full mt-1 p-2 text-xs bg-neutral-700 text-neutral-300 rounded-md"
                      value={setting.value as number}
                      min={setting.rangeMin || 0}
                      max={setting.rangeMax || 100}
                      onChange={(e) => {
                        setting.value = Number(e.target.value);
                        toggle();
                      }}
                    />
                  )}
                  {setting.type === "NUMBER" && (
                    <input
                      type="number"
                      className="w-full mt-1 p-2 text-xs bg-neutral-700 text-neutral-300 rounded-md"
                      value={setting.value as number}
                      onChange={(e) => {
                        setting.value = Number(e.target.value);
                        toggle();
                      }}
                    />
                  )}
                  {setting.type === "COLOR" && (
                    <input
                      type="color"
                      className="w-full mt-1 text-xs bg-neutral-700 text-neutral-300 rounded-md h-full p-1"
                      value={setting.value as string}
                      onChange={(e) => {
                        setting.value = e.target.value;
                        toggle();
                      }}
                    />
                  )}
                  {setting.type === "CODE" && (
                    <Editor
                      placeholder="Some HTML code here"
                      value={setting.value as string}
                      onValueChange={(code: string) => {
                        setting.value = code;
                        toggle();
                      }}
                      highlight={(code) =>
                        highlight(code, languages.jsx!, `jsx`)
                      }
                      padding={10}
                      className="bg-neutral-300"
                    />
                  )}
                  {setting.type === "IMAGE" && (
                    <button
                      className="w-full mt-1 p-2 text-xs bg-neutral-700 text-neutral-300 rounded-md"
                      onClick={() =>
                        setMediaModal({
                          component: selectedComponent,
                          setting_name: setting.id,
                          media_type: "IMAGE",
                        })
                      }
                    >
                      Select IMAGE
                    </button>
                  )}
                  {setting.type === "VIDEO" && (
                    <button
                      className="w-full mt-1 p-2 text-xs bg-neutral-700 text-neutral-300 rounded-md"
                      onClick={() =>
                        setMediaModal({
                          component: selectedComponent,
                          setting_name: setting.id,
                          media_type: "VIDEO",
                        })
                      }
                    >
                      Select VIDEO
                    </button>
                  )}
                </div>
              ))}
          </div>
          <button
            onClick={() => setSelectedComponent(null)}
            className="text-neutral-100"
          >
            <FaTimes />
          </button>
        </div>
      )}
      <div className="flex flex-row bg-white">
        {canvasMode === "DESKTOP" &&
          render(
            selectedPage,
            toggle,
            setModal,
            setSelectedComponent,
            setHoveredComponent,
            productionSee,
          )}
        {canvasMode === "MOBILE" && (
          <div className="flex justify-center items-center w-full h-full">
            <div
              className="relative border border-gray-500 rounded-lg shadow-lg"
              style={{
                width: "390px", // Outer device dimensions (slightly larger than the canvas for padding)
                height: "844px", // Include the device bezel area
                backgroundColor: "#ffffff",
                overflow: "hidden", // Ensures nothing spills outside the "screen"
              }}
            >
              <canvas
                width="375"
                height="812"
                className="absolute inset-0"
                style={{
                  margin: "auto",
                  display: "block",
                  borderRadius: "20px", // Optional: rounded screen corners
                }}
              />
              {render(
                selectedPage,
                toggle,
                setModal,
                setSelectedComponent,
                setHoveredComponent,
                productionSee,
              )}
            </div>
          </div>
        )}
        {canvasMode === "TABLET" && (
          <div className="flex justify-center items-center w-full">
            <div
              className="relative border border-gray-500 rounded-lg shadow-lg"
              style={{
                width: "820px", // Outer device dimensions (slightly larger than the canvas for padding)
                height: "1180px", // Include the device bezel area
                backgroundColor: "#ffffff",
                overflow: "hidden", // Ensures nothing spills outside the "screen"
              }}
            >
              <canvas
                width="768"
                height="1024"
                className="absolute inset-0"
                style={{
                  margin: "auto",
                  display: "block",
                  borderRadius: "20px", // Optional: rounded screen corners
                }}
              />
              {render(
                selectedPage,
                toggle,
                setModal,
                setSelectedComponent,
                setHoveredComponent,
                productionSee,
              )}
            </div>
          </div>
        )}

        {/* sidebar */}
        {/*selectedComponent && (
          <div className="relative w-[250px] bg-neutral-800 h-full resize">
            <div className="p-4 border-b border-neutral-700 flex flex-row justify-between items-center">
              <h1 className="text-xl font-semibold text-neutral-100">
                Settings
              </h1>
              <button
                onClick={() => setSelectedComponent(null)}
                className="text-neutral-100"
              >
                <FaTimes />
              </button>
            </div>
            <div className="p-4">
              <h1 className="text-xl font-semibold text-neutral-100">
                {selectedComponent.name}
              </h1>
              <p className="text-neutral-300">
                {selectedComponent.description}
              </p>
              {selectedComponent.settings
                .filter((set) => set.visible)
                .map((setting, i) => (
                  <div key={i} className="mt-4 flex flex-col">
                    <label className="text-neutral-100">{setting.name}</label>
                    {setting.type === "TEXT" && (
                      <input
                        type="text"
                        className="w-full mt-1 p-2 bg-neutral-700 text-neutral-100"
                        value={setting.value as string}
                        onChange={(e) => {
                          setting.value = e.target.value;
                          toggle();
                        }}
                      />
                    )}
                    {setting.type === "TEXTAREA" && (
                      <textarea
                        className="w-full mt-1 p-2 bg-neutral-700 text-neutral-100"
                        value={setting.value as string}
                        onChange={(e) => {
                          setting.value = e.target.value;
                          toggle();
                        }}
                      />
                    )}
                    {setting.type === "BOOLEAN" && (
                      <input
                        type="checkbox"
                        className="mt-1 p-2 bg-neutral-700 text-neutral-100"
                        checked={setting.value as boolean}
                        onChange={(e) => {
                          setting.value = e.target.checked;
                          toggle();
                        }}
                      />
                    )}
                    {setting.type === "SELECT" && (
                      <select
                        className="mt-1 p-2 bg-neutral-700 text-neutral-100 rounded-md"
                        value={setting.value as string}
                        onChange={(e) => {
                          setting.value = e.target.value;
                          toggle();
                        }}
                      >
                        {setting.options &&
                          setting.options.map((option, i) => (
                            <option key={i} value={option.id}>
                              {option.name}
                            </option>
                          ))}
                      </select>
                    )}
                    {setting.type === "RANGE" && (
                      <input
                        type="range"
                        className="w-full mt-1 p-2 bg-neutral-700 text-neutral-100"
                        value={setting.value as number}
                        min={setting.rangeMin || 0}
                        max={setting.rangeMax || 100}
                        onChange={(e) => {
                          setting.value = Number(e.target.value);
                          toggle();
                        }}
                      />
                    )}
                    {setting.type === "NUMBER" && (
                      <input
                        type="number"
                        className="w-full mt-1 p-2 bg-neutral-700 text-neutral-100"
                        value={setting.value as number}
                        onChange={(e) => {
                          setting.value = Number(e.target.value);
                          toggle();
                        }}
                      />
                    )}
                    {setting.type === "COLOR" && (
                      <input
                        type="color"
                        className="mt-1 bg-neutral-700 text-neutral-100 w-full"
                        value={setting.value as string}
                        onChange={(e) => {
                          setting.value = e.target.value;
                          toggle();
                        }}
                      />
                    )}
                    {setting.type === "CODE" && (
                      <Editor
                        placeholder="Some HTML code here"
                        value={setting.value as string}
                        onValueChange={(code: string) => {
                          setting.value = code;
                          toggle();
                        }}
                        highlight={(code) =>
                          highlight(code, languages.jsx!, `jsx`)
                        }
                        padding={10}
                        className="bg-neutral-300"
                      />
                    )}
                    {setting.type === "IMAGE" && (
                      <button
                        className="p-2 bg-neutral-700 text-neutral-100 font-semibold"
                        onClick={() =>
                          setMediaModal({
                            component: selectedComponent,
                            setting_name: setting.id,
                            media_type: "IMAGE",
                          })
                        }
                      >
                        Select IMAGE
                      </button>
                    )}
                    {setting.type === "VIDEO" && (
                      <button
                        className="p-2 bg-neutral-700 text-neutral-100 font-semibold"
                        onClick={() =>
                          setMediaModal({
                            component: selectedComponent,
                            setting_name: setting.id,
                            media_type: "VIDEO",
                          })
                        }
                      >
                        Select VIDEO
                      </button>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )*/}
      </div>
    </>
  );
}

const render = (
  page: IEditorPage,
  updateMethod: () => void,
  setModal: (component: IEditorComponent) => void,
  setSelectedComponent: (component: IEditorComponent) => void,
  setHoveredComponent: (component: IEditorComponent | null) => void,
  productionSee: boolean,
) => {
  let rootComponent = page.root_component as RootComponent;
  if (!rootComponent) {
    const rootComp = new RootComponent();
    rootComp.init(
      updateMethod,
      setModal,
      setSelectedComponent,
      setHoveredComponent,
    );
    page.root_component = rootComp;
    rootComponent = rootComp;
  } else {
    if (!rootComponent.updateMethod) {
      rootComponent.init(
        updateMethod,
        setModal,
        setSelectedComponent,
        setHoveredComponent,
      );
    }
  }
  const renderComponent = (component: IEditorComponent) => {
    return productionSee ? component.productionRender() : component.render();
  };
  return renderComponent(rootComponent);
};
