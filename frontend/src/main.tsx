import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import JobListingProvider from "./context.jsx/jobListingContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <JobListingProvider>
      <App />
    </JobListingProvider>
  </StrictMode>
);
