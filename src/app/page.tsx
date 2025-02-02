import About from "@/components/about";
import ChatbotButton from "@/components/Chatbot/ChatbotButton";
import ChatbotDialogue from "@/components/Chatbot/ChatbotDialogue";
import Contact from "@/components/Contact";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import Skills from "@/components/Skills";
import Timeline from "@/components/Timeline";
import { Portfolio } from "@/utils/interface";
import { useState } from "react";

export default async function Home() {
  const portfolio = (await import("@/dummy.json")).default;

  const { about, skills, projects, social_handles, timeline, email } =
    portfolio as Portfolio;

  return (
    <main className="relative">
      <Header social={social_handles} />
      <Hero about={about} social_handle={social_handles} />
      <ChatbotButton />

      <About about={about} timeline={timeline} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Timeline timeline={timeline} />
      <Contact email={email} social_handle={social_handles} about={about} />
    </main>
  );
}
