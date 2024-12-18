import MainLayout from "@/components/layouts/MainLayout";
import { useState } from "react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function CreateProductPage() {
  const [productType, setProductType] = useState("PRODUCT");
  const [productSubtype, setProductSubtype] = useState("PHYSICAL");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [prices, setPrices] = useState([{ price: 0, currency: "CZK" }]);
  const [currencies] = useState<Array<string>>(["CZK", "EUR", "USD"]);
  const [weight, setWeight] = useState<number>(0);
  const [emailContent, setEmailContent] = useState<string>("");
  const [attachments, setAttachments] = useState<File[]>([]);

  const [taxPayer, setTaxPayer] = useState<boolean>(false);
  const [taxRate, setTaxRate] = useState<number>(0);
  const [taxIncluded, setTaxIncluded] = useState<boolean>(false);

  const handleAddPrice = () => {
    setPrices([...prices, { price: 0, currency: "CZK" }]);
  };

  const handleRemovePrice = (index: number) => {
    const newPrices = prices.filter((_, i) => i !== index);
    setPrices(newPrices);
  };

  const handleAddAttachment = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const files = Array.from(event.target.files);
    setAttachments((prev) => [...prev, ...files]);
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  return (
    <MainLayout>
      <h2 className="text-3xl font-bold border-l-4 border-blue-600 pl-3 uppercase tracking-wide">
        Vytvořit nový produkt
      </h2>
      <p className="text-gray-500 mt-2">
        Přidejte produkt do svého katalogu s podrobnými informacemi.
      </p>

      <form className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Název produktu
            </label>
            <input
              type="text"
              id="name"
              placeholder="Název produktu"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="productType"
              className="block text-sm font-medium text-gray-700"
            >
              Typ produktu
            </label>
            <select
              id="productType"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
            >
              <option value="PRODUCT">Produkt</option>
              <option value="EMAIL">Email</option>
            </select>
          </div>
        </div>

        {productType === "PRODUCT" && (
          <div className="space-y-6">
            <div>
              <label
                htmlFor="productSubtype"
                className="block text-sm font-medium text-gray-700"
              >
                Podtyp produktu
              </label>
              <select
                id="productSubtype"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={productSubtype}
                onChange={(e) => setProductSubtype(e.target.value)}
              >
                <option value="PHYSICAL">Fyzický</option>
                <option value="DIGITAL">Digitální</option>
              </select>
            </div>

            {productSubtype === "PHYSICAL" && (
              <div>
                <label
                  htmlFor="weight"
                  className="block text-sm font-medium text-gray-700"
                >
                  Hmotnost produktu (v kg)
                </label>
                <input
                  type="number"
                  id="weight"
                  placeholder="Hmotnost produktu"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  value={weight}
                  onChange={(e) =>
                    setWeight(e.target.value ? parseFloat(e.target.value) : 0)
                  }
                />
              </div>
            )}

            {productSubtype === "DIGITAL" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Obsah emailu
                  </label>
                  <ReactQuill
                    value={emailContent}
                    onChange={setEmailContent}
                    className="mt-2 bg-white rounded-lg shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Přílohy
                  </label>
                  <input
                    type="file"
                    multiple
                    className="mt-1 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    onChange={handleAddAttachment}
                  />

                  {attachments.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {attachments.map((file, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <span className="text-gray-700 text-sm">
                            {file.name}
                          </span>
                          <button
                            type="button"
                            className="text-red-600 hover:text-red-800 focus:outline-none"
                            onClick={() => handleRemoveAttachment(index)}
                          >
                            Odebrat
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Ceny</h3>
              {prices.map((price, index) => (
                <div key={index} className="flex items-center space-x-4 mt-4">
                  <input
                    type="number"
                    placeholder="Cena"
                    className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={price.price}
                    onChange={(e) => {
                      const newPrices = [...prices];
                      newPrices[index].price = parseFloat(e.target.value);
                      setPrices(newPrices);
                    }}
                  />
                  <select
                    className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={price.currency}
                    onChange={(e) => {
                      const newPrices = [...prices];
                      newPrices[index].currency = e.target.value;
                      setPrices(newPrices);
                    }}
                  >
                    {currencies.map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="text-red-600 hover:text-red-800 focus:outline-none"
                    onClick={() => handleRemovePrice(index)}
                  >
                    Odebrat
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onClick={handleAddPrice}
              >
                Přidat cenu
              </button>
            </div>
            {/* tax settings */}
            <div className="flex flex-col md:flex-row items-center space-x-4 w-full mt-4 justify-center">
              <div className="flex flex-row items-center space-x-4">
                <label
                  htmlFor="taxPayer"
                  className="block text-sm font-medium text-gray-700"
                >
                  Plátce DPH
                </label>
                <select
                  id="taxPayer"
                  className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  value={taxPayer ? "true" : "false"}
                  onChange={(e) => setTaxPayer(e.target.value === "true")}
                >
                  <option value="true">Ano</option>
                  <option value="false">Ne</option>
                </select>
              </div>
              {taxPayer && (
                <div className="flex flex-row items-center space-x-4">
                  <label
                    htmlFor="taxRate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    DPH sazba (%) (0-100)
                  </label>
                  <input
                    type="number"
                    id="taxRate"
                    placeholder="DPH sazba"
                    className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={taxRate}
                    onChange={(e) =>
                      setTaxRate(
                        e.target.value ? parseFloat(e.target.value) : 0,
                      )
                    }
                  />
                </div>
              )}
              {taxPayer && (
                <div className="flex flex-row items-center space-x-4">
                  <label
                    htmlFor="taxIncluded"
                    className="block text-sm font-medium text-gray-700"
                  >
                    DPH zahrnuto
                  </label>
                  <select
                    id="taxIncluded"
                    className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={taxIncluded ? "true" : "false"}
                    onChange={(e) => setTaxIncluded(e.target.value === "true")}
                  >
                    <option value="true">Ano</option>
                    <option value="false">Ne</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        )}

        {productType === "EMAIL" && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Obsah emailu
              </label>
              <ReactQuill
                value={emailContent}
                onChange={setEmailContent}
                className="mt-2 bg-white rounded-lg shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Přílohy
              </label>
              <input
                type="file"
                multiple
                className="mt-1 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                onChange={handleAddAttachment}
              />

              {attachments.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {attachments.map((file, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-700 text-sm">{file.name}</span>
                      <button
                        type="button"
                        className="text-red-600 hover:text-red-800 focus:outline-none"
                        onClick={() => handleRemoveAttachment(index)}
                      >
                        Odebrat
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-col items-end">
          <button
            type="submit"
            className="bg-zinc-200 text-zinc-500 px-4 py-2 rounded-md hover:bg-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-500"
          >
            Uložit produkt
          </button>
        </div>
      </form>
    </MainLayout>
  );
}
