import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryCleint = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <>
    <QueryClientProvider client={queryCleint}>
      <App />
    </QueryClientProvider>
    <ToastContainer />
  </>,
);
