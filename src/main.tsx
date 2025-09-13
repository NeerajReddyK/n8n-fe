import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="absolute inset-0 h-full w-full bg-neutral-800 bg-[radial-gradient(#78716c_1px,transparent_1px)] [background-size:16px_16px]">
      <App />
    </div>
  </StrictMode>
);
