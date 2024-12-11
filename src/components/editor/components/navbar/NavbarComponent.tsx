import IEditorComponent from "../../classes/IEditorComponent";
import { TbLayoutNavbar } from "react-icons/tb";
import RootComponent from "../RootComponent";
import FloatingAddCompComponent from "../../FloatingAddCompComponent";

export default class NavbarComponent extends IEditorComponent {
  initialized: boolean = false;

  constructor() {
    super(
      "Navbar Component",
      "A flex row component",
      "navbar",
      TbLayoutNavbar,
      [
        {
          id: "color",
          name: "Background",
          type: "COLOR",
          value: "#ffffff",
          visible: true,
        },
        {
          id: "test array",
          name: "Test Array",
          type: "SELECT",
          value: "1",
          options: [
            { id: "1", name: "Option 1" },
            { id: "2", name: "Option 2" },
            { id: "3", name: "Option 3" },
          ],
          visible: true,
        },
      ],
    );
  }

  render() {
    if (!this.initialized) {
      this.initialized = true;

      const rootComp = this.rootComponent as RootComponent;
      if (!rootComp) return <div>Root component not found</div>;
      const flexComp = rootComp.getComponentById("flex");
      if (!flexComp) return <div>Flex comp not found</div>;
      const flexRowCompC = flexComp.clone();
      const alignSetting = flexRowCompC.getSetting("align");
      const justifySetting = flexRowCompC.getSetting("justify");
      const directionSetting = flexRowCompC.getSetting("direction");
      if (!alignSetting || !justifySetting || !directionSetting)
        return <div>Settings not found</div>;
      alignSetting.value = "center";
      justifySetting.value = "space-between";
      directionSetting.value = "row";
      flexRowCompC.setRootComponent(rootComp);
      const logoTitleFlexColComp = flexComp.clone();
      if (!logoTitleFlexColComp)
        return <div>Logo title flex col comp not found</div>;
      const ltfcAlignSetting = logoTitleFlexColComp.getSetting("align");
      const ltfcJustifySetting = logoTitleFlexColComp.getSetting("justify");
      const ltfcDirectionSetting = logoTitleFlexColComp.getSetting("direction");
      const ltfcGapSetting = logoTitleFlexColComp.getSetting("gap");
      if (
        !ltfcAlignSetting ||
        !ltfcJustifySetting ||
        !ltfcDirectionSetting ||
        !ltfcGapSetting
      )
        return <div>Settings not found</div>;
      ltfcAlignSetting.value = "center";
      ltfcJustifySetting.value = "start";
      ltfcDirectionSetting.value = "row";
      ltfcGapSetting.value = "15px";
      logoTitleFlexColComp.setRootComponent(rootComp);

      //text
      const textComp = rootComp.getComponentById("text");
      if (!textComp) return <div>Text comp not found</div>;
      const textCompC = textComp.clone();
      textCompC.setRootComponent(rootComp);

      //logo
      const imageComp = rootComp.getComponentById("image");
      if (!imageComp) return <div>Image comp not found</div>;
      const imageCompC = imageComp.clone();
      const imageSetting = imageCompC.getSetting("image");
      const altSetting = imageCompC.getSetting("alt");
      const widthSetting = imageCompC.getSetting("width");
      const heightSetting = imageCompC.getSetting("height");
      if (!imageSetting || !altSetting || !widthSetting || !heightSetting)
        return <div>Settings not found</div>;
      imageSetting.value = "https://cdn.vytvorkonverzku.cz/4/fon5yfa56b5";
      altSetting.value = "Logo";
      widthSetting.value = "50";
      heightSetting.value = "50";
      imageCompC.setRootComponent(rootComp);

      logoTitleFlexColComp.addSubComponent(imageCompC);
      logoTitleFlexColComp.addSubComponent(textCompC);

      //add to flex row
      flexRowCompC.addSubComponent(logoTitleFlexColComp);

      //navbar link row
      const navbarLinkRowComp = flexComp.clone();
      const nlrcAlignSetting = navbarLinkRowComp.getSetting("align");
      const nlrcJustifySetting = navbarLinkRowComp.getSetting("justify");
      const nlrcDirectionSetting = navbarLinkRowComp.getSetting("direction");
      if (!nlrcAlignSetting || !nlrcJustifySetting || !nlrcDirectionSetting)
        return <div>Settings not found</div>;
      nlrcAlignSetting.value = "center";
      nlrcJustifySetting.value = "space-evenly";
      nlrcDirectionSetting.value = "row";
      navbarLinkRowComp.setRootComponent(rootComp);
      flexRowCompC.addSubComponent(navbarLinkRowComp);

      //navbar links
      const navbarLinkComp = rootComp.getComponentById("navbar_link");
      if (!navbarLinkComp) return <div>Navbar link comp not found</div>;
      const navbarLinks = ["Home", "About", "Contact"];
      for (let i = 0; i < navbarLinks.length; i++) {
        const navbarLinkCompC = navbarLinkComp.clone();
        const textSetting = navbarLinkCompC.getSetting("text");
        const linkSetting = navbarLinkCompC.getSetting("link");
        if (!textSetting || !linkSetting) return <div>Settings not found</div>;
        textSetting.value = navbarLinks[i];
        linkSetting.value = "/";
        navbarLinkCompC.setRootComponent(rootComp);
        navbarLinkRowComp.addSubComponent(navbarLinkCompC);
      }

      this.addSubComponent(flexRowCompC);
    }
    return (
      <nav
        className={`relative border-b border-gray-200 p-2 hover:border-gray-700`}
        style={{
          backgroundColor:
            (this.getSetting("color")?.value as string) || "#ffffff",
        }}
        onMouseEnter={() => this.getHoveredComponentMethod()(this)}
        onMouseLeave={() => this.getHoveredComponentMethod()(null)}
      >
        {this.subComponents.map((component) => component.render())}
        {this.getHoveredComponentState() === this && (
          <FloatingAddCompComponent comp={this} position="top_right" />
        )}
      </nav>
    );
  }

  productionRender(): JSX.Element {
    return (
      <nav
        className="relative border-b border-gray-200 p-2 w-full"
        style={{
          backgroundColor:
            (this.getSetting("color")?.value as string) || "#ffffff",
        }}
      >
        {this.subComponents.map((component) => component.productionRender())}
      </nav>
    );
  }

  clone() {
    const clone = new NavbarComponent();
    return clone;
  }
}
