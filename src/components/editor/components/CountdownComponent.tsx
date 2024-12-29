import React, { useState, useEffect } from "react";
import { CgLock } from "react-icons/cg";
import IEditorComponent from "../classes/IEditorComponent";
import RootComponent from "./RootComponent";

export default class CountdownComponent extends IEditorComponent {
  timerComponent: IEditorComponent | null = null;

  constructor() {
    super(
      "Countdown",
      "Nátlakový časovač, který zvyšuje konverzi, když se zobrazí na stránce.",
      "countdown",
      CgLock,
      [
        {
          id: "INITIAL_TIME",
          name: "Čas výprodeje",
          type: "NUMBER",
          value: 1000 * 60 * 60 * 24 * 3,
          visible: true,
        },
      ]
    );
  }

  render() {
    if (!this.timerComponent) {
      const rootComponent = this.rootComponent as RootComponent;
      if (!rootComponent) return <div>Root component not found</div>;
      const textComponent = rootComponent.getComponentById("text");
      if (!textComponent) return <div>Text component not found</div>;
      this.timerComponent = textComponent.clone();
      this.timerComponent.setRootComponent(rootComponent);
      this.timerComponent.getSetting("html_content")!.value = "Čas vyprší za: 72 : 00 : 00";
      rootComponent.addSubComponent(this.timerComponent);
    }
    return (
      <Countdown
        INITIAL_TIME={
          this.getSetting("INITIAL_TIME")
            ? (this.getSetting("INITIAL_TIME")?.value as number)
            : 1000 * 60 * 60 * 24 * 3
        }
        component={this}
        textComponent={this.timerComponent}
      />
    );
  }

  productionRender(): JSX.Element {
    return (
      <Countdown
        INITIAL_TIME={
          this.getSetting("INITIAL_TIME")
            ? (this.getSetting("INITIAL_TIME")?.value as number)
            : 1000 * 60 * 60 * 24 * 3
        }
        component={this}
        textComponent={this.timerComponent as IEditorComponent}
      />

    );
  }

  clone() {
    return new CountdownComponent();
  }
}

const Countdown = ({
  INITIAL_TIME = 1000 * 60 * 60 * 24 * 3,
  component,
  textComponent,
}: {
  INITIAL_TIME: number;
  component: IEditorComponent;
  textComponent?: IEditorComponent;
}) => {
  const STORAGE_KEY = "countdown-timer";

  const [timeLeft, setTimeLeft] = useState(() => {
    const storedTime = localStorage.getItem(STORAGE_KEY);
    if (storedTime) {
      const remainingTime = parseInt(storedTime, 10) - Date.now();
      return remainingTime > 0 ? remainingTime : INITIAL_TIME;
    }
    return INITIAL_TIME;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1000;
        if (newTime <= 0) {
          clearInterval(interval);
          localStorage.removeItem(STORAGE_KEY);
          return 0;
        }
        localStorage.setItem(STORAGE_KEY, (Date.now() + newTime).toString());
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log("update")
    if (textComponent) {
      console.log("updatesss")
      textComponent.updateSetting("html_content", `Čas vyprší za: ${formatTime(timeLeft)}`);
      textComponent.rootComponent?.getUpdateMethod()(textComponent);
    }
  }, [timeLeft]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")} : ${minutes
      .toString()
      .padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`;
  };

  return (
    component.subComponents.length &&
    component.subComponents.map((subComponent) => subComponent.render())
  );
};
