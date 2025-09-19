import { useState } from "react";
import { RightPaneNodes } from "./RightPaneNodes";
import { RightPaneCredentials } from "./RightPaneCredentials";

type activeTabType = "nodes" | "credentials";

export const RightPane = ({
  setNodeButton,
}: {
  setNodeButton: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [activeTab, setActiveTab] = useState<activeTabType>("nodes");

  return (
    <div className="absolute right-1 h-[80vh] top-[12vh] z-20 text-white w-[25vw] bg-neutral-600 rounded-md">
      <div className="flex items-center justify-end pr-[2vw]">
        <button className="cursor-pointer" onClick={() => setNodeButton(false)}>
          close
        </button>
      </div>
      <div className="border border-neutral-800 m-2 flex flex-col gap-2 py-2 px-1">
        <div className="flex items-center justify-between w-2/3 mx-auto ">
          <button
            onClick={() => setActiveTab("nodes")}
            className={`hover:text-[#FF6F5C] cursor-pointer pb-1 px-4 ${
              activeTab === "nodes"
                ? "border-b-3 border-[#FF6F5C] text-[#FF6F5C]"
                : ""
            }`}
          >
            Nodes
          </button>

          <button
            onClick={() => setActiveTab("credentials")}
            className={`hover:text-[#FF6F5C] cursor-pointer pb-1 px-4 ${
              activeTab === "credentials"
                ? "border-b-3 border-[#FF6F5C] text-[#FF6F5C]"
                : ""
            }`}
          >
            Credentials
          </button>
        </div>

        {/* depends on the activeTab */}
        <div className="mx-auto border border-black w-full">
          {activeTab === "nodes" ? (
            <RightPaneNodes />
          ) : (
            <RightPaneCredentials />
          )}
        </div>
      </div>
    </div>
  );
};
