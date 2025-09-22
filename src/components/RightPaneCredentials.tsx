import { useState } from "react";
import { NodeItem, type NodeTypes } from "./RightPaneNodes";
import axios from "axios";
import { useParams } from "react-router-dom";

export const RightPaneCredentials = () => {
  const [expandedCredential, setExpandedCredential] =
    useState<NodeTypes | null>(null);
  const [apiToken, setApiToken] = useState("");
  const { workflowId } = useParams();
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const credentials = [
    {
      title: "Telegram",
      description: "Requires: API Token",
      onclick: () => setExpandedCredential("telegram"),
    },
    {
      title: "Gmail",
      description: "Available: Oauth process",
      onclick: () => setExpandedCredential("gmail"),
    },
  ];

  const handleSendTelegramToken = async () => {
    if (!apiToken.trim()) {
      alert("please enter api token before sending");
      return;
    }
    try {
      setLoading(true);
      setMessage(null);
      const response = await axios.post(
        `${import.meta.env.VITE_BE_URL}validate/telegram`,
        {
          apiToken,
          workflowId,
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
          },
        }
      );
      setMessage(response.data.message || "validation successfull!");
    } catch (error: any) {
      console.error("error while validating api token: ", error);
      setMessage(error.response.data.message || "validation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3 relative">
      {credentials.map((creds, index) => (
        <NodeItem
          key={index}
          title={creds.title}
          description={creds.description}
          onclick={creds.onclick}
        />
      ))}
      {expandedCredential && expandedCredential === "telegram" && (
        <div className="absolute bg-neutral-600 text-neutral-200 top-[0vh] right-[0vw] border border-neutral-200 px-2 h-[68vh] w-[23vw] ">
          <div className="flex py-2 justify-between">
            <h3 className="text-xl font-semibold">Telegram Triggers</h3>
            <p
              className="cursor-pointer text-[#FF6F5C]"
              onClick={() => setExpandedCredential(null)}
            >
              back
            </p>
          </div>
          <div className="space-y-2">
            <label>API Token</label>
            <input
              type="text"
              placeholder="Enter API Token from BotFather"
              onChange={(e) => setApiToken(e.target.value)}
              className="w-full border border-neutral-400 rounded-sm px-2 py-1 mt-2"
            />
            <button
              className="bg-[#FF6F5C] text-neutral-200 px-2 py-1 rounded-sm cursor-pointer"
              onClick={() => handleSendTelegramToken()}
            >
              {loading ? "validating..." : "validate"}
            </button>
            {message && <p className="mt-2 text-md">{message}</p>}
          </div>
        </div>
      )}
      {expandedCredential && expandedCredential === "gmail" && (
        <div className="absolute bg-neutral-600 text-neutral-200 top-[0vh] right-[0vw] border border-neutral-200 px-2 h-[68vh] w-[23vw]">
          <div className="flex py-2 justify-between">
            <h3 className="text-xl font-semibold">Gmail Credentials</h3>
            <p
              className="cursor-pointer text-[#FF6F5C]"
              onClick={() => setExpandedCredential(null)}
            >
              back
            </p>
          </div>

          <div className="space-y-4 mt-2">
            <p className="text-sm text-neutral-300">
              To connect Gmail, you need to authorize with Google.
            </p>

            <button
              className="bg-[#FF6F5C] text-neutral-200 px-2 py-1 rounded-sm cursor-pointer w-full"
              onClick={() => {
                const token = import.meta.env.VITE_TOKEN;
                window.location.href = `${
                  import.meta.env.VITE_BE_URL2
                }auth/oauth?token=${token}`;
              }}
            >
              Connect Gmail
            </button>

            {loading && (
              <p className="mt-2 text-sm">Redirecting to Google...</p>
            )}
            {message && <p className="mt-2 text-md">{message}</p>}
          </div>
        </div>
      )}
    </div>
  );
};
