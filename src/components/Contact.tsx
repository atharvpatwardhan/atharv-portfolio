"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

import { About, SocialHandle } from "../utils/interface";
import { cn } from "../utils/cn";
import Link from "next/link";
import { SectionHeading, TextReveal } from "./ui/Typography";
import { SlideIn, Transition } from "./ui/Transitions";
import { Input, Textarea } from "./ui/Input";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ContactProps {
  email: string;
  social_handle: SocialHandle[];
  about: About;
}
const Contact = ({ email, social_handle, about }: ContactProps) => {
  const form = useRef<HTMLFormElement>(null);
  const [flag, setFlag] = useState(true);

  const sendEmail = (e: any) => {
    e.preventDefault();
    const notify = () => {
      flag
        ? toast.success("Thanks for reaching out!")
        : toast.error("An error occurred, please try later.");
    };

    try {
      emailjs.sendForm(
        "service_p6sx4qo",
        "template_6i19r6l",
        form.current!,
        "0zbfIZZkG_misxWPx"
      );
      notify();
    } catch {
      setFlag(false);
      notify();
    } finally {
      setFlag(true);
    }

    e.target.reset();
  };

  const [status, setStatus] = useState<"SENDING" | "DONE" | "ERROR" | "IDLE">(
    "IDLE"
  );
  const [statusText, setStatusText] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("SENDING");

    try {
      console.log("Form data:", formData);
      setTimeout(() => {
        setStatus("DONE");
        setFormData({
          email: "",
          message: "",
          name: "",
          subject: "",
        });
        setStatusText("Message sent successfully!");
      }, 3000);
    } catch (error: any) {
      setStatus("ERROR");
      setStatusText("Error in sending message: " + error.message);
      console.error("Error sending message:", error.message);
    }
  };

  useEffect(() => {
    if (status === "DONE" || status === "ERROR") {
      const timer = setTimeout(() => {
        setStatus("IDLE");
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [status]);

  return (
    <motion.section className="relative" id="contact">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <AnimatePresence initial={false}>
        {status !== "IDLE" && (
          <motion.li
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className={cn(
              "fixed top-4 right-4 p-2 px-4 w-[300px] z-50 h-16 rounded-xl bg-white flex items-center",
              status === "ERROR"
                ? "bg-red-500"
                : status === "DONE"
                ? "bg-green-400"
                : ""
            )}
          >
            <p className="text-black font-semibold">{statusText}</p>
          </motion.li>
        )}
      </AnimatePresence>
      <span className="blob size-1/2 absolute top-20 right-0 blur-[100px] -z-10" />
      <div className="p-4 md:p-8 md:px-16">
        <SectionHeading className="">
          <SlideIn className="text-white/40">{"Let's"} get</SlideIn> <br />{" "}
          <SlideIn>in touch!</SlideIn>
        </SectionHeading>
        <div className="grid md:grid-cols-2 gap-10 md:pt-16">
          <form className="space-y-4" onSubmit={sendEmail} ref={form}>
            <div className="flex gap-4">
              <Transition className="w-full">
                <Input
                  id="name"
                  name="user_name"
                  className="border-0 border-b rounded-none"
                  required
                  placeholder="Name"
                />
              </Transition>
              <Transition className="w-full">
                <Input
                  type="email"
                  id="email"
                  name="user_email"
                  className="border-0 border-b rounded-none"
                  placeholder="Email"
                  required
                />
              </Transition>
            </div>
            <div className="space-y-2">
              <Transition>
                <Textarea
                  className="min-h-[100px] rounded-none border-0 border-b resize-none"
                  id="message"
                  name="message"
                  placeholder="Enter your message"
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </Transition>
            </div>
            <div>
              <Transition>
                <motion.button
                  whileHover="whileHover"
                  initial="initial"
                  className="border border-white/30 px-8 py-2 rounded-3xl relative overflow-hidden"
                  type="submit"
                  value="send"
                >
                  <TextReveal className="uppercase">
                    {status === "SENDING" ? "Sending..." : "Submit"}
                  </TextReveal>
                </motion.button>
              </Transition>
            </div>
          </form>
          <div className="md:justify-self-end flex flex-col">
            <div className="pb-4">
              <Transition>
                <span className="text-white/90">Get in touch</span>
              </Transition>
              <div className="text-2xl md:text-4xl font-bold py-2">
                <Transition>
                  <TextReveal>{email}</TextReveal>
                </Transition>
              </div>
            </div>

            <div className="flex md:gap-8 gap-4 mt-auto md:pb-16">
              {social_handle.map((social, index) =>
                social.enabled ? (
                  <Transition
                    key={social._id}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <Link href={social.url} target="_blank">
                      <TextReveal>{social.platform}</TextReveal>
                    </Link>
                  </Transition>
                ) : null
              )}
            </div>
          </div>
        </div>
      </div>
      <br />
    </motion.section>
  );
};

export default Contact;
