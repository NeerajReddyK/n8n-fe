import "./App.css";
import { Flow } from "./components/canvas";

function App() {
  return (
    <div className="flex">
      <div className=" text-white bg-neutral-700 w-[15vw] h-[100vh] border-r border-r-neutral-600 p-2">
        <span className=" text-2xl flex items-center justify-center mt-3">
          Left Pane
        </span>
      </div>
      <div>
        <div className="w-full text-white h-[10vh] bg-neutral-700 border-b border-b-neutral-600">
          <span className="flex items-center pl-5 text-2xl justify-left h-full">
            Header
          </span>
        </div>
        <div className="flex">
          <div
            style={{ width: "85vw", height: "90vh" }}
            className="border border-red-500"
          >
            <Flow />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
