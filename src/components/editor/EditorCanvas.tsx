import { useEffect, useState } from "react";
import IEditorPage from "./interfaces/IEditorPage";
import IEditorComponent from "./classes/IEditorComponent";
import RootComponent from "./components/RootComponent";
import EditorModalComponent from "./EditorModalComponent";
import { FaTimes } from "react-icons/fa";
import IMediaAttachment from "@/interfaces/IMediaAttachment";
import { useUser } from "@/contexts/UserContext";
import SelectImageModalComponent from "./SelectImageModalComponent";

export default function EditorCanvas({
  initialPages,
}: {
  initialPages: IEditorPage[];
}) {

  const { user } = useUser();
  
  const [pages, setPages] = useState<IEditorPage[]>(initialPages);
  const [selectedPage, setSelectedPage] = useState<IEditorPage | null>(
    initialPages[0],
  );
  const [updateFlag, setUpdateFlag] = useState<boolean>(false);
  const [modal, setModal] = useState<IEditorComponent | null>(null);

  const [media, setMedia] = useState<IMediaAttachment[]>([]);
  const [mediaModal, setMediaModal] = useState<{ component: IEditorComponent | null; setting_name: string }>();

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
    if(!user) return;
    const fetchMedia = async () => {
      try {
        const media = await user.api.getMedia();
        setMedia(media.media);
        console.log("loaded media", media)
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
          media={media.filter((med) => med.type === "IMAGE")}
          setModal={setMediaModal}
          setting_name={mediaModal.setting_name}
        />
      )}
      <div className="flex flex-row h-full">
      {render(
        selectedPage,
        toggle,
        setModal,
        setSelectedComponent,
        setHoveredComponent,
      )}
      {/* sidebar */}
      {selectedComponent && (
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
            <p className="text-neutral-300">{selectedComponent.description}</p>
            {selectedComponent.settings.map((setting, i) => (
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
                    {setting.options && setting.options.map((option, i) => (
                      <option key={i} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
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
                {setting.type === "VIDEO" && (
                  <input
                    type="file"
                    accept="video/*"
                    className="mt-1 p-2 bg-neutral-700 text-neutral-100"
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
                {setting.type === "IMAGE" && (
                  <button className="p-2 bg-neutral-700 text-neutral-100 font-semibold" onClick={() => setMediaModal({ component: selectedComponent, setting_name: setting.id })}>
                    Select IMAGE
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
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
) => {
  let rootComponent = page.root_component;
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
  }
  const renderComponent = (component: IEditorComponent) => {
    return component.render();
  };
  return renderComponent(rootComponent);
};
