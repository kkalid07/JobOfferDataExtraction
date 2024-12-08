import { useEffect, useState } from "react";
import { JobListing } from "../JobListingCard";
import axios from "axios";

export const useJobListingList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [jobs, setJobs] = useState<JobListing[] | null>(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8000/extraction/job-listings/")
      .then((res) => {
        setLoading(false);
        setJobs(res.data);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
        console.error("Error fetching job listings:", error);
      });
  }, []);

  return {
    loading,
    error,
    jobs,
  };
};
