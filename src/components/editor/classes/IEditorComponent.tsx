import { IconType } from "react-icons";
import SettingType from "../settings/SettingType";

export default abstract class IEditorComponent {
  id: string;
  name: string;
  description: string;
  rootComponent?: IEditorComponent;
  icon: IconType;
  settings: SettingType[] = [];

  subComponents: IEditorComponent[];
  updateMethod!: (component: IEditorComponent) => void;
  setModal!: (component: IEditorComponent) => void;
  setSelectedComponent!: (component: IEditorComponent) => void;

  hoveredComponent?: IEditorComponent | null;
  setHoveredComponent!: (component: IEditorComponent | null) => void;

  constructor(
    name: string,
    description: string,
    id: string,
    icon: IconType,
    settings: SettingType[] = [],
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.subComponents = [];
    this.icon = icon;
    this.settings = settings;
  }

  addSubComponent(component: IEditorComponent): IEditorComponent {
    this.subComponents.push(component);
    this.getUpdateMethod()(this);
    return component;
  }

  removeSubComponent(component: IEditorComponent): void {
    this.subComponents = this.subComponents.filter(
      (subComponent) => subComponent.id !== component.id,
    );
    this.getUpdateMethod()(this);
  }

  setRootComponent(component: IEditorComponent): void {
    this.rootComponent = component;
  }

  setUpdateMethod(updateMethod: (component: IEditorComponent) => void): void {
    this.updateMethod = updateMethod;
  }

  setModalMethod(setModal: (component: IEditorComponent) => void): void {
    this.setModal = setModal;
  }

  setSelectedComponentMethod(
    setSelectedComponent: (component: IEditorComponent) => void,
  ): void {
    this.setSelectedComponent = setSelectedComponent;
  }

  addSetting(setting: SettingType): void {
    this.settings.push(setting);
  }

  removeSetting(setting: SettingType): void {
    this.settings = this.settings.filter((s) => s.id !== setting.id);
  }

  getSetting(id: string): SettingType | undefined {
    return this.settings.find((setting) => setting.id === id);
  }

  getUpdateMethod(): (component: IEditorComponent) => void {
    if (this.rootComponent === this) {
      return this.updateMethod;
    }
    if (!this.rootComponent) {
      return () => {};
    }
    return this.rootComponent.updateMethod;
  }

  getModalMethod(): (component: IEditorComponent) => void {
    if (this.rootComponent === this) {
      return this.setModal;
    }
    if (!this.rootComponent) {
      console.log("null");
      return () => {};
    }
    return this.rootComponent.setModal;
  }

  getSelectedComponentMethod(): (component: IEditorComponent) => void {
    if (this.rootComponent === this) {
      return this.setSelectedComponent;
    }
    if (!this.rootComponent) {
      console.log("null");
      return () => {};
    }
    return this.rootComponent.setSelectedComponent;
  }

  setHoveredComponentMethod(
    setHoveredComponent: (component: IEditorComponent | null) => void,
  ): void {
    this.setHoveredComponent = setHoveredComponent;
  }

  getHoveredComponentMethod(): (component: IEditorComponent | null) => void {
    if (this.rootComponent === this) {
      return this.setHoveredComponent;
    }
    if (!this.rootComponent) {
      console.log("null");
      return () => {};
    }
    return this.rootComponent.setHoveredComponent;
  }

  setHoveredComponentState(component: IEditorComponent | null): void {
    this.hoveredComponent = component;
  }

  abstract render(): JSX.Element;
  abstract clone(): IEditorComponent;
}
