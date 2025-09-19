import { useState } from "react";
import { NodeItem, type NodeTypes } from "./RightPaneNodes";

export const RightPaneCredentials = () => {
  const [expandedCredential, setExpandedCredential] =
    useState<NodeTypes | null>(null);
  const credentials = [
    {
      title: "Telegram",
      description: "Requires: API Token",
      onclick: () => setExpandedCredential("telegram"),
    },
    {
      title: "Gmail",
      description: "Available: Oauth process",
      onclick: () => setExpandedCredential("gmail"),
    },
  ];

  return (
    <div className="space-y-3">
      {credentials.map((creds, index) => (
        <NodeItem
          key={index}
          title={creds.title}
          description={creds.description}
          onclick={creds.onclick}
        />
      ))}
      {expandedCredential && expandedCredential === "telegram" && (
        <div className="absolute bg-neutral-600 text-neutral-200 mx-2 top-[0vh] h-[68vh] w-[23vw] ">
          <div className="flex py-2 justify-between">
            <h3 className="text-xl font-semibold">Telegram Triggers</h3>
            <p
              className="cursor-pointer"
              onClick={() => setExpandedCredential(null)}
            >
              back
            </p>
          </div>
          <div className="space-y-2">
            <label>API Token</label>
            <input
              type="text"
              placeholder="Enter API Token from BotFather"
              className="w-full border border-neutral-400 rounded-sm px-2 py-1 mt-2"
            />
            <button className="">send</button>
          </div>
        </div>
      )}
    </div>
  );
};
