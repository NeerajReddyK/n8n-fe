import { Navigate, useParams } from "react-router-dom";
import { Canvas } from "../components/canvas";

type ParamsType = {
  workflowId: string;
};
export const Workflow = () => {
  const { workflowId } = useParams<ParamsType>();

  if (!workflowId) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="h-full w-full bg-neutral-800 bg-[radial-gradient(#78716c_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="h-[10vh] text-white bg-neutral-700">Header</div>
      <div
        style={{ width: "85vw", height: "90vh" }}
        className="border border-red-500"
      >
        <Canvas workflowId={workflowId} />
      </div>
    </div>
  );
};
