import ProjectCard from "./Card/ProjectCard";
import SectionTitle from "./Card/SectionTitle";
import project1 from "../assets/project1.png";
import project2 from "../assets/project2.png";

const projects = [
  {
    title: "AI Interview Report Generator",
    description:
      "AI-powered interview report generator that analyzes resumes and job descriptions to identify skill gaps, generate personalized interview questions, and create a 7-day adaptive preparation roadmap.",
    image: project2,
    tech: ["Node.js", "MongoDB", "Express.js", "React.js"],
    github: "https://github.com/anasdotio/Ai-Interview-Report-Generator",
    // demo: "https://yourecommerce.com",
  },
];

const ProjectSection = () => {
  return (
    <section id="projects" className="mt-16 px-4 py-6 sm:py-10">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title="Projects" />

        <p className="mx-auto -mt-4 mb-10 max-w-2xl text-center text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
          A selection of work focused on clean interfaces, practical backend
          systems, and polished user experiences.
        </p>

        <section className="grid gap-6 md:grid-cols-2 xl:gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </section>
      </div>
    </section>
  );
};

export default ProjectSection;
