import { useContext } from "react";
import { NodesContext } from "../context/nodesContext";
import axios from "axios";
import { WorkflowIdContext } from "../context/workflowIdContext";

const HandleDeleteButton = ({ nodeId }: { nodeId: string }) => {
  const { setNodes } = useContext(NodesContext)!;
  const { workflowId } = useContext(WorkflowIdContext)!;
  const handleDelete = async (nodeId: string) => {
    setNodes((nodes) => nodes.filter((node) => node.id !== nodeId));
    try {
      const db = await axios.put(
        `${import.meta.env.VITE_BE_URL}workflow/delete/nodes/${workflowId}`,
        {
          deleteNode: { id: nodeId },
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
          },
        }
      );
      console.log("after updating backend: ", db);
    } catch (error) {
      console.log("error while updating backend: ", error);
    }
  };
  return (
    <button
      className="absolute -top-6 right-5 rounded-full"
      onClick={() => handleDelete(nodeId)}
    >
      trash icon here
    </button>
  );
};

export default HandleDeleteButton;
