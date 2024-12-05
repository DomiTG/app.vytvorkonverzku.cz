export default abstract class IEditorComponent {
  id: string;
  name: string;
  description: string;
  rootComponent?: IEditorComponent;

  subComponents: IEditorComponent[];
  updateMethod!: (component: IEditorComponent) => void;
  setModal!: (component: IEditorComponent) => void;

  constructor(name: string, description: string, id: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.subComponents = [];
  }

  addSubComponent(component: IEditorComponent): void {
    this.subComponents.push(component);
    this.getUpdateMethod()(this);
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
      return () => {};
    }
    return this.rootComponent.setModal;
  }

  abstract render(): JSX.Element;
  abstract clone(): IEditorComponent;
}
