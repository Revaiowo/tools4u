import React from "react";

function Service() {
  return (
    <section id="services" className="mt-24 text-center px-6 md:px-20 relative">
      <h2 className="text-4xl md:text-5xl font-bold text-amber-300 mb-6">
        Our Services
      </h2>

      <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-12">
        Explore a wide range of easy-to-use tools designed to make your digital
        life simpler. From image converters to document tools. Tools4U has
        everything you need.
      </p>

      {/* Glassmorphism Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto relative z-10">
        {/* Card 1 */}
        <div className="backdrop-blur-lg bg-white/10 border border-amber-300/20 rounded-2xl p-8 shadow-[0_0_25px_-10px_rgba(251,191,36,0.3)] hover:shadow-[0_0_30px_-5px_rgba(251,191,36,0.5)] transition-all duration-300">
          <h3 className="text-2xl font-semibold text-amber-200 mb-3">
            🖼️ Image Conversion
          </h3>
          <p className="text-gray-300">
            Convert images between PNG, JPG, and WebP formats effortlessly with
            perfect quality preservation.
          </p>
        </div>

        {/* Card 2 */}
        <div className="backdrop-blur-lg bg-white/10 border border-amber-300/20 rounded-2xl p-8 shadow-[0_0_25px_-10px_rgba(251,191,36,0.3)] hover:shadow-[0_0_30px_-5px_rgba(251,191,36,0.5)] transition-all duration-300">
          <h3 className="text-2xl font-semibold text-amber-200 mb-3">
            📄 Image to PDF
          </h3>
          <p className="text-gray-300">
            Turn your images into clean, professional-looking PDF documents with
            just a few clicks.
          </p>
        </div>

        {/* Card 3 */}
        <div className="backdrop-blur-lg bg-white/10 border border-amber-300/20 rounded-2xl p-8 shadow-[0_0_25px_-10px_rgba(251,191,36,0.3)] hover:shadow-[0_0_30px_-5px_rgba(251,191,36,0.5)] transition-all duration-300">
          <h3 className="text-2xl font-semibold text-amber-200 mb-3">
            🔁 PDF to Image
          </h3>
          <p className="text-gray-300">
            Extract high-quality images from any PDF instantly — perfect for
            documents, slides, or reports.
          </p>
        </div>

        {/* Card 4 */}
        <div className="backdrop-blur-lg bg-white/10 border border-amber-300/20 rounded-2xl p-8 shadow-[0_0_25px_-10px_rgba(251,191,36,0.3)] hover:shadow-[0_0_30px_-5px_rgba(251,191,36,0.5)] transition-all duration-300">
          <h3 className="text-2xl font-semibold text-amber-200 mb-3">
            📦 File Compression
          </h3>
          <p className="text-gray-300">
            Shrink your images or PDFs without losing clarity — optimized for
            speed and file size.
          </p>
        </div>

        {/* Card 5 */}
        <div className="backdrop-blur-lg bg-white/10 border border-amber-300/20 rounded-2xl p-8 shadow-[0_0_25px_-10px_rgba(251,191,36,0.3)] hover:shadow-[0_0_30px_-5px_rgba(251,191,36,0.5)] transition-all duration-300">
          <h3 className="text-2xl font-semibold text-amber-200 mb-3">
            ✂️ File Merge & Split
          </h3>
          <p className="text-gray-300">
            Combine multiple PDFs or separate specific pages with precision and
            ease.
          </p>
        </div>

        {/* Card 6 */}
        <div className="backdrop-blur-lg bg-white/10 border border-amber-300/20 rounded-2xl p-8 shadow-[0_0_25px_-10px_rgba(251,191,36,0.3)] hover:shadow-[0_0_30px_-5px_rgba(251,191,36,0.5)] transition-all duration-300">
          <h3 className="text-2xl font-semibold text-amber-200 mb-3">
            🧾 Text Extraction
          </h3>
          <p className="text-gray-300">
            Extract text from images or PDFs using smart OCR technology —
            accurate, fast, and reliable.
          </p>
        </div>
      </div>

      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-linear-to-t from-yellow-900/10 to-transparent blur-3xl -z-10"></div>
    </section>
  );
}

export default Service;
