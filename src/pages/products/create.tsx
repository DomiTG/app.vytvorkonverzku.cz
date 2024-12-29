import MainLayout from "@/components/layouts/MainLayout";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useUser } from "@/contexts/UserContext";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function CreateProductPage() {
  const { user } = useUser();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [productType, setProductType] = useState("PRODUCT");
  const [productSubtype, setProductSubtype] = useState("PHYSICAL");
  const [name, setName] = useState("");
  const [prices, setPrices] = useState([{ price: 0, currency: "CZK" }]);
  const [currencies] = useState<Array<string>>(["CZK", "EUR", "USD"]);
  const [weight, setWeight] = useState<number>(0);
  const [emailContent, setEmailContent] = useState<string>("");
  const [attachments, setAttachments] = useState<File[]>([]);

  const [taxPayer, setTaxPayer] = useState<boolean>(false);
  const [taxRate, setTaxRate] = useState<number>(0);
  const [taxIncluded, setTaxIncluded] = useState<boolean>(false);

  const router = useRouter();

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

  const calculateWithoutTax = (price: number) => {
    if (!taxPayer) return price;
    return taxIncluded ? price / (1 + taxRate / 100) : price;
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!name || !productType) {
      return setError("Please fill out all required fields");
    }
    if (loading) return;
    setError(null);
    switch (productType) {
      case "PRODUCT":
        handleProductSave();
        break;
      case "EMAIL":
        setError("Email products are not supported yet");
        break;
      default:
        setError("Invalid product type");
        break;
    }
  };

  const handleProductSave = async () => {
    if (!productSubtype || !prices.length) {
      return setError("Please fill out all required fields");
    }
    if (!user) {
      return setError("You must be logged in to save a product");
    }
    switch (productSubtype) {
      case "PHYSICAL":
        if (!weight) {
          return setError("Please enter the weight of the product");
        }
        try {
          setLoading(true);
          const response = await user.api.createProduct({
            name,
            product_type: productType,
            product_subtype: productSubtype,
            weight,
            prices: prices.map((price) => ({
              price: price.price,
              currency: price.currency,
            })),
            tax: {
              taxPayer: taxPayer,
              taxRate: taxRate,
              taxIncluded: taxIncluded,
            },
            digital: {},
          });
          if (response.success) {
            console.log("Product created successfully");
            router.push("/products");
          } else {
            setError(response.message);
            setLoading(false);
          }
        } catch (err) {
          if (err instanceof AxiosError) {
            const res = err.response?.data;
            if (!res) return setError("An unknown error occurred");
            setError(res.message);
            setLoading(false);
          } else {
            setError("An unknown error occurred");
            setLoading(false);
          }
        }
        break;
      case "DIGITAL":
        break;
      default:
        setError("Invalid product subtype");
        break;
    }
  };

  return (
    <MainLayout>
      <h2 className="text-3xl font-bold border-l-4 border-blue-600 pl-3 uppercase tracking-wide">
        Vytvořit nový produkt
      </h2>
      <p className="text-gray-500 mt-2">
        Přidejte produkt do svého katalogu s podrobnými informacemi.
      </p>

      <form className="mt-8 space-y-6" onSubmit={handleSaveProduct}>
        {error && (
          <div className="bg-red-100 border-l-4 border-red-400 text-red-700 px-4 py-3 relative mb-4">
            {error}
          </div>
        )}
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
                  placeholder="Hmotnost produktu v kg"
                  min={1}
                  max={10}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  value={weight}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    if (value < 0 || value > 10) return;
                    setWeight(e.target.value ? parseFloat(e.target.value) : 0);
                  }}
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
                    min={1}
                    max={10000}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      if (value < 0.1 || value > 10000) return;
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
                    min={0}
                    max={100}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      if (value < 0 || value > 100) return;
                      setTaxRate(
                        e.target.value ? parseFloat(e.target.value) : 0,
                      );
                    }}
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
            {taxPayer && (
              <p className="text-sm text-gray-500 text-center">
                Cena bez DPH:{" "}
                {prices
                  .map(
                    (price) =>
                      calculateWithoutTax(price.price).toFixed(2) +
                      " " +
                      price.currency,
                  )
                  .join(", ")}
                . Cena s DPH:{" "}
                {prices
                  .map(
                    (price) =>
                      (
                        calculateWithoutTax(price.price) +
                        (!taxIncluded
                          ? calculateWithoutTax(price.price) * (taxRate / 100)
                          : 0)
                      ).toFixed(2) +
                      " " +
                      price.currency,
                  )
                  .join(", ")}
              </p>
            )}
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
