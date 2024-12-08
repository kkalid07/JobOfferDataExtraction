import { useState } from "react";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import axios from "axios";
import { useJobListing } from "@/context.jsx/jobListingContext";

export const useFileLoader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { jobAttributes, setJobAttributes } = useJobListing();

  const handleSubmit = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    setLoading(() => true);
    setJobAttributes(() => null);
    axios
      .post("http://localhost:8000/extraction/job-listings/create/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setLoading(() => false);
        setJobAttributes(res.data);
      })
      .catch((error) => {
        setLoading(() => false);
        setError(() => true);
        console.error("Error uploading file:", error);
      });
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
    onDrop: (acceptedFiles: File[]) => {
      console.log(acceptedFiles);
      setFile(acceptedFiles[0]);
    },
  } as DropzoneOptions);
  return {
    getRootProps,
    getInputProps,
    handleSubmit,
    loading,
    error,
    jobAttributes,
    file,
  };
};
