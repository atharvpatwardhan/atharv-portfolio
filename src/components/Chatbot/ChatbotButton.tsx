"use client";
import Image from "next/image";
import React, { useState } from "react";
import ChatbotDialogue from "./ChatbotDialogue";

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
        className="rounded-xl hover:scale-110 transition duration-1000 flex gap-2 p-5 border border-white z-0 bg-black bg-opacity-90 text-white shadow-2xl hover:bg-gradient-to-r hover:from-blue-600 hover:via-purple-600 hover:to-orange-600"
      >
        Chat with AI Atharv
        {/* <Image src="/public/atharv-avatar.jpg" alt="" width={20} height={20} /> */}
      </button>
      <ChatbotDialogue showChat={showChat} setShowChat={setShowChat} />
    </div>
  );
};

export default ChatbotButton;
