import MainLayout from "@/components/layouts/MainLayout";
import { useUser } from "@/contexts/UserContext";
import IConverse from "@/interfaces/IConverse";
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
        setConverses(res);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchConverses();
  }, []);

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
        <div className="bg-white rounded-lg overflow-hidden w-full mt-4 border border-gray-200">
          {converses.map((converse) => (
            <div
              key={converse.id}
              className="flex flex-row items-center justify-between border-b border-gray-200 py-4 px-10 hover:bg-gray-50 transition-all cursor-pointer"
              onClick={() => router.push(`/converses/${converse.id}`)}
            >
              <div>
                <h3 className="text-lg font-semibold">{converse.name}</h3>
                <p className="text-gray-500 text-sm">{converse.type}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">
                  {converse.created_at.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-row justify-end gap-4 items-center mt-4">
        <button className="px-4 py-2 text-xs font-bold text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-all uppercase">
          Vytvořit konverzku
        </button>
      </div>
    </MainLayout>
  );
}
