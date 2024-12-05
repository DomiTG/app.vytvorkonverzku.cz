import MainLayout from "@/components/layouts/MainLayout";
import { useUser } from "@/contexts/UserContext";
import ITemplate from "@/interfaces/ITemplate";
import { useEffect, useState } from "react";

export default function CreateConversePage() {
  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [templates, setTemplates] = useState<Array<ITemplate>>([]);
  const [activeTemplate, setActiveTemplate] = useState<ITemplate | null>(null);

  useEffect(() => {
    if (!user) return;
    const fetchTemplates = async () => {
      try {
        const res = await user.api.getTemplates();
        if (res.success) {
          setTemplates(res.templates);
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  return (
    <MainLayout>
      <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-2 uppercase tracking-wider">
        Vytvořit konverzku
      </h2>
      <p className="text-gray-500">
        Vítej! Pojďme společně vytvořit novou konverzku, která bude obsahovat
        všechny potřebné informace pro vaše zákazníky.
      </p>
      <div className="w-full mt-4">
        <form className="w-full">
          <h3 className="text-lg font-semibold mt-4">Základní informace</h3>
          <p className="text-gray-500">
            Zadejte základní informace o konverzce, jako je název, typ a popis.
          </p>
          <hr className="border border-gray-200 p-0 my-4" />
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col w-full">
              <label htmlFor="name" className="text-sm text-gray-500">
                Název konverzky <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                placeholder="Název konverzky"
                className="rounded-md bg-gray-200 p-2 w-full mt-2 text-md"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="type" className="text-sm text-gray-500">
                Typ konverzky <span className="text-red-500">*</span>
              </label>
              <select
                id="type"
                className="rounded-md bg-gray-200 p-2 w-full mt-2 text-lg"
              >
                <option value="public">Produkt</option>
                <option value="private">E-mail</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col w-full mt-4">
            <label htmlFor="description" className="text-sm text-gray-500">
              Popis konverzky{" "}
              <span className="text-blue-500 text-xs">(volitelné)</span>
            </label>
            <textarea
              id="description"
              placeholder="Moje konverzka bude obsahovat..."
              className="rounded-md bg-gray-200 p-2 w-full mt-2 text-md"
            />
          </div>
          <h3 className="text-lg font-semibold mt-4">Nastavení konverzky</h3>
          <p className="text-gray-500">
            Jakou doménu bude konverzka používat a jaké bude mít nastavení.
          </p>
          <hr className="border border-gray-200 p-0 my-4" />
          <div className="flex flex-row w-full mt-4 gap-4">
            <div className="flex flex-col w-full">
              <label htmlFor="domain" className="text-sm text-gray-500">
                Doména konverzky <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center mt-2">
                <input
                  type="text"
                  id="domain"
                  placeholder="moje-konverzka"
                  className="rounded-l-md bg-gray-200 p-2 w-full text-md"
                />
                <span className="rounded-r-md bg-gray-200 p-2 text-md border-l border-gray-300 px-4 font-normal">
                  .konverzka.vytvorkonverzku.cz
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Toto bude Vaše prvotní doména. Další domény (např. vlastní
                doména) můžete přidat později.
              </p>
            </div>
            <div className="flex flex-col w-full"></div>
          </div>
          <h2 className="text-lg font-semibold mt-4">Vzhled konverzky</h2>
          <p className="text-gray-500">
            Jak bude vypadat Vaše konverzka? Vyberte si šablonu, kterou si
            budete moci později upravit.
          </p>
          <hr className="border border-gray-200 p-0 my-4" />
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {loading && (
              <div className="bg-white rounded-lg overflow-hidden w-full mt-4 border border-gray-200 p-4 text-center tracking-wide col-span-1 md:col-span-3 lg:col-span-4">
                <p>Načítání šablon...</p>
              </div>
            )}
            {!loading &&
              templates.map((template) => (
                <div
                  key={template.id}
                  className={`bg-white rounded-lg overflow-hidden border relative ${
                    activeTemplate === template
                      ? "border-green-500"
                      : "border-gray-200"
                  }`}
                  onClick={() => setActiveTemplate(template)}
                >
                  <img
                    src={template.thumbnail_url}
                    alt={template.name}
                    className="w-full object-cover object-center"
                  />
                  <div className="opacity-0 hover:opacity-100 transition-all duration-300 absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer select-none">
                    <div className="text-white text-center">
                      <h3 className="text-lg font-semibold">{template.name}</h3>
                      <p className="text-sm">{template.description}</p>
                      <p className="font-semibold tracking-widest text-sm mt-2">
                        Klikni pro výběr
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            {!loading && templates.length === 0 && (
              <div className="bg-white rounded-lg overflow-hidden w-full mt-4 border border-gray-200 p-4 text-center tracking-wide col-span-1 md:col-span-3 lg:col-span-4">
                <p>Nebyly nalezeny žádné šablony.</p>
              </div>
            )}
          </div>
          <hr className="border border-gray-200 p-0 my-4" />
          <div className="flex flex-row justify-end gap-4 items-start mt-4">
            <div className="flex flex-col">
              <p className="text-xs text-gray-500 mt-4">
                <span className="text-red-500">*</span> Pole označené hvězdičkou
                je povinné.
              </p>
            </div>
            <button className="px-4 py-2 text-md font-bold text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-all uppercase">
              Vytvořit konverzku
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
