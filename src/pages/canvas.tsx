import IEditorComponent from "@/components/editor/classes/IEditorComponent";
import EditorCanvas from "@/components/editor/EditorCanvas";
import MainLayout from "@/components/layouts/MainLayout";

export default function CanvasPage() {
  return (
    <MainLayout childPaddingDisabled>
      <EditorCanvas
        initialPages={[
          {
            name: "test",
            page_type: "CONVERSE_PAGE",
            root_component: null,
            url: "/",
          },
        ]}
      />
    </MainLayout>
  );
}
