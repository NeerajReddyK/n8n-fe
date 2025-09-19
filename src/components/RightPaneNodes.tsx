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
  const nodes = [
    {
      title: "Telegram",
      description: "Available: Trigger and Action",
      onclick: () => "",
    },
    {
      title: "Gmail",
      description: "Available: Action only",
      onclick: () => "",
      // onclick should be changed.
    },
  ];

  return (
    <div className="space-y-3">
      {nodes.map((node, index) => (
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
