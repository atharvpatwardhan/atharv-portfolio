"use client";

import { Skill } from "../utils/interface";
import { ParallaxText } from "./ui/ParallaxText";
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
import { SectionHeading } from "./ui/Typography";
import { motion } from "framer-motion";
import aws_practitioner from "public/aws-certified-ai-practitioner.png";
import Image from "next/image";
import Link from "next/link";

interface SkillsProps {
  skills: Skill[];
}

const skillIcons: { [key: string]: any } = {
  Python: <FaPython className="text-5xl" />,
  Java: <FaJava className="text-5xl" />,
  TypeScript: <SiTypescript className="text-5xl" />,
  SQL: <FaDatabase className="text-5xl" />,
  PostgreSQL: <SiPostgresql className="text-5xl" />,
  MongoDB: <SiMongodb className="text-5xl" />,
  Docker: <FaDocker className="text-5xl" />,
  Git: <FaGit className="text-5xl" />,
  Kafka: <SiApachekafka className="text-5xl" />,
  Airflow: <SiApacheairflow className="text-5xl" />,
  PySpark: <SiApachespark className="text-5xl" />,
  MLflow: <SiMlflow className="text-5xl" />,
};

const mySkills = [
  { name: "Python" },
  { name: "Java" },
  { name: "TypeScript" },
  { name: "Kafka" },
  { name: "Airflow" },
  { name: "Docker" },
  { name: "SQL" },
  { name: "PostgreSQL" },
  { name: "MongoDB" },
  { name: "Git" },
  { name: "PySpark" },
  { name: "MLflow" },
];

const tileVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

function Skills({ skills }: SkillsProps) {
  return (
    <section id="skills" className="py-16">
      <SectionHeading className="md:pl-12">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <span className="text-white/40">My Skills</span>
          <br />
          <span>and certifications.</span>
        </motion.span>
      </SectionHeading>

      {/* Foreground Skill List */}
      <div className="flex flex-col items-center mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-16">
          {mySkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="relative flex items-center justify-center w-36 h-36 bg-gray-800/50 rounded-2xl shadow-md transition-all duration-700 "
              variants={tileVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              custom={index} // Custom index for staggered effect
            >
              {/* Icon */}
              <div className="text-white transition-opacity duration-300">
                {skillIcons[skill.name] || "🔹"}
              </div>
              {/* Skill Name (Appears on Hover) */}
              <span className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold opacity-0 transition-opacity duration-700 hover:opacity-100 hover:backdrop-blur-2xl">
                {skill.name}
              </span>
            </motion.div>
          ))}
          <Link
            href={
              "https://www.credly.com/badges/41c832cd-f32e-437d-b239-52d2a0402f90/public_url"
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={aws_practitioner}
              width={200}
              height={200}
              alt="AWS Certified"
              className="max-w-xs md:max-w-md lg:max-w-lg rounded-xl shadow-lg mt-10"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Skills;
