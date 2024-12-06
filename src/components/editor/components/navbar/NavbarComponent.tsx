import { CiTextAlignCenter } from "react-icons/ci";
import IEditorComponent from "../../classes/IEditorComponent";
import { TbLayoutNavbar } from "react-icons/tb";
import FlexColComponent from "@/component/comps/flexs/FlexColComponent";
import RootComponent from "../RootComponent";
import FloatingAddCompComponent from "../../FloatingAddCompComponent";
import FlexRowComponent from "../FlexRowComponent";

export default class NavbarComponent extends IEditorComponent {
  initialized: boolean = false;

  constructor() {
    super("Navbar Component", "A flex row component", "navbar", TbLayoutNavbar);
  }

  render() {
    if (!this.initialized) {
      this.initialized = true;

      const rootComp = this.rootComponent as RootComponent;
      if (!rootComp) return <div>Root component not found</div>;
      const flexRowComp = rootComp.getComponentById("flex-row");
      if (!flexRowComp) return <div>Flex row component not found</div>;
      const flexRowCompC = flexRowComp.clone();
      flexRowCompC.setRootComponent(rootComp);
    }
    return (
      <nav className="bg-white border-b border-gray-200 p-2">
        {this.subComponents.map((component) => component.render())}
      </nav>
    );
  }

  clone() {
    const clone = new NavbarComponent();
    return clone;
  }
}
