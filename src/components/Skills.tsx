"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { SectionHeading } from "./ui/Typography";
import aws_practitioner from "public/aws-certified-ai-practitioner.png";
import Image from "next/image";
import Link from "next/link";
import { FaPython, FaJava, FaGit, FaDatabase, FaDocker } from "react-icons/fa";
import {
  SiTypescript,
  SiMongodb,
  SiApachekafka,
  SiApacheairflow,
  SiApachespark,
  SiMlflow,
  SiPostgresql,
} from "react-icons/si";
import { SlideIn } from "./ui/Transitions";

const skillIcons: { [key: string]: any } = {
  Python: <FaPython />,
  Java: <FaJava />,
  TypeScript: <SiTypescript />,
  SQL: <FaDatabase />,
  PostgreSQL: <SiPostgresql />,
  MongoDB: <SiMongodb />,
  Docker: <FaDocker />,
  Git: <FaGit />,
  Kafka: <SiApachekafka />,
  Airflow: <SiApacheairflow />,
  PySpark: <SiApachespark />,
  MLflow: <SiMlflow />,
};

const mySkills = [
  { name: "Python", category: "Programming" },
  { name: "Java", category: "Programming" },
  { name: "TypeScript", category: "Programming" },
  { name: "SQL", category: "Database" },
  { name: "PostgreSQL", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "Docker", category: "DevOps" },
  { name: "Git", category: "DevOps" },
  { name: "Kafka", category: "Big Data" },
  { name: "Airflow", category: "Big Data" },
  { name: "PySpark", category: "Big Data" },
  { name: "MLflow", category: "MLOps" },
];

const categories = Array.from(new Set(mySkills.map((skill) => skill.category)));

const SkillCard = ({ skill }: { skill: (typeof mySkills)[0] }) => {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="group relative">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#6d00c7]/20 to-[#001ec7]/20 transform transition-transform duration-300" />
        <div className="relative bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 transform transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="text-3xl text-white/80 group-hover:text-white transition-colors">
              {skillIcons[skill.name]}
            </div>
            <div>
              <h3 className="text-lg font-medium text-white/90 group-hover:text-white">
                {skill.name}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CategorySection = ({
  category,
  skills,
}: {
  category: string;
  skills: typeof mySkills;
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white/70">{category}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {skills
          .filter((skill) => skill.category === category)
          .map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
      </div>
    </div>
  );
};

function Skills() {
  const containerRef = useRef(null);

  return (
    <section
      id="skills"
      className="px-4 md:px-0 py-20 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-[#6d00c7]/5 to-black/0" />
      <div className="container mx-auto relative">
        <SectionHeading className="">
          <SlideIn className="text-white/40">My</SlideIn>
          <br />
          <SlideIn>Skills.</SlideIn>
        </SectionHeading>

        <div className="space-y-16" ref={containerRef}>
          {categories.map((category) => (
            <CategorySection
              key={category}
              category={category}
              skills={mySkills}
            />
          ))}
        </div>

        <Link
          href="https://www.credly.com/badges/41c832cd-f32e-437d-b239-52d2a0402f90/public_url"
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <Image
              src={aws_practitioner}
              width={200}
              height={200}
              alt="AWS Certified"
              className="rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </motion.div>
        </Link>
      </div>
    </section>
  );
}

export default Skills;
