"use client";

import React, {
  useActionState,
  useRef,
  startTransition,
  useEffect,
  useState,
} from "react";
import { Cog, Download, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { convertImage, ConversionState } from "@/app/actions/convertImage";

function Conversion({
  files,
  setFiles,
}: {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}) {
  const [state, formAction, isPending] = useActionState<
    ConversionState | null,
    FormData
  >(convertImage, null);
  const formRef = useRef<HTMLFormElement>(null);
  const [localMode, setLocalMode] = useState<string>("");
  const [currentFiles, setCurrentFiles] = useState<File[]>([]);
  const [showResult, setShowResult] = useState(false);

  // Reset state when new files are uploaded
  useEffect(() => {
    console.log(1);
    if (
      files.length > 0
      // JSON.stringify(files) !== JSON.stringify(currentFiles)
    ) {
      setCurrentFiles(files);
      setLocalMode("");
      setShowResult(false); // Hide previous results
    }
  }, [files, currentFiles]);

  // Show result when state changes after conversion
  useEffect(() => {
    if (state !== null) {
      setShowResult(true);
    }
  }, [state]);

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
    formData.append("file", files[0]); // For now, converting first file only
    formData.append("mode", localMode);

    startTransition(() => {
      formAction(formData);
    });
  };

  const handleDownload = () => {
    if (!state?.convertedImage) return;

    const { data, filename, mimeType } = state.convertedImage;
    const byteCharacters = atob(data);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {!showResult && (
        <form ref={formRef} onSubmit={handleConvert} className="contents">
          <div className="flex flex-col gap-5 md:flex-row md:w-180 md:justify-between items-center">
            {/* File list preview */}
            {files.length > 0 && (
              <div className="text-gray-200 md:text-lg text-center">
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

            {/* Mode Selection */}
            {files.length > 0 && (
              <div className="md:w-60 md:self-start">
                <h2 className="md:text-2xl font-semibold text-center text-amber-200 mb-2">
                  Choose a Conversion Mode
                </h2>
                <Select onValueChange={handleModeChange} value={localMode}>
                  <SelectTrigger className="w-full bg-gray-900 text-yellow-200 border border-yellow-400">
                    <SelectValue placeholder="Select mode..." />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 text-yellow-100 border border-yellow-400">
                    <SelectItem value="png-jpg">PNG → JPG</SelectItem>
                    <SelectItem value="jpg-png">JPG → PNG</SelectItem>
                    <SelectItem value="compress-img">Compress Image</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Conversion button */}
          {files.length > 0 && (
            <button
              type="submit"
              disabled={isPending || !localMode}
              className="text-2xl mt-2 font-semibold p-3 bg-red-500 text-foreground transition-all duration-300 hover:bg-red-600 rounded-xs flex items-center gap-2 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <Cog size={40} className="animate-spin" />
                  <span>Converting...</span>
                </>
              ) : (
                <>
                  <Cog size={40} />
                  <span>Convert</span>
                </>
              )}
            </button>
          )}
        </form>
      )}

      {/* Conversion result */}
      {showResult && state && (
        <div className="mt-6 p-4 rounded-lg border-2 border-yellow-400 bg-gray-900/50">
          {state.success ? (
            <div className="flex flex-col items-center gap-4">
              <p className="text-green-400 text-lg font-semibold">
                ✓ {state.message}
              </p>
              {state.convertedImage && (
                <>
                  <div className="text-gray-300">
                    <p className="font-semibold mb-2">Converted file:</p>
                    <p className="text-gray-400">
                      {state.convertedImage.filename}
                    </p>
                  </div>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-300 hover:cursor-pointer"
                  >
                    <Download size={24} />
                    <span>Download Converted Image</span>
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-red-400 text-lg font-semibold">
                ✗ {state.message}
              </p>
              {state.error && (
                <p className="text-gray-400 text-sm mt-2">{state.error}</p>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Conversion;
