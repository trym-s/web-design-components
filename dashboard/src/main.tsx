import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { loadLiveCatalog } from "./registry";
import "./shell.css";

loadLiveCatalog()
  .catch((error) => console.warn(error))
  .finally(() => createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  ));
