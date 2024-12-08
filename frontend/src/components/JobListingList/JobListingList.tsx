"use client";

import { useState } from "react";
import { useJobListingList } from "./useJobListingList";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import JobListingCard from "../JobListingCard";


const JobListingList = () => {
  const { error, jobs, loading } = useJobListingList();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredJobs = jobs?.filter(
    (job) =>
      job.job_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-screen-lg mx-auto  ">
      <div className="flex items-center mb-6">
        <Input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow mr-2 bg-transparent  border-white bg-white border-white"
        />
        <Button variant="outline">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
        
      </div>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-lg text-white">
            Loading job listings...
          </span>
        </div>
      )}

      {error && (
        <div className="flex justify-center items-center h-64 text-destructive">
          <AlertCircle className="h-8 w-8 mr-2 text-white" />
          <span className="text-lg">
            Error loading job listings. Please try again later.
          </span>
        </div>
      )}

      {!loading && !error && (
        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {filteredJobs?.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <JobListingCard job={job} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {!loading && !error && filteredJobs?.length === 0 && (
        <div className="text-center text-muted-foreground mt-8 text-white">
          No job listings found. Try adjusting your search.
        </div>
      )}
    </div>
  );
};

export default JobListingList;
