import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { PhotoIcon } from "@heroicons/react/24/outline";

interface ImageUploadDropzoneProps {
  onImageUpload: (file: File) => void;
}

const ImageUploadDropzone: React.FC<ImageUploadDropzoneProps> = ({
  onImageUpload,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0 && acceptedFiles[0].type === "image/png") {
        onImageUpload(acceptedFiles[0]);
      } else {
        alert("Please upload a PNG file");
      }
    },
    [onImageUpload],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    onDragEnter: () => {},
    onDragOver: () => {},
    onDragLeave: () => {},
  });

  const inputProps =
    getInputProps() as React.InputHTMLAttributes<HTMLInputElement>;

  return (
    <div
      {...getRootProps()}
      className="flex flex-col items-center justify-center border-2 border-black bg-white rounded-lg w-[190px] h-[190px] cursor-pointer"
    >
      <input {...inputProps} />
      <PhotoIcon className="text-gray-500 w-16 h-16 mb-2" />
    </div>
  );
};

export default ImageUploadDropzone;
