import { useEffect, useState } from "react";
import IEditorPage from "./interfaces/IEditorPage";
import IEditorComponent from "./classes/IEditorComponent";
import RootComponent from "./components/RootComponent";
import EditorModalComponent from "./EditorModalComponent";

export default function EditorCanvas({
  initialPages,
}: {
  initialPages: IEditorPage[];
}) {
  const [pages, setPages] = useState<IEditorPage[]>(initialPages);
  const [selectedPage, setSelectedPage] = useState<IEditorPage | null>(
    initialPages[0],
  );
  const [updateFlag, setUpdateFlag] = useState<boolean>(false);
  const [modal, setModal] = useState<IEditorComponent | null>(null);

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
      {selectedComponent ? selectedComponent.name : "No component selected"}
      {hoveredComponent ? hoveredComponent.name : "No component hovered"}
      {render(
        selectedPage,
        toggle,
        setModal,
        setSelectedComponent,
        setHoveredComponent,
      )}
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
