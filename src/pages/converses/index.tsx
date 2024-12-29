import MainLayout from "@/components/layouts/MainLayout";
import { useUser } from "@/contexts/UserContext";
import IConverse from "@/interfaces/IConverse";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ConversesListPage() {
  const router = useRouter();
  const { user } = useUser();

  const [loading, setLoading] = useState<boolean>(true);
  const [converses, setConverses] = useState<IConverse[]>([]);

  useEffect(() => {
    if (!user) return;
    const fetchConverses = async () => {
      try {
        const res = await user.api.getConverses();
        setConverses(res.converses);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchConverses();
  }, []);

  const convertShopType = (type: string) => {
    switch(type) {
      case "PRODUCT":
        return "Produkt";
      case "EMAIL":
        return "Email";
      default:
        return "Neznámý";
    }
  }

  return (
    <MainLayout>
      <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-2 uppercase tracking-wider">
        Konverzky
      </h2>
      <p className="text-gray-500">
        Zde najdete seznam všech konverzek, které jste vytvořili.
      </p>
      {loading && (
        <div className="bg-white rounded-lg overflow-hidden w-full mt-4 border border-gray-200 p-4 text-center tracking-wide">
          <p>Načítání konverzek...</p>
        </div>
      )}
      {converses.length === 0 && !loading && (
        <div className="bg-white rounded-lg overflow-hidden w-full mt-4 border border-gray-200 p-4 text-center tracking-wide">
          <p>Nebyly nalezeny žádné konverzky.</p>
        </div>
      )}
      {converses.length > 0 && (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 mt-6">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Název
              </th>
              <th scope="col" className="px-6 py-3">
                Typ
              </th>
              <th scope="col" className="px-6 py-3">
                Živě?
              </th>
              <th scope="col" className="px-6 py-3">
                Akce
              </th>
            </tr>
          </thead>
          <tbody>
            {converses.map((converse, i) => (
                <tr className="bg-white border-b" key={i}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {converse.name}
                </th>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {convertShopType(converse.type)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {converse.live_mode ? "Ano" : "Ne"}
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/converses/${converse.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Editovat
                  </Link>
                  <Link
                    href={`${converse.domains.length > 0 ? "https://" + converse.domains[0].domain : ""}`}
                    className="text-blue-500 hover:underline ml-2"
                    target="_blank"
                  >
                    Náhled
                  </Link>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="flex flex-row justify-end gap-4 items-center mt-4">
        <Link
          className="px-4 py-2 text-xs font-bold text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-all uppercase"
          href="/converses/create"
        >
          Vytvořit konverzku
        </Link>
      </div>
    </MainLayout>
  );
}
