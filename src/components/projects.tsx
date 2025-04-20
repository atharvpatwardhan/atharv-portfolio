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
  //Removed setSelectedProject state as popup is removed

  const numProjectToShow = 6;

  return (
    <section className="md:p-8 p-4 mt-10 relative" id="projects">
      <SectionHeading className="md:pl-12">
        <SlideIn className="text-white/40">My</SlideIn>
        <br />
        <SlideIn>Projects.</SlideIn>
      </SectionHeading>
      <motion.div className="flex flex-col md:grid md:grid-cols-3 grid-cols-2 md:gap-6 gap-3 relative">
        {filteredProjects.map((project, index) => (
          <Transition
            transition={{ delay: 0.2 + index * 0.1 }}
            viewport={{ once: true }}
            key={project._id}
            layoutId={project._id}
          >
            <Link href={`/project/${project._id}`}>
              <Card {...project} />
            </Link>
          </Transition>
        ))}
        {/* Removed AnimatePresence block as popup is removed */}
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

const Card = ({
  title,
  image,
  description,
  githuburl,
  techStack,
  _id,
}: Project) => {
  return (
    <Link href={`/project/${_id}`}>
      <motion.div
        layout
        className="relative rounded-2xl overflow-hidden backdrop-blur-sm cursor-pointer group"
        style={{
          background:
            "linear-gradient(45deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
          boxShadow: "0 8px 32px 0 rgba(0,0,0,0.1)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(45deg, rgba(123,0,255,0.1) 0%, rgba(0,123,255,0.1) 100%)",
          }}
        />
        <div className="relative overflow-hidden aspect-[16/9]">
          <img
            src={image.url}
            width={700}
            height={400}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-all duration-300" />
          <motion.div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
            <p className="text-white/90 text-sm line-clamp-2 mb-4 transform opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
              {description}
            </p>
          </motion.div>
        </div>
        <div className="p-6 pt-4">
          <div className="flex flex-wrap gap-2 mb-4">
            {techStack.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs bg-white/5 border border-white/10 rounded-full backdrop-blur-sm 
                         transform hover:scale-105 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <motion.span className="text-white/60 text-sm flex items-center gap-2 group-hover:text-primary transition-colors duration-300">
              Explore Project
              <motion.span className="transform group-hover:translate-x-1 transition-transform duration-300">
                →
              </motion.span>
            </motion.span>
            <Link
              href={githuburl}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              className="relative p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 
                       transform hover:scale-110 transition-all duration-300"
            >
              <Github />
            </Link>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
