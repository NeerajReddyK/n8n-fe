import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Workflow } from "./routes/Workflow";
import { Home } from "./routes/Home";
import { WorkflowsList } from "./routes/WorkflowsList";
import { CredentialsList } from "./routes/CredentialsList";
import { Credential } from "./routes/Credential";
import { Layout } from "./Layout";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/home" element={<Home />}>
          <Route index element={<Navigate to="workflows" replace />} />
          <Route path="workflows" element={<WorkflowsList />} />
          <Route path="credentials" element={<CredentialsList />} />
        </Route>
        <Route path="/workflow/:workflowId" element={<Workflow />} />
        <Route path="/credential/:credentialId" element={<Credential />} />
      </Route>
    </Routes>
  );
}

export default App;
