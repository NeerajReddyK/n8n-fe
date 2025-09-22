import type { Node } from "@xyflow/react";
import axios from "axios";
import uuid4 from "uuid4";

export const TelegramOnClick = async ({
  workflowId,
  nodes,
  setNodes,
  type,
}: {
  workflowId: string;
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  type: string;
}) => {
  try {
    const token = `${import.meta.env.VITE_TOKEN}`;
    const id = uuid4();
    const newNode = {
      id: id,
      data: {
        label: "telegramNode",
      },
      type,
      position: { x: 200, y: 200 },
    };
    setNodes([...nodes, newNode]);
    await axios.put(
      `${import.meta.env.VITE_BE_URL}workflow/update/nodes/${workflowId}`,
      {
        newNode,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log("error while adding node to backend: ", error);
  }
};
