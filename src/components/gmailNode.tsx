import { Handle, Position } from "@xyflow/react";
import { GmailSvg } from "../svg/gmailSvg";
import { useState } from "react";
import HandleDeleteButton from "./handleDeleteButton";

export const GmailAction = ({ id }: { id: string }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative"
    >
      <Handle type="source" position={Position.Left} />
      <Handle type="target" position={Position.Right} />
      <div className="bg-neutral-700 w-24 h-24 flex items-center justify-center border border-white rounded-lg">
        <GmailSvg />
      </div>

      {hover && <HandleDeleteButton nodeId={id} />}
    </div>
  );
};

export const GmailTrigger = () => {
  return (
    <>
      <Handle type="target" position={Position.Right} />
      <div className="bg-neutral-700 w-24 h-24 flex items-center justify-center border border-white rounded-lg rounded-l-4xl">
        <GmailSvg />
      </div>
    </>
  );
};
