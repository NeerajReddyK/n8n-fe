import type { Node } from "@xyflow/react";
import axios from "axios";
import uuid4 from "uuid4";

export const GmailOnClick = async ({
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
      id,
      data: { label: "gmailNode" },
      type,
      position: { x: 250, y: 250 },
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
    console.error("error while updating backend: ", error);
  }
};
