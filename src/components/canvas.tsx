import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Edge,
  type Node,
  type OnConnect,
  type OnEdgesChange,
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

const initialNodes: Node[] = [
  {
    id: "1",
    data: { label: "" },
    position: { x: 0, y: 0 },
  },
  //   {
  //     id: "2",
  //     data: { label: "Telegram 2" },
  //     type: "gmailNode",
  //     position: { x: 5, y: 100 },
  //   },
  //   {
  //     id: "3",
  //     data: { label: "Telegram 3" },
  //     position: { x: 500, y: 100 },
  //   },
];

const initialEdges: Edge[] = [
  {
    id: "",
    source: "",
    target: "",
  },
];

export const Canvas = ({ workflowId }: { workflowId: string }) => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

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
        console.log("----------");
        console.log(response.data.workflow.nodes);
        setNodes(response.data.workflow.nodes);
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

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      onConnect={onConnect}
    />
  );
};
