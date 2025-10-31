"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Cog } from "lucide-react";

function FileUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedMode, setSelectedMode] = useState<string>("");

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
      setFiles(Array.from(e.target.files));
    }
  };

  console.log(files);

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
          className="text-xl font-bold bg-yellow-200 text-gray-900 hover:bg-yellow-300 transition-all duration-300 hover:cursor-pointer"
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
      <div className="flex flex-col gap-5 md:flex-row md:w-180 md:justify-between items-center">
        {/* File list preview */}
        {files.length > 0 && (
          <div className=" text-gray-200 md:text-lg text-center">
            <p className="font-semibold mb-2">Selected files:</p>
            <ul className="list-disc list-inside text-gray-400">
              {files.map((file, index) => (
                <li key={index}>
                  {file.name} ({(file.size / 1024).toFixed(2)} KB)
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* --- Mode Selection --- */}
        {files.length > 0 && (
          <div className=" md:w-60 md:self-start">
            <h2 className="md:text-2xl font-semibold text-center text-amber-200 mb-2">
              Choose a Conversion Mode
            </h2>
            <Select onValueChange={(value) => setSelectedMode(value)}>
              <SelectTrigger className="w-full bg-gray-900 text-yellow-200 border border-yellow-400">
                <SelectValue placeholder="Select mode..." />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 text-yellow-100 border border-yellow-400">
                <SelectItem value="png-jpg">PNG → JPG</SelectItem>
                <SelectItem value="jpg-png">JPG → PNG</SelectItem>
                <SelectItem value="img-pdf">Image → PDF</SelectItem>
                <SelectItem value="pdf-img">PDF → Image</SelectItem>
                <SelectItem value="compress-img">Compress Image</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Conversion button */}
      {files.length > 0 && (
        <button
          className="text-2xl mt-2 font-semibold p-3  bg-red-500 text-foreground transition-all duration-300 hover:bg-red-600 rounded-xs flex items-center gap-2 hover:cursor-pointer"
          disabled={!selectedMode}
        >
          <Cog size={40} />
          <span>Convert</span>
        </button>
      )}
    </>
  );
}

export default FileUpload;
