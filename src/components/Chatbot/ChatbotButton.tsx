"use client";
import Image from "next/image";
import React, { useState } from "react";
import ChatbotDialogue from "./ChatbotDialogue";
import { TextReveal } from "../ui/Typography";

const ChatbotButton = ({}: {}) => {
  const [showChat, setShowChat] = useState(false);
  return (
    <div
      className={`fixed z-50 md:bottom-5 md:right-5 right-0 md:scale-100 scale-90 bottom-0 p-10  transition duration-1000 ${
        showChat ? "translate-y-96" : "-translate-y-2 delay-100"
      }`}
    >
      <button
        onClick={() => setShowChat(true)}
        className="rounded-xl flex gap-2 p-5 border border-white z-0 bg-black bg-opacity-90 text-white hover:bg-gradient-to-br hover:from-blue-600 hover:via-purple-600 hover:to-orange-600"
      >
        <TextReveal>Chat with AI Atharv</TextReveal>
      </button>
      <ChatbotDialogue showChat={showChat} setShowChat={setShowChat} />
    </div>
  );
};

export default ChatbotButton;
