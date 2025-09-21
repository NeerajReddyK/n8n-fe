import type { Node } from "@xyflow/react";
import axios from "axios";
import uuid4 from "uuid4";

export const TelegramOnClick = async ({
  workflowId,
  nodes,
  setNodes,
}: {
  workflowId: string;
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
}) => {
  console.log("inside telegramonclick");
  try {
    const token = `${import.meta.env.VITE_TOKEN}`;
    const id = uuid4();
    console.log("nodes: ", nodes);
    console.log("Before axios request");
    const newNode = {
      id: id,
      data: {
        label: "telegramNode",
      },
      type: "telegramNode",
      position: { x: 200, y: 200 },
    };
    setNodes([...nodes, newNode]);
    const response = await axios.put(
      `${import.meta.env.VITE_BE_URL}workflow/update/nodes/${workflowId}`,
      {
        newNode: newNode,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("After completing request");
    console.log(response);
  } catch (error) {
    console.log("error while adding node to backend: ", error);
  }
};
