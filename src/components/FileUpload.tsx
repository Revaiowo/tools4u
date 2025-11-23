"use client";

import React, { useActionState, useRef, useState } from "react";
import { Button } from "./ui/button";
import Conversion from "./Conversion";
import DownloadFile from "./DownloadFile";
import { convertImage, ConversionState } from "@/app/actions/convertImage";

function FileUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const [state, formAction, isPending] = useActionState<
    ConversionState | null,
    FormData
  >(convertImage, null);
  const [showResult, setShowResult] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(droppedFiles);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log("Files is added");
      setFiles(Array.from(e.target.files));
    }
  };

  // console.log("file is updated:", files);

  return (
    <>
      {/* Drag and drop files for desktop */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
            hidden md:flex md:flex-col w-180 h-80 justify-center items-center border-4 
            ${
              isDragging
                ? "border-amber-400 bg-yellow-900/10 shadow-[0_0_40px_-5px_rgba(251,191,36,0.6)]"
                : "border-amber-300"
            } 
            rounded-2xl bg-linear-to-b from-background to-black/40 transition-all duration-300 cursor-pointer
        `}
      >
        <span className="text-3xl font-semibold text-amber-200">
          Drag & Drop Your Files Here
        </span>
        <span className="text-gray-400 text-lg mt-2">
          or click below to upload
        </span>
      </div>

      {/* Add files for mobile */}
      <label className="">
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          multiple
        />
        <Button
          className="text-xl p-6 font-bold bg-yellow-200 text-gray-900 hover:bg-yellow-300 transition-all duration-300 hover:cursor-pointer"
          onClick={(e) => {
            const input = e.currentTarget
              .previousElementSibling as HTMLInputElement;
            input?.click();
          }}
        >
          Add a file
        </Button>
      </label>

      {/* File preview and conversion mode */}
      <Conversion
        files={files}
        state={state}
        formAction={formAction}
        isPending={isPending}
        showResult={showResult}
        setShowResult={setShowResult}
      />
      <DownloadFile state={state} showResult={showResult} />
    </>
  );
}

export default FileUpload;
