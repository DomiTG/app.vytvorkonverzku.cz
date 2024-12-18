import useDebounce from "@/components/hooks/useDebounce";
import MainLayout from "@/components/layouts/MainLayout";
import { useUser } from "@/contexts/UserContext";
import ITemplate from "@/interfaces/ITemplate";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export default function CreateConversePage() {
  const { user } = useUser();

  const [loading, setLoading] = useState<boolean>(false);
  const [templates, setTemplates] = useState<Array<ITemplate>>([]);
  const [activeTemplate, setActiveTemplate] = useState<ITemplate | null>(null);

  const [name, setName] = useState<string>("");
  const [type, setType] = useState<"PRODUCT" | "EMAIL">("PRODUCT");
  const [description, setDescription] = useState<string>("");
  const [domain, setDomain] = useState<string>("");
  const [domainLoading, setDomainLoading] = useState<boolean>(false);
  const [domainResponse, setDomainResponse] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const debouncedValue = useDebounce(domain, 200);
  const regex = /^[a-zA-Z0-9_-]{3,20}$/;

  const converseTemplates = templates.filter(
    (template) => template.converse_type === type,
  );

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

  useEffect(() => {
    if (converseTemplates.length > 0) {
      setActiveTemplate(converseTemplates[0]);
    } else {
      setActiveTemplate(null);
    }
  }, [converseTemplates]);

  useEffect(() => {
    setDomainResponse(null);
    if (debouncedValue.length < 3) return;
    if (!user) return;
    const checkDomain = async () => {
      setDomainLoading(true);
      if (!regex.test(debouncedValue)) {
        setDomainResponse({
          success: false,
          message:
            "Doména může obsahovat pouze písmena, čísla, pomlčku a podtržítko a musí mít délku 3-20 znaků.",
        });
        setDomainLoading(false);
        return;
      }
      try {
        const res = await user.api.checkDomain({ domain: debouncedValue });
        if (res.success && !res.exists) {
          setDomainResponse({
            success: true,
            message: `Doména ${debouncedValue}.konverzka.vytvorkonverzku.cz je dostupná.`,
          });
        } else {
          setDomainResponse({
            success: false,
            message: `Doména ${debouncedValue}.konverzka.vytvorkonverzku.cz je již obsazena.`,
          });
        }
        setDomainLoading(false);
      } catch (err) {
        if (err instanceof AxiosError) {
          console.log(err);
          const res = err.response?.data;
          if (!res)
            return setDomainResponse({
              success: false,
              message: "An unknown error occurred.",
            });
          setDomainResponse({ success: false, message: res.message });
        } else {
          setDomainResponse({
            success: false,
            message: "An unknown error occurred.",
          });
        }
        setDomainLoading(false);
      }
    };
    checkDomain();
  }, [debouncedValue]);

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
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="type" className="text-sm text-gray-500">
                Typ konverzky <span className="text-red-500">*</span>
              </label>
              <select
                id="type"
                className="rounded-md bg-gray-200 p-2 w-full mt-2 text-lg"
                value={type}
                onChange={(e) => setType(e.target.value as "PRODUCT" | "EMAIL")}
              >
                <option value="PRODUCT">Produkt</option>
                <option value="EMAIL">E-mail</option>
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <h3 className="text-lg font-semibold mt-4">Nastavení konverzky</h3>
          <p className="text-gray-500">
            Jakou doménu bude konverzka používat a jaké bude mít nastavení.
          </p>
          <hr className="border border-gray-200 p-0 my-4" />
          <div className="flex flex-col md:flex-row w-full mt-4 gap-4">
            <div className="flex flex-col w-full">
              <label htmlFor="domain" className="text-sm text-gray-500">
                Doména konverzky <span className="text-red-500">*</span>
              </label>
              <div
                className={`flex items-center mt-2 rounded-md ${domainLoading ? "opacity-50" : ""} ${!domainLoading && domainResponse ? (domainResponse.success ? "border border-green-500" : "border border-red-500") : ""}`}
              >
                <input
                  type="text"
                  id="domain"
                  placeholder="moje-konverzka"
                  className="rounded-l-md bg-gray-200 p-2 w-full text-md focus:outline-none focus:ring-0"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                />
                <span className="rounded-r-md bg-gray-200 p-2 text-md border-l border-gray-300 px-4 font-normal">
                  .konverzka.vytvorkonverzku.cz
                </span>
              </div>
              {domainLoading && (
                <p className="text-xs text-gray-500 mt-2">
                  Kontrola dostupnosti...
                </p>
              )}
              {domainResponse && !domainLoading && (
                <p
                  className={`text-xs mt-2 ${domainResponse.success ? "text-green-500" : "text-red-500"}`}
                >
                  {domainResponse.message}
                </p>
              )}
              {!domainLoading && !domainResponse && (
                <p className="text-xs text-gray-500 mt-2">
                  Toto bude Vaše prvotní doména. Další domény (např. vlastní
                  doména) můžete přidat později.
                </p>
              )}
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
              converseTemplates.map((template) => (
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
