"use client";

import Link from "next/link";

import { About, SocialHandle } from "../utils/interface";
import { SlideIn, Transition } from "./ui/Transitions";
import { TextReveal } from "./ui/Typography";
import { ArrowUpRight } from "./ui/Icons";

interface HeroProps {
  about: About;
  social_handle: SocialHandle[];
}

const Hero = ({ about, social_handle }: HeroProps) => {
  return (
    <section className="h-dvh w-dvw overflow-hidden relative">
      <Transition>
        <span className="blob size-1/2 absolute top-20 left-0 blur-[100px]" />
      </Transition>
      <div className="relative h-full w-full">
        <div className="flex items-center justify-center flex-col h-full pb-10">
          <div className="py-6 flex items-center flex-col">
            <h2 className="md:text-7xl text-4xl font-bold overflow-hidden">
              <SlideIn>Hello World!</SlideIn>
            </h2>
            <h1 className="md:text-7xl text-3xl overflow-hidden">
              <SlideIn>{"It's "}Atharv</SlideIn>
            </h1>
          </div>
          <Transition viewport={{ once: true }} className="w-full">
            <p className="opacity-70 md:text-xl py-4 w-10/12 md:w-2/3 mx-auto flex flex-wrap justify-center gap-2">
              {about.subTitle.split(" ").map((word, index) => (
                <span key={index}>{word}</span>
              ))}
            </p>
          </Transition>
        </div>
      </div>
    </section>
  );
};

export default Hero;
