function Contact() {
  return (
    <section
      id="contact"
      className="py-20 px-6 flex flex-col items-center justify-center text-center bg-linear-to-b from-transparent to-white/5"
    >
      <h2 className="text-4xl font-bold mb-4">
        Get in <span className="text-amber-300">Touch</span>
      </h2>
      <p className="text-gray-300 max-w-xl mb-10">
        Have a question, feature request, or collaboration idea? We’d love to
        hear from you — drop us a message and we’ll get back soon.
      </p>

      <form className="backdrop-blur-md bg-white/10 border border-amber-400/20 rounded-2xl shadow-lg p-8 w-full max-w-lg flex flex-col gap-5">
        <input
          type="text"
          placeholder="Your Name"
          className="bg-transparent border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-300 transition-all duration-200"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          className="bg-transparent border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-300 transition-all duration-200"
          required
        />
        <textarea
          placeholder="Your Message"
          rows={5}
          className="bg-transparent border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-300 transition-all duration-200 resize-none"
          required
        ></textarea>

        <button
          type="submit"
          className="bg-amber-400 text-black font-semibold rounded-xl py-3 hover:bg-amber-300 transition-all duration-200"
        >
          Send Message
        </button>
      </form>

      <p className="text-gray-400 text-sm mt-6">
        Or email us directly at{" "}
        <a
          href="mailto:contact@tools4u.com"
          className="text-amber-300 hover:underline"
        >
          contact@tools4u.com
        </a>
      </p>
    </section>
  );
}

export default Contact;
