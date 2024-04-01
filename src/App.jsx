import { useState } from "react";
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
  { style: "watercolor", name: "watercolor" },
  { style: "rectangles", name: "rectangles" },
  { style: "circle", name: "circle" },
  { style: "waves", name: "waves" },
  { style: "lines", name: "lines" },
  { style: "flow", name: "flow" },
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
      <div className="flex items-center gap-3 flex-col justify-between content-between my-6 px-6">
        <div className="flex gap-3 justify-center">
          <a
            className="text-gray-900 text-sm hover:text-gray-400 bg-white px-2 py-1"
            href="https://samfort.in/"
          >
            samfort.in
          </a>
          <a
            className="text-gray-900 text-sm hover:text-gray-400 bg-white px-2 py-1"
            href="https://linktr.ee/sam.fortin"
          >
            linktr.ee
          </a>
        </div>
        <h1 className="text-6xl inline-block bg-white px-2">Sam Fortin</h1>
      </div>
      <ul className="flex gap-4 justify-center mb-7 flex-wrap">
        {artStyles.map((artStyle) => (
          <li key={artStyle.style}>
            <button
              className={`bg-white tracking-widest text-gray-400 hover:text-gray-900 px-2 py-1 border-dotted border-2 ${
                artStyle.style === selectedArtStyle
                  ? "border-gray-900 text-gray-900"
                  : "border-gray-400"
              }`}
              onClick={() => setSelectedArtStyle(artStyle.style)}
            >
              {artStyle.name}
            </button>
          </li>
        ))}
      </ul>
      {renderArtComponent()}
    </>
  );
}

export default App;
