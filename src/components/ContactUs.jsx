import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { ArrowUpRight, Send } from "lucide-react";
import { profile, socials } from "../data/content";
import Section from "./ui/Section";
import SpotlightCard from "./ui/SpotlightCard";
import Reveal from "./ui/Reveal";

const iconFor = (label) =>
  ({ GitHub: "GH", LinkedIn: "in", Instagram: "IG", Email: "@" })[label] ?? "•";

const fieldClass =
  "w-full rounded-xl border border-bone-100/[0.09] bg-ink-950/60 px-4 py-3 text-sm text-bone-100 placeholder:text-bone-600 transition-colors duration-200 focus:border-ember-500/60 focus:bg-ink-950 focus:outline-none focus:ring-2 focus:ring-ember-500/20";

const ContactUs = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    // No backend wired up yet — surface a confirmation and clear the form.
    console.log(data);
    toast.success("Thanks for reaching out! I'll get back to you soon.");
    reset();
  };

  return (
    <Section
      id="contact"
      eyebrow="Contact / 07"
      title="Let's build something"
      description="Got a project, a role, or just want to talk backend? My inbox is open."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        {/* ---------- form ---------- */}
        <Reveal>
          <SpotlightCard className="surface p-6 sm:p-8">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-xs font-medium text-bone-400"
                  >
                    Your name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Jane Doe"
                    className={fieldClass}
                    aria-invalid={Boolean(errors.name)}
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
                    })}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-400">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs font-medium text-bone-400"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="jane@company.com"
                    className={fieldClass}
                    aria-invalid={Boolean(errors.email)}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-xs font-medium text-bone-400"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell me about the project…"
                  className={`${fieldClass} resize-none`}
                  aria-invalid={Boolean(errors.message)}
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters",
                    },
                  })}
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-red-400">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
              >
                Send message
                <Send className="h-4 w-4" />
              </button>
            </form>
          </SpotlightCard>
        </Reveal>

        {/* ---------- direct channels ---------- */}
        <Reveal delay={0.1}>
          <SpotlightCard className="surface flex h-full flex-col p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-bone-100">Get in touch</h3>
            <p className="mt-3 text-sm leading-relaxed text-bone-400">
              Prefer a direct line? Reach out on any of these — I usually reply
              within a day.
            </p>

            <ul className="mt-7 space-y-2.5">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={
                      social.href.startsWith("mailto:") ? undefined : "_blank"
                    }
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3.5 rounded-xl border border-bone-100/[0.07] bg-bone-100/[0.02] p-3 transition-colors duration-200 hover:border-ember-500/40 hover:bg-ember-500/[0.07]"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-bone-100/[0.08] bg-ink-900 font-mono text-[11px] font-bold text-ember-300 transition-colors group-hover:border-ember-500/40">
                      {iconFor(social.label)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-bone-100">
                        {social.label}
                      </span>
                      <span className="block truncate text-xs text-bone-500">
                        {social.handle}
                      </span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-bone-600 transition-colors group-hover:text-ember-300" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-8">
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost w-full"
              >
                Download Resume
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </SpotlightCard>
        </Reveal>
      </div>

      <ToastContainer
        position="bottom-right"
        theme="dark"
        autoClose={4000}
        toastOptions={{
          style: {
            background: "#12121f",
            border: "1px solid rgba(204,143,44,0.25)",
            color: "#e6e6f0",
          },
        }}
      />
    </Section>
  );
};

export default ContactUs;
