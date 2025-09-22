import { Handle, Position } from "@xyflow/react";
import { TelegramSvg } from "../svg/telegramSvg";

export const TelegramAction = () => {
  return (
    <>
      <Handle type="source" position={Position.Left} />
      <Handle type="target" position={Position.Right} />
      <div className="bg-neutral-700 w-24 h-24 flex items-center justify-center border border-white rounded-lg">
        <TelegramSvg />
      </div>
    </>
  );
};

export const TelegramTrigger = () => {
  return (
    <>
      <Handle type="target" position={Position.Right} />
      <div className="bg-neutral-700 w-24 h-24 flex items-center justify-center border border-white rounded-lg rounded-l-4xl">
        <TelegramSvg />
      </div>
    </>
  );
};
