import { Github, Instagram, Linkedin } from "lucide-react";
import SocialCard from "./Card/SocialCard";
import SectionTitle from "./Card/SectionTitle";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

const ContactUs = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    toast.success(
      "Thanks for your interest! This feature will be available soon.",
    );
    reset();
  };

  return (
    <section id="contact" className="mt-24 text-white max-w-5xl mx-auto">
      <SectionTitle title="Contact Me" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 border border-white/10 rounded-2xl w-full bg-zinc-900/70 grid grid-cols-1 md:grid-cols-2 gap-8 transition-colors duration-500"
      >
        {/* LEFT */}
        <div>
          <div className="mb-5">
            <h1 className="text-xl font-semibold text-yellow-500">
              Just say Hello!
            </h1>
            <p className="text-sm text-gray-400">
              Let's get to know each other!
            </p>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <input
                className={`bg-zinc-950/70 border border-white/10 rounded-xl p-2 w-full text-white placeholder:text-gray-500 ${errors?.name && "focus:border-red-500"} focus:outline-none focus:border-yellow-400 transition-colors `}
                type="text"
                placeholder="Your Name"
                {...register("name", {
                  required: { value: true, message: "Name is required" },
                })}
              />
              {errors?.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <input
                className={`bg-zinc-950/70 border border-white/10 rounded-xl p-2 w-full text-white placeholder:text-gray-500 ${errors?.name && "focus:border-red-500"} focus:outline-none focus:border-yellow-400 transition-colors `}
                type="text"
                placeholder="Your Email"
                {...register("email", {
                  required: { value: true, message: "Email is required" },
                })}
              />
              {errors?.email && (
                <p className="text-sm text-red-500">{errors?.email?.message}</p>
              )}
            </div>

            <div>
              <textarea
                className={`bg-zinc-950/70 border border-white/10 rounded-xl p-2 w-full h-38 text-white ${errors?.message && "focus:border-red-500"} resize-none focus:outline-none focus:border-yellow-400 transition-colors placeholder:text-gray-500`}
                placeholder="Your Message"
                {...register("message", {
                  required: { value: true, message: "Message is required" },
                })}
              />

              {errors?.message && (
                <p className="text-sm text-red-500">
                  {errors?.message?.message}
                </p>
              )}
            </div>

            <div className="flex justify-center">
              <div className="relative group rounded-xl p-0.5 bg-linear-to-r from-yellow-500 via-yellow-400 to-yellow-500 w-full cursor-pointer">
                <button
                  type="submit"
                  className="px-6 py-2 w-full bg-zinc-950 text-white rounded-xl transition-all duration-300 group-hover:bg-zinc-900"
                >
                  Send Message
                </button>
              </div>
              <ToastContainer />
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-zinc-900/70 border border-white/10 rounded-2xl p-3 space-y-5 transition-colors duration-500">
          <h1 className="text-xl font-semibold text-yellow-500">
            Get in Touch
          </h1>

          <p className="text-gray-300">
            💡 Let’s collaborate! Whether it’s a project, freelance work, or
            just tech talk — I’m always open to connect.
          </p>

          <p className="text-gray-300">
            📩 Fill out the form or message me directly on socials.
          </p>

          <div>
            <h2 className="text-md font-semibold text-yellow-500">Follow me</h2>

            <div className="flex md:justify-start gap-4 mt-4">
              <SocialCard
                link="https://github.com/anasdotio"
                icon={<Github />}
              />

              <SocialCard
                link="https://www.linkedin.com/in/anaskhan12/"
                icon={<Linkedin />}
              />
              <SocialCard
                link="https://www.instagram.com/anas_thakur_841/"
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
