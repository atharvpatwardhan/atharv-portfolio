import {
  Message as VercelChatMessage,
  StreamingTextResponse,
  createStreamDataTransformer,
} from "ai";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { HttpResponseOutputParser } from "langchain/output_parsers";

import { JSONLoader } from "langchain/document_loaders/fs/json";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RunnableSequence } from "@langchain/core/runnables";
import { formatDocumentsAsString } from "langchain/util/document";
import { CharacterTextSplitter } from "langchain/text_splitter";
import { NextResponse } from "next/server";
import { error } from "console";
import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-dynamic";

/**
 * Basic memory formatter that stringifies and passes
 * message history directly into the model.
 */
const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`;
};

const TEMPLATE = `Answer the user's questions based on the following context. You are Atharv Bot, Atharv Patwardhan's chatbot. Atharv's information is given in the context. If asked about your creation, say you are AI Atharv, and say that you were made by Atharv. Be polite and very friendly. If the answer is not in the context, reply politely, saying you're sorry and that you do not have that information available. Be brief and keep your responses short.:
  ==============================
  Context: {context}
  ==============================
  Current conversation: {chat_history}
  
  user: {question}
  assistant:`;

export async function POST(req: Request) {
  const loader = new TextLoader(
    path.resolve("src/app/api/data/atharvdata.txt")
  );

  try {
    // Extract the `messages` from the body of the request
    const { messages } = await req.json();

    const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);

    const currentMessageContent = messages[messages.length - 1].content;

    const docs = await loader.load();

    const prompt = PromptTemplate.fromTemplate(TEMPLATE);

    const model = new ChatOpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
      model: "gpt-3.5-turbo",
      temperature: 0,
      streaming: true,
      verbose: true,
    });

    /**
     * Chat models stream message chunks rather than bytes, so this
     * output parser handles serialization and encoding.
     */
    const parser = new HttpResponseOutputParser();

    const chain = RunnableSequence.from([
      {
        question: (input) => input.question,
        chat_history: (input) => input.chat_history,
        context: () => formatDocumentsAsString(docs),
      },
      prompt,
      model,
      parser,
    ]);

    // Convert the response into a friendly text-stream
    const stream = await chain.stream({
      chat_history: formattedPreviousMessages.join("\n"),
      question: currentMessageContent,
    });

    // Respond with the stream
    return new StreamingTextResponse(
      stream.pipeThrough(createStreamDataTransformer())
    );
  } catch (e: any) {
    // return Response.json({ error: e.message }, { status: e.status ?? 500 });
    return new Response(JSON.stringify({ error: e, message: e.message }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
