
"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Timeline as ITimeline } from "../utils/interface";
import { SectionHeading } from "./ui/Typography";
import { SlideIn } from "./ui/Transitions";
import { formatDate } from "../utils";

interface ExperienceProps {
  timeline: ITimeline[];
}

const Timeline = ({ timeline }: ExperienceProps) => {
  const experience = timeline;
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="relative pb-20" id="experience">
      <span className="blob absolute top-[20%] left-0 w-1/3 h-5/6 blur-[100px] -z-10" />
      <SectionHeading className="pl-4 md:px-12 py-20">
        <SlideIn className="text-white/40">Work</SlideIn>
        <br />
        <SlideIn>Experience.</SlideIn>
      </SectionHeading>
      <div className="grid gap-6 px-4 md:px-12">
        {experience.map((exp, index) => (
          <motion.div
            key={exp._id}
            className="relative group"
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(null)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div 
              className="relative rounded-2xl overflow-hidden backdrop-blur-sm p-6 transition-all duration-300"
              style={{
                background: 'linear-gradient(45deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                boxShadow: '0 8px 32px 0 rgba(0,0,0,0.1)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {exp.jobTitle}
                  </h3>
                  <p className="text-xl text-white/70">{exp.company_name}</p>
                </div>
                <div className="text-sm text-white/50 font-mono">
                  {formatDate(exp.startDate).month + " " + formatDate(exp.startDate).year}
                  {" — "}
                  {exp.endDate > new Date().toISOString()
                    ? "Present"
                    : formatDate(exp.endDate).month + " " + formatDate(exp.endDate).year}
                </div>
              </div>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: hover === index ? "auto" : 0,
                  opacity: hover === index ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <ul className="space-y-2 text-white/80 list-disc list-inside">
                  {exp.bulletPoints.map((point, i) => (
                    <li key={i} className="text-sm md:text-base">
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
