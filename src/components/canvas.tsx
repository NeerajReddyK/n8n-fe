import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Edge,
  type Node,
  type OnConnect,
  type OnEdgesChange,
  type OnNodeDrag,
  type OnNodesChange,
  ReactFlow,
} from "@xyflow/react";
import { useCallback, useEffect, useState } from "react";
import { TelegramNode } from "./telegramNode";
import { GmailNode } from "./gmailNode";
import axios from "axios";

const nodeTypes = {
  telegramNode: TelegramNode,
  gmailNode: GmailNode,
};

export const Canvas = ({ workflowId }: { workflowId: string }) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BE_URL}workflow/${workflowId}`,
          {
            headers: {
              Authorization: import.meta.env.VITE_TOKEN,
            },
          }
        );
        setNodes(response.data.workflow.nodes || []);
        // setEdges(response.data.workflow.edges || []);
      } catch (error) {
        console.error("Error fetching workflow: ", error);
      }
    };
    fetchData();
  }, []);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes]
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => {
      setEdges((edges) => applyEdgeChanges(changes, edges));
    },
    [setEdges]
  );

  // this should change connections in the db as well. which means connections json should be updated with new state
  const onConnect: OnConnect = useCallback(
    (connection) => {
      setEdges((edge) => addEdge(connection, edge));
    },
    [setEdges]
  );

  const onNodeDragStop: OnNodeDrag = async (_, node) => {
    try {
      const updatedNodes = nodes.map((nd: Node) =>
        nd.id === node.id ? node : nd
      );

      axios.put(
        `${import.meta.env.VITE_BE_URL}workflow/${workflowId}`,
        {
          nodes: updatedNodes,
        },
        {
          headers: {
            Authorization: import.meta.env.VITE_TOKEN,
          },
        }
      );
    } catch (error) {
      console.error("Error updating the node on the backend: ", error);
    }
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      onConnect={onConnect}
      onNodeDragStop={onNodeDragStop}
    />
  );
};
