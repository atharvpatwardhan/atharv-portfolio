"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { SectionHeading, TextReveal } from "./ui/Typography";
import { Project } from "../utils/interface";
import { ArrowUpRight, Github } from "./ui/Icons";
import Filters from "./filters";
import { useVariants } from "../utils/hooks";
import { SlideIn, Transition } from "./ui/Transitions";
import p1 from "public/project1.jpeg";
import p4 from "public/project2.jpeg";
import p2 from "public/project3.jpeg";
import p3 from "public/project6.jpeg";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { useMediaQuery } from "@/utils/useMediaQuery";
import ProjectDialog from "./ProjectDialog";

interface ProjectsProps {
  projects: Project[];
}

function Projects({ projects }: ProjectsProps) {
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [showMore, setShowMore] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const numProjectToShow = 6;

  return (
    <section className="md:p-8 p-4 mt-10 relative" id="projects">
      <SectionHeading className="md:pl-12">
        <SlideIn className="text-white/40">My</SlideIn>
        <br />
        <SlideIn>projects.</SlideIn>
      </SectionHeading>
      <motion.div className="grid md:grid-cols-3 grid-cols-2 md:gap-6 gap-3 relative">
        {filteredProjects.map((project, index) => (
          <Transition
            transition={{ delay: 0.2 + index * 0.1 }}
            viewport={{ once: true }}
            key={project._id}
            layoutId={project._id}
            onClick={() => {
              setSelectedProject(project);
            }}
          >
            <Card {...project} />
          </Transition>
        ))}
        <AnimatePresence>
          {selectedProject && (
            <div className="rounded-lg cursor-pointer absolute inset-0 h-1/2 w-full md:w-1/2 m-auto z-50 flex justify-center items-center flex-wrap flex-col">
              <ProjectDialog
                selectedProject={selectedProject}
                setSelectedProject={setSelectedProject}
              />
            </div>
          )}
        </AnimatePresence>
      </motion.div>
      <div className="grid place-items-center py-8">
        {filteredProjects.length > numProjectToShow && (
          <button
            className="flex items-center justify-center gap-4 py-3 px-6 rounded-full border mt-6 group relative overflow-hidden"
            onClick={() => setShowMore(!showMore)}
          >
            <TextReveal>{showMore ? "Show less" : "Show more"}</TextReveal>
          </button>
        )}
      </div>
    </section>
  );
}

export default Projects;

const Card = ({ title, image, description, githuburl, techStack }: Project) => {
  const [hover, setHover] = useState(false);
  const { setVariant } = useVariants();
  const isMobile = useMediaQuery("(max-width:768px)");

  const mouseEnter = () => {
    setHover(true);
    setVariant("PROJECT");
  };
  const mouseLeave = () => {
    setHover(false);
    setVariant("DEFAULT");
  };

  return (
    <motion.div
      layout
      className="relative rounded-xl md:rounded-3xl overflow-hidden aspect-square bg-secondary/30 md:px-4 cursor-pointer hover:scale-105 hover:transition-all hover:duration-1000"
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      {/* <div className="absolute top-2 right-2 w-full h-full flex justify-end md:hidden">
        <div className="bg-white size-8 rounded-full text-black grid place-items-center">
          <ArrowUpRight />
        </div>
      </div> */}
      <div className="md:py-8 relative">
        <motion.div
          className={`${
            isMobile ? "flex flex-col" : "flex justify-between items-center"
          } `}
        >
          <p
            className={`${
              isMobile
                ? "flex gap-2 items-center justify-center max-md:px-4 mt-10 my-auto"
                : "text-sm md:text-xl font-semibold max-md:opacity-0 px-5"
            }`}
          >
            {title}
          </p>
          <Link
            href={githuburl}
            target="_blank"
            className="flex gap-2 items-center justify-center max-md:px-4"
          >
            <TextReveal className="max-md:text-xs">View on Github</TextReveal>
            <span className="bg-black text-white/80 rounded-full p-1">
              <Github />
            </span>
          </Link>
        </motion.div>
        {/* <div
          className={`${
            isMobile ? "hidden" : ""
          } my-auto mt-12 p-5 align-middle`}
        >
          {description}
        </div>
        <div
          className={`${
            isMobile ? "hidden" : ""
          } py-3 flex items-center gap-4 p-2`}
        >
          {techStack.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 border border-white/40 rounded-2xl text-sm"
            >
              {tech}
            </span>
          ))}
        </div>{" "} */}
      </div>
      <img
        src={image.url}
        width={700}
        height={500}
        alt={title}
        className="object-cover h-full w-full object-center rounded-xl md:rounded-t-3xl"
      />
    </motion.div>
  );
};
