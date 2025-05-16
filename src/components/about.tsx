"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { motion } from "motion/react";

import { About as IAbout, Timeline } from "../utils/interface";
import { OpacityTextReveal, SlideIn, Transition } from "./ui/Transitions";
import { formatDate } from "../utils";
import Image from "next/image";
import atharv from "public/atharv_linkedin_new.jpg";
import { TextReveal } from "./ui/Typography";
import Link from "next/link";
interface AboutProps {
  about: IAbout;
  timeline: Timeline[];
}

const About = ({ about, timeline }: AboutProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const education = timeline
    .filter((line) => line.forEducation && line.enabled === true)
    .sort((a, b) => a.sequence - b.sequence);

  return (
    <section
      className="grid md:grid-cols-[1.8fr_1fr] gap-x-10 py-20 px-4 md:px-20 relative"
      id="about"
    >
      <div>
        <h3 className="md:text-5xl text-2xl font-bold overflow-hidden uppercase pb-8">
          <SlideIn>
            <OpacityTextReveal>{about.quote}</OpacityTextReveal>
          </SlideIn>
        </h3>
        <Transition
          viewport={{ once: true }}
          className="md:text-4xl tracking-tighter"
        >
          <OpacityTextReveal>{about.description}</OpacityTextReveal>
        </Transition>
        <div className="pt-10">
          <Link
            href={
              "https://drive.google.com/file/d/1imCjggyZJIJ0hV8zfJWk7_Ua1SFPHkOQ/view?usp=sharing"
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.button className="p-4 text-lg text-white rounded-lg border">
              <TextReveal>Resume</TextReveal>
            </motion.button>
          </Link>
        </div>
      </div>
      <div className="relative">
        <div className="sticky top-6">
          <Transition>
            <Image
              src={atharv}
              width={400}
              height={400}
              alt={about.name}
              className="rounded-xl max-md:aspect-square object-cover"
            />
          </Transition>
        </div>
      </div>
    </section>
  );
};

export default About;
