import { DropzoneRootProps, DropzoneInputProps } from "react-dropzone";
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useFileLoader } from "./useFileUploader";
import LoadingSpinner from "./LoadingSpinner";

const FileUploader = () => {
  const { getRootProps, getInputProps, handleSubmit, loading, file } =
    useFileLoader();
  return (
    <Card className="max-w-md mx-auto w-full p-5 shadow-lg space-y-5">
      <CardTitle className="text-xl font-bold mb-3">
        Upload the job offer file
      </CardTitle>
      <CardContent className="p-5 text-sm">
        <div
          {...(getRootProps({
            className:
              "dropzone border-2 border-dashed border-gray-400 rounded-md p-6 cursor-pointer hover:border-black transition-colors duration-300",
          }) as DropzoneRootProps)}
        >
          <input {...(getInputProps() as DropzoneInputProps)} />
          <p className="text-gray-600">
            {file
              ? "File uploaded successfully!"
              : "Drag 'n' drop a PDF file here, or click to select one"}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        {file && (
          <Button onClick={handleSubmit} disabled={loading} className="w-full">
            {loading && <LoadingSpinner />}
            Extract Data
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default FileUploader;
