import { inject } from "@vercel/analytics";
import Circle from "./components/Circle";

function App() {
  inject();

  return (
    <>
      <div className="">
        <h1 className="px-4 mt-5 mb-2 text-4xl flex justify-center tracking-widest">
          Sam Fortin
        </h1>
        <div className="flex justify-center mb-5">
          <a
            className="text-gray-400 text-sm hover:text-gray-900"
            href="https://linktr.ee/sam.fortin"
          >
            linktr.ee
          </a>
        </div>
      </div>
      <Circle />
    </>
  );
}

export default App;
