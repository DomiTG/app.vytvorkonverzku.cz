import ConverseLayout from "@/components/layouts/ConverseLayout";

export default function ConverseMainPage() {
  return (
    <ConverseLayout converse_id={1} siderbarShrink={false}>
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-2 uppercase tracking-wider">
          Konverzka
        </h2>
        <p className="text-gray-500">
         Úprava konverzky.
        </p>
    </ConverseLayout>
  );
}
