export default abstract class AbstractComponent {
  name: string;
  description: string;
  component_id: string;

  subComponents: AbstractComponent[] = [];
  values: { [key: string]: string } = {};

  constructor(name: string, description: string, component_id: string) {
    this.name = name;
    this.description = description;
    this.component_id = component_id;
  }

  getSubComponents(): AbstractComponent[] {
    return this.subComponents;
  }

  addSubComponent(subComponent: AbstractComponent): AbstractComponent {
    this.subComponents.push(subComponent);
    return this;
  }

  getValues() {
    return this.values;
  }

  getValue(key: string) {
    return this.values[key];
  }

  setValue(key: string, value: string) {
    this.values[key] = value;
  }

  getComponentId() {
    return this.component_id;
  }

  abstract render(
    setSelectedComponent: (component: AbstractComponent) => void,
    selectedComponent?: AbstractComponent,
  ): JSX.Element;

  abstract clone(): AbstractComponent;
}
