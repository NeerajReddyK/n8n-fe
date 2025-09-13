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
import { useCallback, useState } from "react";
import { TelegramNode } from "./telegramNode";
import { GmailNode } from "./gmailNode";

const nodeTypes = {
  telegramNode: TelegramNode,
  gmailNode: GmailNode,
};

const initialNodes: Node[] = [
  {
    id: "1",
    data: { label: "Telegram" },
    type: "telegramNode",
    position: { x: 5, y: 10 },
  },
  {
    id: "2",
    data: { label: "Telegram 2" },
    type: "gmailNode",
    position: { x: 5, y: 100 },
  },
  {
    id: "3",
    data: { label: "Telegram 3" },
    position: { x: 500, y: 100 },
  },
];

const initialEdges: Edge[] = [
  {
    id: "1-2",
    source: "1",
    target: "2",
  },
];

export const Flow = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

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
