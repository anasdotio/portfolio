import React from "react";
import TimelineCard from "./Card/TimeLineCard";
import SectionTitle from "./Card/SectionTitle";

const Education = () => {
  return (
    <div className="mt-20 text-white grid grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto gap-16">
      {/* LEFT - EDUCATION */}
      <div>
        <SectionTitle title="Education" />

        <div className="relative border-l-2 border-yellow-500 pl-8 space-y-10">
          <TimelineCard
            title="Bachelor of Technology in Computer Science & Engineering"
            year="2023 - Present"
            description="I am currently pursuing my Bachelor's degree in Computer Science & Engineering."
          />

          <TimelineCard
            title="Diploma in Computer Science & Engineering"
            year="2021 - 2023"
            description="I completed my Diploma in Computer Science & Engineering."
          />
        </div>
      </div>

      {/* RIGHT - EXPERIENCE */}
      <div>
        <SectionTitle title="Experience" />

        <div className="relative border-l-2 border-yellow-500 pl-8 space-y-10">
          <TimelineCard
            title="Frontend Developer Intern"
            year="Featherone - Jul 2022 - Aug 2022"
            description="I worked as a frontend developer intern at Featherone. I learned about the frontend technologies like React.js and Tailwind CSS."
          />
          <TimelineCard
            title="Student Coordinator - Techfest"
            year="2025"
            description="Led a team of 20+ students to organize the annual techfest, managing technical events, workshops, and 300+ participants."
          />
        </div>
      </div>
    </div>
  );
};

export default Education;
