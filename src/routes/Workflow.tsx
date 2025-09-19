import { Navigate, useParams } from "react-router-dom";
import { Canvas } from "../components/canvas";
import { useState } from "react";
import { RightPane } from "../components/RightPane";

type ParamsType = {
  workflowId: string;
};
export const Workflow = () => {
  const { workflowId } = useParams<ParamsType>();
  const [nodeButton, setNodeButton] = useState(false);

  if (!workflowId) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="h-full w-full bg-neutral-800 bg-[radial-gradient(#78716c_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="h-[10vh] text-white bg-neutral-700">Header</div>
      <button
        className="absolute top-[12vh] right-1 z-10 text-white bg-[#FF6F5C] border border-neutral-300 py-1 px-2 rounded-sm cursor-pointer"
        onClick={() =>
          nodeButton ? setNodeButton(false) : setNodeButton(true)
        }
      >
        add node
      </button>
      {nodeButton ? <RightPane setNodeButton={setNodeButton} /> : ""}
      <div
        style={{ width: "85vw", height: "90vh" }}
        className="border border-red-500"
      >
        <Canvas workflowId={workflowId} />
      </div>
    </div>
  );
};
