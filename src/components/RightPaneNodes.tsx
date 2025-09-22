import { useParams } from "react-router-dom";
import { TelegramOnClick } from "../onclicks/TelegramOnClick";
import { useContext } from "react";
import { NodesContext } from "../context/nodesContext";
import { GmailOnClick } from "../onclicks/GmailOnClick";

export type NodeItemProps = {
  title: string;
  description: string;
  onclick: () => void;
};

export const NodeItem = ({ title, description, onclick }: NodeItemProps) => (
  <div className=" py-1 px-2 hover:border-l-1">
    <h3
      className="text-xl font-semibold text-neutral-200 hover: cursor-pointer "
      onClick={onclick}
    >
      {title}
    </h3>
    <p className="text-neutral-300 hover: cursor-default text-sm">
      {description}
    </p>
  </div>
);

export type NodeTypes = "telegram" | "gmail";

export const RightPaneNodes = () => {
  const { workflowId } = useParams();
  const { nodes, setNodes } = useContext(NodesContext)!;
  if (!workflowId) {
    console.log(
      "user should be redirected to home/workflows. This shouldn't happen ideally"
    );
    return;
  }

  const nodesAvailable = [
    {
      title: "Telegram Trigger",
      description: "Available: Trigger and Action",
      onclick: () =>
        TelegramOnClick({
          workflowId,
          nodes,
          setNodes,
          type: "telegramTrigger",
        }),
    },
    {
      title: "Gmail Trigger",
      description: "Available: Trigger and Action",
      onclick: () =>
        GmailOnClick({ workflowId, nodes, setNodes, type: "gmailTrigger" }),
    },
    {
      title: "Telegram Action",
      description: "Available: Trigger and Action",
      onclick: () =>
        TelegramOnClick({
          workflowId,
          nodes,
          setNodes,
          type: "telegramAction",
        }),
    },
    {
      title: "Gmail Action",
      description: "Available: Trigger and Action",
      onclick: () =>
        GmailOnClick({ workflowId, nodes, setNodes, type: "gmailAction" }),
    },
  ];

  return (
    <div className="space-y-3">
      {nodesAvailable.map((node, index) => (
        <NodeItem
          key={index}
          title={node.title}
          description={node.description}
          onclick={node.onclick}
        />
      ))}
    </div>
  );
};
