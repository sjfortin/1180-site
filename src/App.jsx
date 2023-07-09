import { useEffect, useState } from "react";
import { inject } from "@vercel/analytics";
import Circle from "./components/Circle";
import Rectangles from "./components/Rectangles";
import Waves from "./components/Waves";

const artStyles = ["rectangles", "circle", "waves"];

function App() {
  inject();

  const [artStyle, setArtStyle] = useState(
    artStyles[Math.floor(Math.random() * artStyles.length)]
  );

  const handleArtChange = () => {
    let newArtStyle;
    do {
      newArtStyle = artStyles[Math.floor(Math.random() * artStyles.length)];
    } while (newArtStyle === artStyle);
    setArtStyle(newArtStyle);
  };

  return (
    <>
      <div className="">
        <h1 className="px-4 mt-5 text-4xl md:text-6xl flex justify-center tracking-widest">
          Sam Fortin
        </h1>
        <div className="flex justify-center my-3">
          <a
            className="text-gray-400 text-sm hover:text-gray-900"
            href="https://linktr.ee/sam.fortin"
          >
            linktr.ee
          </a>
        </div>
        <div className="flex justify-center mb-3">
          <button
            className="justify-center tracking-widest text-xl text-gray-400 hover:text-gray-900 px-4 py-1 border-dotted border-2 border-gray-400 hover:border-gray-900 text"
            onClick={handleArtChange}
          >
            shape change
          </button>
        </div>
      </div>
      {artStyle === "rectangles" ? (
        <Rectangles />
      ) : artStyle === "circle" ? (
        <Circle />
      ) : (
        <Waves />
      )}
    </>
  );
}

export default App;
