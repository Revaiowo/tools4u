function Tools4u() {
  return (
    <section id="why-tools4u" className="mt-20 text-center px-6 md:px-20">
      <h2 className="text-4xl md:text-5xl font-bold mb-6">
        Why Tools<span className="text-amber-300">4</span>You?
      </h2>

      <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-12">
        Because handling files should be fast, simple, and stress-free. Tools4U
        gives you powerful online tools, all in one place, designed to make
        conversions effortless and secure.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Card 1 */}
        <div className="bg-zinc-900/60 border border-amber-300/30 rounded-2xl p-8 shadow-lg hover:shadow-amber-300/30 transition-all duration-300">
          <h3 className="text-2xl font-semibold text-amber-200 mb-3">
            ⚡ Lightning Fast
          </h3>
          <p className="text-gray-400">
            Upload, convert, and download your files in seconds — no waiting, no
            lag, just results.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-zinc-900/60 border border-amber-300/30 rounded-2xl p-8 shadow-lg hover:shadow-amber-300/30 transition-all duration-300">
          <h3 className="text-2xl font-semibold text-amber-200 mb-3">
            🔒 Secure & Private
          </h3>
          <p className="text-gray-400">
            Your files stay yours. We never store or share your uploads —
            privacy and safety come first.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-zinc-900/60 border border-amber-300/30 rounded-2xl p-8 shadow-lg hover:shadow-amber-300/30 transition-all duration-300">
          <h3 className="text-2xl font-semibold text-amber-200 mb-3">
            🧰 All-in-One Tools
          </h3>
          <p className="text-gray-400">
            From image conversion to PDFs and beyond — Tools4U is your single
            hub for all file utilities.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Tools4u;
