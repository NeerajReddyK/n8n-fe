import type { Edge, Node } from "@xyflow/react";
import { createContext } from "react";
interface NodeContextTypes {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  edges: Edge[];
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}
export const NodesContext = createContext<NodeContextTypes | null>(null);
