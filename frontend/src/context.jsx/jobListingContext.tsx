import { JobListing } from "@/types/jobListing";
import { ReactNode, useContext, useState } from "react";
import { createContext } from "react"; // Correct import for createContext

interface JobListingContextType {
  jobAttributes: JobListing | null;
  setJobAttributes: React.Dispatch<React.SetStateAction<JobListing | null>>; // setter function
}

export const JobListingContext = createContext<JobListingContextType | null>(
  null
);

export const useJobListing = () =>
  useContext(JobListingContext) as JobListingContextType;

const JobListingProvider = ({ children }: { children: ReactNode }) => {
  const [jobAttributes, setJobAttributes] = useState<JobListing | null>(null);

  return (
    <JobListingContext.Provider value={{ jobAttributes, setJobAttributes }}>
      {children}
    </JobListingContext.Provider>
  );
};

export default JobListingProvider;
