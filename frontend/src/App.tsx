import "./App.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useJobListing } from "./context.jsx/jobListingContext";
import FileUploader from "./components/FileUploader/FileUploader";
import JobListingCard from "./components/JobListingCard";
import JobListingList from "./components/JobListingList/JobListingList";

export default function Home() {
  const { jobAttributes } = useJobListing();

  return (
    <main
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/bg.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      <div className="relative z-10 pt-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-white">
          Job Data Extractor 
          </h1>

          <Tabs defaultValue="upload" className=" rounded-lg p-6">
            <TabsList className="max-w-md mx-auto grid w-full grid-cols-2">
              <TabsTrigger value="upload">Upload new Job</TabsTrigger>
              <TabsTrigger value="listings">All Jobs Listings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="my-6 space-y-5">
              <FileUploader />
              {jobAttributes && <JobListingCard job={jobAttributes} />}
            </TabsContent>

            <TabsContent value="listings" className="mt-6">
              <JobListingList />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
