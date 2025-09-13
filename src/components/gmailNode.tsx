import { Handle, Position } from "@xyflow/react";
import { GmailSvg } from "../svg/gmailSvg";

export const GmailNode = () => {
  return (
    <>
      <Handle type="source" position={Position.Left} />
      <Handle type="target" position={Position.Right} />
      <div className="bg-neutral-700 w-24 h-24 flex items-center justify-center border border-white rounded-lg">
        <GmailSvg />
      </div>
    </>
  );
};
