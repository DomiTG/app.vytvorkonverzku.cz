import IEditorComponent from "@/components/editor/classes/IEditorComponent";
import RootComponent from "@/components/editor/components/RootComponent";
import EditorCanvas from "@/components/editor/EditorCanvas";
import IEditorPage from "@/components/editor/interfaces/IEditorPage";
import MainLayout from "@/components/layouts/MainLayout";
import PageAddButtonComponent from "@/components/templates/PageAddButtonComponent";
import PageButtonComponent from "@/components/templates/PageButtonComponent";
import { useState } from "react";

export default function TemplateCreatorPage() {
  const [pages, setPages] = useState<IEditorPage[]>([]);
  const [selectedPage, setSelectedPage] = useState<IEditorPage | null>(null);
  const [productionSee, setProductionSee] = useState<boolean>(false);
  const [canvasMode, setCanvasMode] = useState<"DESKTOP" | "MOBILE" | "TABLET">(
    "DESKTOP"
  );
  const [templateJson, setTemplateJson] = useState<string>("");
  const [json, setJson] = useState<string>("");

  const generateTemplateJson = () => {
    const template = { pages: [] } as any;
    pages.forEach((page) => {
      const rootComponent = page.root_component;
      if (rootComponent) {
        const components = rootComponent.save();
        template.pages.push({ name: page.name, components });
      }
    });
    return JSON.stringify(template);
  };

  const loadTemplateJson = (json: string) => {
    const template = JSON.parse(json);
    const newPages = [] as IEditorPage[];
    template.pages.forEach((page: any) => {
      console.log("loading up page", page.name);
      const newPage = {
        name: page.name,
        root_component: null,
      } as IEditorPage;
      if (
        !page.components ||
        !page.components.id ||
        page.components.id !== "root"
      ) {
        return console.warn("Invalid root component", page.components?.id);
      }
      const rootComp = new RootComponent();
      loadSubComponents(rootComp, rootComp, page.components.subComponents);
      newPage.root_component = rootComp;
      newPages.push(newPage);
    });
    setPages(newPages);
    console.log(newPages);
  };

  const loadSubComponents = (
    root: RootComponent,
    parent: IEditorComponent,
    components: any[]
  ): void => {
    console.log("Loading up sub comps for ", parent.name);
    console.log(components);
    const subComponents = [] as IEditorComponent[];
    components.forEach((component: any) => {
      console.log("Loading up sub comp", component.id);
      const newComponent = root.getComponentById(component.id)?.clone();
      if (!newComponent) {
        console.warn("Component not found", component.id);
        return;
      }
      if (root !== parent) {
        newComponent.setRootComponent(root);
      }
      component.settings.forEach((setting: any) => {
        console.log("Loading up setting", setting.name);
        const { id, value } = setting;
        newComponent.updateSetting(id, value);
      });
      loadSubComponents(root, newComponent, component.subComponents);
      subComponents.push(newComponent);
    });
    parent.subComponents = subComponents;
    console.log("Sub components loaded", subComponents);
  };

  return (
    <MainLayout childPaddingDisabled={true}>
      <div className="px-8 pt-8">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-2 uppercase tracking-wider">
          Template creator
        </h2>
        <p className="text-gray-500">
          Create your own templates here and share them with the world.
        </p>
        <div className="flex flex-row flex-wrap gap-4 mt-2">
          {pages.map((page) => (
            <PageButtonComponent
              key={page.name}
              page={page}
              setActivePage={setSelectedPage}
              activePage={selectedPage}
            />
          ))}
          <PageAddButtonComponent
            pages={pages}
            setPages={setPages}
            setSelectedPage={setSelectedPage}
          />
        </div>
        <div className="flex flex-row gap-4 mt-4">
          <button
            className="bg-gray-200 text-zinc-500 p-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer uppercase text-xs font-semibold mt-4"
            onClick={() => setProductionSee(!productionSee)}
          >
            {productionSee ? "Edit mode" : "Production mode"}
          </button>
          <button
            className="bg-gray-200 text-zinc-500 p-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer uppercase text-xs font-semibold mt-4"
            onClick={() =>
              setCanvasMode(
                canvasMode === "DESKTOP"
                  ? "MOBILE"
                  : canvasMode === "MOBILE"
                  ? "TABLET"
                  : "DESKTOP"
              )
            }
          >
            {canvasMode}
          </button>
          <button
            className="bg-gray-200 text-zinc-500 p-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer uppercase text-xs font-semibold mt-4"
            onClick={() => {
              setTemplateJson(generateTemplateJson());
            }}
          >
            Generate JSON
          </button>
        </div>
        <div className="flex flex-row gap-4 mt-4">
          <textarea
            className="bg-gray-100 rounded-md p-2 text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full h-32"
            value={json}
            onChange={(e) => setJson(e.target.value)}
          />
          <button
            className="bg-gray-200 text-zinc-500 p-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer uppercase text-xs font-semibold mt-4"
            onClick={() => {
              loadTemplateJson(json);
            }}
          >
            Load JSON
          </button>
        </div>
        {templateJson && (
          <p className="text-xs text-gray-500 break-all">{templateJson}</p>
        )}
        <hr className="mt-4 border-gray-300" />
      </div>
      <EditorCanvas
        selectedPage={selectedPage}
        productionSee={productionSee}
        canvasMode={canvasMode}
      />
    </MainLayout>
  );
}
