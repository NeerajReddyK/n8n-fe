// this make a GET request to the backend and displays all the workflows created by a particular user.

import axios from "axios";
import { useEffect, useState } from "react";
import { ListCard } from "../components/ListCard";
import { useNavigate } from "react-router-dom";

export type MethodType = "POST" | "GET" | "PUT" | "DELETE";

export interface WebhookType {
  webhookId: string;
  title: string;
  method: MethodType;
  path: string;
  header: JSON;
  secret: string;
  workflowId: string;
}

export interface WorkflowType {
  workflowId: string;
  title: string;
  active: boolean;
  nodes: JSON[];
  edges: JSON[];
  email: string;
  createdAt: Date;
  updatedAt: Date;
  webhook: WebhookType;
}

export const WorkflowsList = () => {
  const [workflows, setWorkflows] = useState<WorkflowType[] | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BE_URL}workflow`,
          {
            headers: {
              Authorization: `${import.meta.env.VITE_TOKEN}`,
            },
          }
        );
        console.log(response.data.workflows);
        setWorkflows(response.data.workflows);
      } catch (error) {
        console.error("Error fetching workflows: ", error);
      }
    };
    fetchWorkflows();
  }, []);
  return (
    <div>
      {workflows?.map((workflow) => (
        <div className="cursor-pointer" key={workflow.workflowId}>
          <ListCard
            title={workflow.title}
            updatedAt={workflow.updatedAt}
            onClick={() => navigate(`/workflow/${workflow.workflowId}`)}
          />
        </div>
      ))}
      <div className="text-center">END</div>
    </div>
  );
};
