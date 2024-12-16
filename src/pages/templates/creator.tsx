import IEditorComponent from "@/components/editor/classes/IEditorComponent";
import RootComponent from "@/components/editor/components/RootComponent";
import EditorCanvas from "@/components/editor/EditorCanvas";
import IEditorPage from "@/components/editor/interfaces/IEditorPage";
import MainLayout from "@/components/layouts/MainLayout";
import PageAddButtonComponent from "@/components/templates/PageAddButtonComponent";
import PageButtonComponent from "@/components/templates/PageButtonComponent";
import { useUser } from "@/contexts/UserContext";
import { AxiosError } from "axios";
import { useState } from "react";

export default function TemplateCreatorPage() {
  const { user } = useUser();
  const [pages, setPages] = useState<IEditorPage[]>([]);
  const [selectedPage, setSelectedPage] = useState<IEditorPage | null>(null);
  const [productionSee, setProductionSee] = useState<boolean>(false);
  const [canvasMode, setCanvasMode] = useState<"DESKTOP" | "MOBILE" | "TABLET">(
    "DESKTOP",
  );
  const [templateJson, setTemplateJson] = useState<string>("");
  const [json, setJson] = useState<string>("");

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [templateName, setTemplateName] = useState<string>("");
  const [templateDescription, setTemplateDescription] = useState<string>("");
  const [templateType, setTemplateType] = useState<string>("");

  const generateTemplateJson = (): string => {
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
    components: any[],
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

  const handleClick = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (loading) return;
    if (!user) return setError("You must be logged in to save a template.");
    if (!templateName) return setError("Template name is required.");
    if (!templateDescription)
      return setError("Template description is required.");
    if (!templateType) return setError("Template type is required.");
    try {
      setLoading(true);
      setError(null);

      const res = await user.api.createTemplate({
        name: templateName,
        converse_type: templateType,
        description: templateDescription,
        template: await generateTemplateJson(),
        thumbnail_url:
          "https://i0.wp.com/czechmag.cz/wp-content/uploads/2020/07/featured-1.png?fit=1920%2C1080&ssl=1",
      });
      if (res.success) {
        console.log("Template saved");
        setLoading(false);
        setModalOpen(false);
      } else {
        setError(res.message);
        setLoading(false);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        const res = err.response?.data;
        if (!res) return setError("An unknown error occurred.");
        setError(res.message);
        setLoading(false);
      } else {
        setError("An unknown error occurred.");
        setLoading(false);
      }
    }
  };

  return (
    <MainLayout childPaddingDisabled={true}>
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999]">
          <div className="bg-white p-8 rounded-lg w-96">
            <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-2 uppercase tracking-wider">
              Save template
            </h2>
            <p className="text-gray-500">Save your template to the database.</p>
            {error && (
              <div className="bg-red-100 border-l-4 border-red-400 text-red-700 px-4 py-3 relative mb-4 mt-2">
                {error}
              </div>
            )}
            <form className="mt-4">
              <div>
                <label
                  className="block text-sm font-medium text-gray-600 mb-1"
                  htmlFor="template-name"
                >
                  Template name
                </label>
                <input
                  type="text"
                  placeholder="Enter template name"
                  className="p-2 bg-zinc-100 text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full rounded-lg"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-600 mb-1 mt-2"
                  htmlFor="template-description"
                >
                  Template description
                </label>
                <textarea
                  placeholder="Enter template description"
                  className="p-2 bg-zinc-100 text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full rounded-lg"
                  value={templateDescription}
                  onChange={(e) => setTemplateDescription(e.target.value)}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-600 mb-1 mt-2"
                  htmlFor="template-json"
                >
                  Type
                </label>
                <select
                  className="p-2 bg-zinc-100 text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full rounded-lg"
                  onChange={(e) => setTemplateType(e.target.value)}
                  value={templateType}
                >
                  <option disabled selected>
                    Vyber typ
                  </option>
                  <option value="product">PRODUCT</option>
                  <option value="email">EMAIL</option>
                </select>
              </div>
            </form>
            <div className="flex flex-row gap-4 ">
              <button
                className="bg-gray-200 text-zinc-500 p-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer uppercase text-xs font-semibold mt-4"
                onClick={() => setModalOpen(false)}
              >
                Close
              </button>
              <button
                className="bg-gray-200 text-zinc-500 p-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer uppercase text-xs font-semibold mt-4"
                onClick={handleClick}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
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
                    : "DESKTOP",
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
          <button
            className="bg-gray-200 text-zinc-500 p-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer uppercase text-xs font-semibold mt-4"
            onClick={() => setModalOpen(true)}
          >
            Save template
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
