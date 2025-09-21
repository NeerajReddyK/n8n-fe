import axios from "axios";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

type ActiveTabType = "workflows" | "credentials";

export const Home = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState<ActiveTabType>("workflows");
  const [createWorkflow, setCreateWorkflow] = useState(false);
  const [title, setTitle] = useState("");
  const createWorkflowOnClick = async () => {
    const token = `Bearer ${import.meta.env.VITE_TOKEN}`;
    console.log("logging token: ", token);
    const response = await axios.post(
      `${import.meta.env.VITE_BE_URL}workflow/`,
      {
        title,
        nodes: [],
        edges: [],
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    const workflowId = response.data.workflow.workflowId;
    navigate(`/workflow/${workflowId}`);
  };

  return (
    <div className="bg-neutral-800 h-screen text-white pt-4 px-20">
      <div className="flex justify-between items-baseline rounded-sm">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
          <span className="text-neutral-300 ">
            All the workflows and credentials you have access to
          </span>
        </div>
        <button
          className="cursor-pointer bg-[#FF6F5C] text-white py-1 px-2 rounded-sm"
          onClick={() => setCreateWorkflow(!createWorkflow)}
        >
          Create Workflow
        </button>
      </div>

      {/* When createWorkflow button is clicked i.e., when createWorkflow state is set to true */}
      {createWorkflow && (
        <div
          className="fixed inset-0 z-30 my-auto bg-neutral-700/2 backdrop-blur-xs flex items-center justify-center"
          onClick={() => setCreateWorkflow(false)}
        >
          <div
            className="bg-neutral-700 text-neutral-300 p-6 rounded-sm shadow-lg max-w-[45vw] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold text-center">
              Create Workflow
            </h2>
            <p className="mt-2 text-lg">Title of Workflow</p>
            <input
              type="text"
              placeholder="Enter title for workflow"
              id="titleInput"
              onChange={(e) => setTitle(e.target.value)}
              required
              className="block w-2/3 border border-neutral-500 px-2 py-1 rounded-sm mt-2 focus:outline-none focus:border-neutral-400"
            />
            <button
              className="mt-4 bg-[#FF6F5C] text-neutral-100 px-4 py-2 rounded hover:cursor-pointer"
              onClick={() => {
                setCreateWorkflow(false);
                createWorkflowOnClick();
              }}
            >
              Create
            </button>
          </div>
        </div>
      )}

      <div className="pt-8 flex gap-10">
        <h4
          className={`hover:text-[#FF6F5C] cursor-pointer pb-1 px-4 ${
            active === "workflows"
              ? "border-b-3 border-[#FF6F5C] text-[#FF6F5C]"
              : ""
          }`}
          onClick={() => {
            setActive("workflows");
            navigate("/home/workflows");
          }}
        >
          Workflows
        </h4>
        <h4
          className={`hover:text-[#FF6F5C] cursor-pointer pb-1 px-4 ${
            active === "credentials"
              ? "border-b-3 border-[#FF6F5C] text-[#FF6F5C]"
              : ""
          }`}
          onClick={() => {
            setActive("credentials");
            navigate("/home/credentials");
          }}
        >
          Credentials
        </h4>
      </div>
      <Outlet />
    </div>
  );
};
