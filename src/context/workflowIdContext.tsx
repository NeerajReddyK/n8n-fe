import { createContext } from "react";

interface WorkflowIdTypes {
  workflowId: string;
}

export const WorkflowIdContext = createContext<WorkflowIdTypes | null>(null);
