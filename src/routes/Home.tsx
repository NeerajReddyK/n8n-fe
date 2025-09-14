import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

type ActiveTabType = "workflows" | "credentials";

export const Home = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState<ActiveTabType>("workflows");

  return (
    <div className="bg-neutral-800 h-screen text-white pt-4 px-20">
      <div className="flex justify-between items-baseline rounded-sm">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
          <span className="text-neutral-300 ">
            All the workflows and credentials you have access to
          </span>
        </div>
        <button className="cursor-pointer bg-[#FF6F5C] text-white py-1 px-2 rounded-sm">
          Create Workflow
        </button>
      </div>
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
