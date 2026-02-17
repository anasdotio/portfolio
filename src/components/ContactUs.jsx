import React from "react";

const ContactUs = () => {
  return (
    <section className="mt-24 px-6 text-white">
      {/* Heading */}
      <div className="text-center relative w-fit mx-auto mb-14">
        <h1 className="text-4xl font-semibold tracking-wide">Contact Me</h1>
        <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-white/20 via-orange-500 to-white/20"></div>
      </div>

      {/* Form Container */}
      {/* <div className="max-w-3xl mx-auto bg-zinc-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-8">
        <form className="space-y-6"> */}
      {/* Name */}
      {/* <div>
            <label className="block text-sm text-gray-400 mb-2">
              Your Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-3 bg-black/70 border border-white/10 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div> */}

      {/* Email */}
      {/* <div>
            <label className="block text-sm text-gray-400 mb-2">
              Your Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-black/70 border border-white/10 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div> */}

      {/* Message */}
      {/* <div>
            <label className="block text-sm text-gray-400 mb-2">Message</label>
            <textarea
              rows="5"
              placeholder="Write your message..."
              className="w-full px-4 py-3 bg-black/70 border border-white/10 rounded-xl focus:outline-none focus:border-orange-500 transition-colors resize-none"
            ></textarea>
          </div> */}

      {/* Button */}
      {/* <div className="flex justify-center">
            <div className="relative group rounded-xl p-[2px] bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 w-fit">
              <button
                type="submit"
                className="px-6 py-2 bg-black rounded-xl transition-all duration-300 group-hover:bg-black/80"
              >
                Send Message
              </button>
            </div>
          </div>
        </form>
      </div> */}
    </section>
  );
};

export default ContactUs;
