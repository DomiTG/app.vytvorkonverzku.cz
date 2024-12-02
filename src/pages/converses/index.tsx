import MainLayout from "@/components/layouts/MainLayout";
import { useRouter } from "next/router";

export default function ConversesListPage() {
  const router = useRouter();
  const data = [
    {
      nazev: "Moje nejoblíbenější konverzka",
      vytvoreno: "2024-11-01",
      typ: "Dokument",
      id: 1,
    },
    { nazev: "Projekt B", vytvoreno: "2024-11-15", typ: "Aplikace", id: 2 },
    { nazev: "Projekt C", vytvoreno: "2024-11-20", typ: "Web", id: 3 },
  ];

  return (
    <MainLayout>
      <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-2 uppercase tracking-wider">
        Konverzky
      </h2>
      <p className="text-gray-500">
        Zde najdete seznam všech konverzek, které jste vytvořili.
      </p>
      <div className="bg-white rounded-lg overflow-hidden w-full mt-4 border border-gray-200">
        {data.map((item) => (
          <div
            key={item.id}
            className="flex flex-row items-center justify-between border-b border-gray-200 py-4 px-10 hover:bg-gray-50 transition-all cursor-pointer"
            onClick={() => router.push(`/converses/${item.id}`)}
          >
            <div>
              <h3 className="text-lg font-semibold">{item.nazev}</h3>
              <p className="text-gray-500 text-sm">{item.typ}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">{item.vytvoreno}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-row justify-end gap-4 items-center mt-4">
        <button className="px-4 py-2 text-xs font-bold text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-all uppercase">
          Vytvořit konverzku
        </button>
      </div>
    </MainLayout>
  );
}
