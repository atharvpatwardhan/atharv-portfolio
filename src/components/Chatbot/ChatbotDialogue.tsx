"use client";

import { useChat } from "ai/react";
import { useRef, useEffect } from "react";
import "./chatbot.css";
import { useMediaQuery } from "@/utils/useMediaQuery";
import { IoIosArrowDown } from "react-icons/io";
import avatar from "public/chatbot_avatar.jpeg";
import Image from "next/image";
import { TextReveal } from "../ui/Typography";
import { motion } from "motion/react";

const ChatbotDialogue = ({
  showChat,
  setShowChat,
}: {
  showChat: boolean;
  setShowChat: (a: boolean) => void;
}) => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "api/chat",
    onError: (e) => {
      console.log(e);
    },
  });

  const isMobile = useMediaQuery("(max-width:768px)");

  const chatParent = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const domNode = chatParent.current;
    if (domNode) {
      domNode.scrollTop = domNode.scrollHeight;
    }
  });

  return (
    <div
      className={`${
        showChat
          ? `${isMobile ? "-translate-y-96" : " -translate-y-80"} `
          : "translate-y-[120%]"
      }  md:bottom-16 md:right-1 md:scale-100 scale-90 right-0 bottom-5 fixed transition duration-1000 bg-black bg-opacity-90 z-50 shadow-2xl rounded-xl`}
    >
      <div className="h- w-96 border rounded-lg">
        <div className=" flex justify-center items-center border-b">
          <button onClick={() => setShowChat(false)}>
            {" "}
            <IoIosArrowDown
              color="white"
              className={`absolute left-5 top-3 ${
                !showChat && "rotate-180 transition duration-500"
              }`}
              size={25}
            />
          </button>

          <h1 className="text-center text-white text-xl p-2">AI Atharv</h1>
        </div>
        <div className="h-full">
          <section className="container px-0 flex flex-col flex-grow gap-4 mx-auto max-w-3xl">
            <ul
              ref={chatParent}
              className="p-4 flex-grow bg-muted/50 rounded-lg overflow-y-scroll no-scrollbar h-96 flex flex-col gap-4"
            >
              <li className="flex flex-row gap-2">
                <div className="rounded-full items-center">
                  <Image
                    src={avatar}
                    alt="Avatar"
                    height={35}
                    width={35}
                    className="rounded-full"
                  />
                </div>
                <div
                  className={`rounded-md p-4 shadow-md flex w-3/4 bg-gradient-to-br from-blue-600 via-purple-600 to-orange-600 text-white`}
                >
                  <p>
                    Hi there! {"I'm"} AI Atharv, {"Atharv's"} chatbot 🤖. Feel
                    free to ask me anything about Atharv, and {"I'll"} be happy
                    to help! 😊
                  </p>
                </div>
              </li>
              {messages.map((m, index) => (
                <div key={index}>
                  {m.role === "user" ? (
                    <li key={m.id} className="flex flex-row-reverse">
                      <div className="rounded-md p-4 shadow-md flex border text-white bg-slate-800">
                        <p className="">{m.content}</p>
                      </div>
                    </li>
                  ) : (
                    <li key={m.id} className="flex flex-row gap-2">
                      <div className="rounded-full items-center">
                        <Image
                          src={avatar}
                          alt="Avatar"
                          height={35}
                          width={35}
                          className="rounded-full"
                        />
                      </div>

                      <div
                        className={`rounded-md p-4 shadow-md flex w-3/4 h-auto bg-gradient-to-br from-blue-600 via-purple-600 to-orange-600 text-white`}
                      >
                        <p className="">{m.content}</p>
                      </div>
                    </li>
                  )}
                </div>
              ))}
            </ul>
          </section>
          <section className="p-4">
            <form
              onSubmit={handleSubmit}
              className="flex w-full max-w-3xl mx-auto items-center"
            >
              <input
                className={`bg-neutral-700 text-white
                flex-1 min-h-[40px] p-2 rounded-lg`}
                placeholder="Ask AI Atharv a question..."
                type="text"
                value={input}
                onChange={handleInputChange}
              />
              <motion.button
                className="ml-2 bg-gradient-to-br from-blue-600 via-purple-600 to-orange-600 text-white p-2 rounded"
                type="submit"
              >
                <TextReveal>Send</TextReveal>
              </motion.button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ChatbotDialogue;
