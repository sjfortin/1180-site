import { useEffect, useState } from "react";
import { inject } from "@vercel/analytics";
import Circle from "./components/Circle";
import Rectangles from "./components/Rectangles";
import Waves from "./components/Waves";
import Lines from "./components/Lines";
import Flow from "./components/Flow";
import TreeRing from "./components/TreeRing";
import WaterColor from "./components/WaterColor";

const ArtComponents = {
  rectangles: Rectangles,
  circle: Circle,
  watercolor: WaterColor,
  waves: Waves,
  lines: Lines,
  flow: Flow,
  treering: TreeRing,
};

const artStyles = [
  { style: "flow", name: "flow" },
  { style: "watercolor", name: "watercolor" },
  { style: "rectangles", name: "rectangles" },
  { style: "circle", name: "circle" },
  { style: "waves", name: "waves" },
  { style: "lines", name: "lines" },
  { style: "treering", name: "tree ring" },
];

function App() {
  inject();

  const [selectedArtStyle, setSelectedArtStyle] = useState("");

  const renderArtComponent = () => {
    const Component = ArtComponents[selectedArtStyle];
    return Component ? <Component /> : null;
  };

  return (
    <>
      <div className="flex items-center flex-col md:flex-row gap-3 justify-between content-between py-3 px-6 bg-white">
        <h1 className="inline-block text-center">
          <a
            className="text-gray-900 hover:text-gray-400 text-xl tracking-widest"
            href="https://samfort.in/"
          >
            sf
          </a>
        </h1>
        <ul className="flex gap-2 justify-center flex-wrap">
          {artStyles.map((artStyle) => (
            <li key={artStyle.style}>
              <button
                className={`bg-white text-sm hover:bg-gray-100 px-3 py-1 border-dotted border-2 ${
                  artStyle.style === selectedArtStyle
                    ? "border-gray-900 bg-gray-100"
                    : "border-gray-400"
                }`}
                onClick={() => setSelectedArtStyle(artStyle.style)}
              >
                {artStyle.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {renderArtComponent()}
    </>
  );
}

export default App;
