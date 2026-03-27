import ProjectCard from "./Card/ProjectCard";
import SectionTitle from "./Card/SectionTitle";
import project1 from "../assets/project1.png";
import project2 from "../assets/project2.png";

const projects = [
  {
    title: "Portfolio",
    description:
      "A personal portfolio website to showcase my projects and skills.",
    image: project1,
    tech: ["React.js", "Tailwind CSS"],
    github: "https://github.com/anasdotio/portfolio",
    demo: "https://anasdev.in",
  },
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
    <div className="mt-10">
      <SectionTitle title="Projects" />

      <section className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-90 max-w-5xl mx-auto">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </section>
    </div>
  );
};

export default ProjectSection;
