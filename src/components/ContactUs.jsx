import { Github, Instagram, Linkedin } from "lucide-react";
import SocialCard from "./Card/SocialCard";
import SectionTitle from "./Card/SectionTitle";

const ContactUs = () => {
  return (
    <section
      id="contact"
      className="mt-24 text-black dark:text-white max-w-5xl mx-auto"
    >
      <SectionTitle title="Contact Me" />

      <form className="p-4 border border-black/10 dark:border-white/10 rounded-2xl w-full bg-white dark:bg-black grid grid-cols-1 md:grid-cols-2 gap-8 transition-colors duration-500">
        {/* LEFT */}
        <div>
          <div className="mb-5">
            <h1 className="text-xl font-semibold text-orange-500">
              Just say Hello!
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Let's get to know each other!
            </p>
          </div>

          <div className="space-y-3">
            <input
              className="bg-gray-100 dark:bg-zinc-900/60 border border-black/10 dark:border-white/10 rounded-xl p-2 w-full focus:outline-none focus:border-orange-400 transition-colors"
              type="text"
              placeholder="Your Name"
            />

            <input
              className="bg-gray-100 dark:bg-zinc-900/60 border border-black/10 dark:border-white/10 rounded-xl p-2 w-full focus:outline-none focus:border-orange-400 transition-colors"
              type="text"
              placeholder="Your Email"
            />

            <textarea
              className="bg-gray-100 dark:bg-zinc-900/60 border border-black/10 dark:border-white/10 rounded-xl p-2 w-full h-38 resize-none focus:outline-none focus:border-orange-400 transition-colors"
              placeholder="Your Message"
            />

            <div className="flex justify-center">
              <div className="relative group rounded-xl p-0.5 bg-linear-to-r from-orange-500 via-orange-400 to-orange-500 w-full cursor-pointer">
                <button
                  type="submit"
                  className="px-6 py-2 w-full bg-white dark:bg-black text-black dark:text-white rounded-xl transition-all duration-300 group-hover:bg-gray-100 dark:group-hover:bg-black/80"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-gray-100 dark:bg-zinc-900/60 border border-black/10 dark:border-white/10 rounded-2xl p-3 space-y-5 transition-colors duration-500">
          <h1 className="text-xl font-semibold text-orange-500">
            Get in Touch
          </h1>

          <p className="text-gray-700 dark:text-gray-300">
            💡 Let’s collaborate! Whether it’s a project, freelance work, or
            just tech talk — I’m always open to connect.
          </p>

          <p className="text-gray-700 dark:text-gray-300">
            📩 Fill out the form or message me directly on socials.
          </p>

          <div>
            <h2 className="text-md font-semibold text-orange-500">Follow me</h2>

            <div className="flex md:justify-start gap-4 mt-4">
              <SocialCard
                link="https://github.com/anasdotio"
                icon={<Github />}
              />

              <SocialCard
                link="https://www.linkedin.com/in/anas-thakur-841/"
                icon={<Linkedin />}
              />

              <SocialCard
                link="https://www.instagram.com/anasdotio/"
                icon={<Instagram />}
              />
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ContactUs;
