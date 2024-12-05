import { useEffect, useState } from "react";

export default function LoadingComponent() {
  const loadingTexts = [
    "Wow, není tohle zábava?",
    "Načítáme galaxie… chvíli to potrvá.",
    "Mícháme digitální karty… ještě moment!",
    "Programujeme v šesti jazycích najednou.",
    "Chvíli strpení, AI si dává kávu.",
    "Ještě chvilku, ukládáme tvoje heslo do vesmíru.",
    "Načítání je umění… už jen pár pixelů.",
    "Zatím si přečti manuál… oh wait, žádný není.",
    "Proč taková rychlost? Mám jen jednu botu!",
    "Stahujeme internet… bude to hned.",
    "Přemýšlíme nad něčím chytrým… ještě chvíli.",
    "Zpracováváme data z Marsu, hned jsme zpět.",
  ];

  const [loadingText, setLoadingText] = useState<string>();

  useEffect(() => {
    setLoadingText(
      loadingTexts[Math.floor(Math.random() * loadingTexts.length)],
    );
  }, []);

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-neutral-800 p-4">
      <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-white uppercase">
        Vytvorkonverzku
      </h1>
      <p className="text-sm text-neutral-400">{loadingText}</p>
    </div>
  );
}
