import AbstractComponent from "@/component/AbstractComponent";
import FlexColComponent from "@/component/comps/flexs/FlexColComponent";
import FlexRowComponent from "@/component/comps/flexs/FlexRowComponent";
import Jumbotron from "@/component/comps/JumbotronComponent";
import NavbarComponent from "@/component/comps/NavbarComponent";
import PaddingComponent from "@/component/comps/PaddingComponent";
import SectionComponent from "@/component/comps/SectionComponent";
import H1Component from "@/component/comps/texts/H1Component";
import H2Component from "@/component/comps/texts/H2Component";
import H3Component from "@/component/comps/texts/H3Component";
import H4Component from "@/component/comps/texts/H4Component";
import H5Component from "@/component/comps/texts/H5Component";
import H6Component from "@/component/comps/texts/H6Component";
import ParagraphComponent from "@/component/comps/texts/ParagraphComponent";
import VideoComponent from "@/component/comps/VideoComponent";

const availableComponents: {
  category_name: string;
  components: AbstractComponent[];
}[] = [
  {
    category_name: "Flexes",
    components: [
      new FlexRowComponent(),
      new FlexColComponent(),
      new SectionComponent(),
    ],
  },
  {
    category_name: "Navbars",
    components: [new NavbarComponent()],
  },
  {
    category_name: "Texts",
    components: [
      new H1Component(),
      new H2Component(),
      new H3Component(),
      new H4Component(),
      new H5Component(),
      new H6Component(),
      new ParagraphComponent(),
    ],
  },
  {
    category_name: "Jumbotrons",
    components: [new Jumbotron(), new VideoComponent()],
  },
  { category_name: "Styling", components: [new PaddingComponent()] },
];

export const allComponents: AbstractComponent[] = availableComponents
  .map((category) => category.components)
  .flat();
export const findById = (id: string): AbstractComponent | undefined =>
  allComponents.find((comp) => comp.component_id === id);

export default availableComponents;
