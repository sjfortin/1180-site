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

  // Function to render the selected art component
  const renderArtComponent = () => {
    const Component = ArtComponents[selectedArtStyle];
    return Component ? <Component /> : null;
  };

  return (
    <>
      <div>
        <h1 className="px-4 mt-5 text-4xl md:text-6xl flex justify-center tracking-widest">
          Sam Fortin
        </h1>
        <div className="flex gap-3 justify-center my-3">
          <a
            className="text-gray-400 text-sm hover:text-gray-900"
            href="https://samfort.in/"
          >
            samfort.in
          </a>
          <a
            className="text-gray-400 text-sm hover:text-gray-900"
            href="https://linktr.ee/sam.fortin"
          >
            linktr.ee
          </a>
        </div>
      </div>
      <ul className="flex gap-4 justify-center mb-7 flex-wrap">
        {artStyles.map((artStyle) => (
          <li key={artStyle.style}>
            <button
              className={`justify-center tracking-widest text-gray-400 hover:text-gray-900 px-2 py-1 border-dotted border-2 ${
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
