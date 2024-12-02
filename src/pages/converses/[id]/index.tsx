import ConverseLayout from "@/components/layouts/ConverseLayout";

export default function ConverseMainPage() {
  return (
    <ConverseLayout converse_id={1} siderbarShrink={false}>
      <h1 className="text-4xl font-bold">Converse</h1>
    </ConverseLayout>
  );
}
