import { Github, Instagram, Linkedin } from "lucide-react";

const ContactUs = () => {
  return (
    <section className="mt-24  text-white max-w-8xl mx-auto">
      {/* Heading */}
      <div className="text-center relative w-fit mx-auto mb-14">
        <h1 className="text-4xl font-semibold tracking-wide">Contact Me</h1>
        <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-linear-to-r from-bg-transparent via-orange-500 to-bg-transparent"></div>
      </div>

      <form className="p-4 border border-white/10 rounded-2xl w-full   bg-black grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="left">
          <div className="mb-5">
            <h1 className="text-xl font-semibold text-orange-400">
              Just say Hello!
            </h1>
            <p className="text-sm text-gray-400">
              Let's get in know each other!
            </p>
          </div>
          <div className="space-y-3">
            <input
              className="bg-zinc-900/60 backdrop-blur-2xl border border-white/10 rounded-xl p-2 w-full focus:outline-none focus:border-orange-400 transition-colors"
              type="text"
              placeholder="Your Name"
            />
            <input
              className="bg-zinc-900/60 backdrop-blur-2xl border border-white/10 rounded-xl p-2 w-full focus:outline-none focus:border-orange-400 transition-colors"
              type="text"
              placeholder="Your Email"
            />
            <textarea
              className="bg-zinc-900/60 backdrop-blur-2xl border border-white/10 rounded-xl p-2 w-full h-38 resize-none focus:outline-none focus:border-orange-400 transition-colors"
              type="text"
              placeholder="Your Message"
            />
            <div className="flex justify-center">
              <div className="relative group rounded-xl p-[2px] bg-linear-to-r from-orange-500 via-orange-400 to-orange-500 w-full bg-animate cursor-pointer">
                <button
                  type="submit"
                  className="px-6 py-2 w-full bg-black rounded-xl transition-all duration-300 group-hover:bg-black/80"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="right bg-zinc-900/60 backdrop-blur-2xl border border-white/10 rounded-2xl p-3 space-y-5">
          <h1 className="text-xl font-semibold text-orange-400">
            Get in Touch
          </h1>
          <p>
            💡 Let’s collaborate! Whether it’s a project, freelance work, or
            just tech talk — I’m always open to connect.
          </p>
          <p>📩 Fill out the form or message me directly on socials.</p>
          <div>
            <h2 className="text-md font-semibold text-orange-400">Follow me</h2>
            <div className="flex  md:justify-start gap-4 mt-4">
              <a
                href="https://github.com/anasdotio"
                className="p-3 rounded-xl bg-zinc-900 border border-white/10 hover:border-orange-500/40 hover:shadow-[0_0_20px_rgba(255,106,0,0.3)] transition-all"
              >
                <Github />
              </a>
              <a
                href="https://www.linkedin.com/in/anaskhan12/"
                className="p-3 rounded-xl bg-zinc-900 border border-white/10 hover:border-orange-500/40 hover:shadow-[0_0_20px_rgba(255,106,0,0.3)] transition-all"
              >
                <Linkedin />
              </a>
              <a
                href="https://www.instagram.com/anas_thakur_841"
                className="p-3 rounded-xl bg-zinc-900 border border-white/10 hover:border-orange-500/40 hover:shadow-[0_0_20px_rgba(255,106,0,0.3)] transition-all"
              >
                <Instagram />
              </a>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ContactUs;
