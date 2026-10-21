import { projects } from "../data/content";
import Section from "./ui/Section";
import ProjectCard from "./Card/ProjectCard";

const ProjectSection = () => (
  <Section
    id="projects"
    eyebrow="Work / 03"
    title="Projects"
    description="A selection of work focused on clean interfaces, practical backend systems, and polished user experiences."
  >
    <div className="grid gap-6 md:grid-cols-2">
      {projects.map((project, i) => (
        <ProjectCard key={project.title} {...project} index={i} />
      ))}
    </div>
  </Section>
);

export default ProjectSection;
