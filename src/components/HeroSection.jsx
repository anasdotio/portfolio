import profileImage from "../assets/profile.png";

const HeroSection = () => {
  return (
    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 mt-12 items-center w-full justify-items-between text-white">
      {/* LEFT CONTEXT */}
      <div className="text-center md:text-left">
        <h1 className="text-5xl font-semibold hidden md:block">Anas Khan</h1>

        <p className="text-2xl mt-4">Backend / Full-Stack Developer</p>

        <p className="mt-4 text-gray-300 leading-relaxed mx-auto  md:mx-0 md:text-left max-w-md">
          Building{" "}
          <span className="text-orange-400 font-medium">
            {" "}
            microservice-based systems
          </span>{" "}
          with Node.js, messaging queues, and clean architecture.
        </p>

        <div className="rounded-md overflow-hidden p-px w-fit mx-auto bg-animate md:w-sm md:mx-0 mt-4">
          <button className="px-4 py-2 bg-black/88 rounded-md w-full">
            View Projects
          </button>
        </div>
      </div>

      {/* RIGHT IMAGE */}

      <div className="flex justify-center md:justify-end">
        <div className="relative">
          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-full bg-orange-500 blur-3xl opacity-20"></div>

          {/* Image */}
          <img
            src={profileImage} // <-- replace with your image
            alt="Anas Khan"
            className="relative w-64 h-64 object-cover object-top  rounded-full  border border-white/10 shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
