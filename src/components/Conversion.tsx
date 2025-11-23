"use client";

import React, {
  useActionState,
  useRef,
  startTransition,
  useEffect,
  useState,
} from "react";
import { Cog, Download, Loader2, File as FileIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { convertImage, ConversionState } from "@/app/actions/convertImage";
import { conversionModes } from "@/lib/utils";

interface ConversionProps {
  files: File[];
  state: ConversionState | null;
  formAction: (formData: FormData) => void;
  isPending: boolean;
  showResult: boolean;
  setShowResult: React.Dispatch<React.SetStateAction<boolean>>;
}

const Conversion: React.FC<ConversionProps> = ({
  files,
  state,
  formAction,
  isPending,
  showResult,
  setShowResult,
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [localMode, setLocalMode] = useState<string>("");
  const [fileExtension, setFileExtension] = useState<string>("");

  // Get file extension and reset state when new files are uploaded
  useEffect(() => {
    if (files.length > 0) {
      const ext = files[0].name.split(".").pop()?.toLowerCase() || "";
      setFileExtension(ext);
      setLocalMode("");
      setShowResult(false);
    }
  }, [files]);

  // Filter conversion modes based on file extension
  const getFilteredModes = () => {
    return conversionModes
      .map((category) => ({
        ...category,
        modes: category.modes.filter((mode) => {
          // Show modes that match the file extension or are generic (like 'image')
          return mode.from === fileExtension || mode.from === "image";
        }),
      }))
      .filter((category) => category.modes.length > 0); // Remove empty categories
  };

  const filteredModes = getFilteredModes();

  // Show result when state changes after conversion
  useEffect(() => {
    if (state !== null && !isPending) {
      setShowResult(true);
    }
  }, [state, isPending]);

  const handleModeChange = (value: string) => {
    setLocalMode(value);
  };

  const handleConvert = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!localMode) {
      alert("Please select a conversion mode");
      return;
    }

    if (files.length === 0) {
      alert("Please select a file");
      return;
    }

    // Create FormData and submit within transition
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("mode", localMode);

    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {!showResult && (
        <form
          ref={formRef}
          onSubmit={handleConvert}
          className="w-full px-6 md:px-0 max-w-2xl flex flex-col items-center gap-6"
        >
          {/* File preview */}
          {files.length > 0 && (
            <div className="w-full bg-linear-to-br from-gray-900/80 to-gray-800/80 border-2 border-amber-400/30 rounded-xl p-6 backdrop-blur-sm shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <FileIcon className="text-amber-400" size={24} />
                <h3 className="text-xl font-semibold text-amber-200">
                  Selected File
                </h3>
              </div>
              <div className="bg-gray-950/50 rounded-lg p-4 border border-amber-400/20">
                <p className="text-gray-200 font-medium text-lg truncate">
                  {files[0].name}
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Size: {(files[0].size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
          )}

          {/* Mode Selection */}
          {files.length > 0 && (
            <div className="w-full bg-linear-to-br from-gray-900/80 to-gray-800/80 border-2 border-amber-400/30 rounded-xl p-6 backdrop-blur-sm shadow-xl ">
              <h2 className="text-2xl font-bold text-start text-amber-200 mb-4 flex items-center  gap-2">
                <Cog className="text-amber-400" size={28} />
                Conversion Mode
              </h2>
              <Select onValueChange={handleModeChange} value={localMode}>
                <SelectTrigger className="w-full h-12 bg-gray-950/70 text-amber-100 border-2 border-amber-400/50 hover:border-amber-400 transition-colors text-lg font-medium">
                  <SelectValue placeholder="Select conversion type..." />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 text-amber-100 border-2 border-amber-400 max-h-96 overflow-y-auto">
                  {filteredModes.length > 0 ? (
                    filteredModes.map((category) => (
                      <div key={category.category}>
                        <div className="px-3 py-2 text-sm font-bold text-amber-300 bg-gray-800 sticky top-0 flex items-center gap-2 z-10">
                          <span>{category.icon}</span>
                          <span>{category.category}</span>
                        </div>
                        {category.modes.map((mode) => (
                          <SelectItem
                            key={mode.value}
                            value={mode.value}
                            className="text-base py-3 cursor-pointer hover:bg-amber-500/10 focus:bg-amber-500/20 focus:text-amber-200"
                          >
                            {mode.label}
                          </SelectItem>
                        ))}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-center text-gray-400">
                      <p>No conversions available for .{fileExtension} files</p>
                    </div>
                  )}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Conversion button */}
          {files.length > 0 && localMode && (
            <button
              type="submit"
              disabled={isPending}
              className="w-full max-w-md h-16 text-2xl font-bold bg-linear-to-r from-red-500 via-red-600 to-red-500 text-white transition-all duration-300 hover:from-red-600 hover:via-red-700 hover:to-red-600 rounded-xl flex items-center justify-center gap-3 shadow-[0_0_30px_-5px_rgba(239,68,68,0.5)] hover:shadow-[0_0_40px_-5px_rgba(239,68,68,0.7)] disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isPending ? (
                <>
                  <Loader2 size={32} className="animate-spin" />
                  <span>Converting...</span>
                </>
              ) : (
                <>
                  <Cog size={32} />
                  <span>Convert Now</span>
                </>
              )}
            </button>
          )}
        </form>
      )}
    </div>
  );
};

export default Conversion;
