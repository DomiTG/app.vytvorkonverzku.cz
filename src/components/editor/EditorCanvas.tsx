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

  const toggle = () => setUpdateFlag(!updateFlag);

  useEffect(() => {
    console.log((selectedPage?.root_component as RootComponent).generateJson());
  }, [updateFlag]);

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
      {render(selectedPage, toggle, setModal)}
    </>
  );
}

const render = (
  page: IEditorPage,
  updateMethod: () => void,
  setModal: (component: IEditorComponent) => void,
) => {
  let rootComponent = page.root_component;
  if (!rootComponent) {
    const rootComp = new RootComponent();
    rootComp.init(updateMethod, setModal);
    page.root_component = rootComp;
    rootComponent = rootComp;
  }
  const renderComponent = (component: IEditorComponent) => {
    return component.render();
  };
  return renderComponent(rootComponent);
};
