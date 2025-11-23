import { ConversionState } from "@/app/actions/convertImage";
import { Download } from "lucide-react";

function DownloadFile({
  state,
  showResult,
}: {
  state: ConversionState | null;
  showResult: boolean;
}) {
  const handleDownload = () => {
    if (!state?.convertedFile) return;

    const { data, filename, mimeType } = state.convertedFile;
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
    <div className="">
      {/* Conversion result */}
      {showResult && state && (
        <div className="min-w-[150px] max-w-2xl bg-linear-to-br from-gray-900/90 to-gray-800/90 border-2 border-amber-400 rounded-xl p-6 md:p-8 backdrop-blur-sm shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          {state.success ? (
            <div className="flex flex-col items-center gap-6">
              <div className="w-20 h-20 bg-linear-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <div className="text-center">
                <p className="text-green-400 text-xl md:text-2xl font-bold mb-2">
                  {state.message}
                </p>
                {state.convertedFile && (
                  <div className="bg-gray-950/50 rounded-lg p-4 border border-green-400/30 mt-4">
                    <p className="text-gray-300 text-sm md:text-lg font-medium">
                      {state.convertedFile.filename}
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={handleDownload}
                className="w-full max-w-md h-14 flex items-center justify-center gap-3 bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-xl font-bold rounded-xl transition-all duration-300 shadow-lg shadow-green-600/30 hover:shadow-xl hover:shadow-green-600/50 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download size={28} />
                <span>Download File</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-6">
              <div className="w-20 h-20 bg-linear-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-500/50">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>

              <div className="text-center">
                <p className="text-red-400 text-lg md:text-2xl font-bold mb-2">
                  {state.message}
                </p>
                {state.error && (
                  <p className="text-gray-400 text-base mt-2 bg-red-500/10 rounded-lg p-3 border border-red-500/30">
                    {state.error}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DownloadFile;
