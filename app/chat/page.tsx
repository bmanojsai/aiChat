"use client";
import { useState, useEffect, useRef } from "react";
import ApiKeyModal from "../ApiKeyModal";
import { getApiKeyFromLocalStorage } from "@/helpers/localStorage";
import askQuestionToOpenAI from "@/helpers/apiCalls";
import { useSession, signIn } from "next-auth/react";
import { AddAnswer, AddQuestion, convertToArray } from "@/helpers/chatManage";

export default function Chat() {
  const [question, setQuestion] = useState<string | undefined>();
  const [modalState, setModalState] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<string>(
    "@#$A.Hi! How can I help You?"
  );

  interface UseRef {
    current: any;
  }

  const scrollToEndRef: UseRef = useRef<UseRef>(null);

  const scrollToEnd = () => {
    scrollToEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToEnd();
  }, [chatHistory]);

  const { data: session, status } = useSession();
  if (status === "unauthenticated") signIn();

  useEffect(() => {
    (async () => {
      const api_key_parsed = await getApiKeyFromLocalStorage();

      if (!api_key_parsed || api_key_parsed?.length <= 0) setModalState(true);
    })();
  }, []);

  const CloseModal = () => {
    setModalState(false);
  };

  const askQuestion = async () => {
    const api_key_parsed = await getApiKeyFromLocalStorage();

    if (!api_key_parsed) setModalState(true);

    if (!question || question?.length <= 0) {
      alert("Question can't be empty!");
      return null;
    }
    setQuestion("");
    const updatedChatAfterQuestion = AddQuestion(chatHistory, question);
    setChatHistory(updatedChatAfterQuestion);
    const answer: any = await askQuestionToOpenAI(question);
    const updatedChatAfterAnswer = AddAnswer(
      updatedChatAfterQuestion,
      answer?.choices?.[0]?.text
    );
    setChatHistory(updatedChatAfterAnswer);
  };

  const chatPrenst = convertToArray(chatHistory)?.map(
    (text: string, index: number) => {
      if (text.startsWith("A.")) {
        return (
          <p key={index} className="chat-by-ai">
            {text.slice(2)}
          </p>
        );
      }
      if (text.startsWith("Q.")) {
        return (
          <p key={index} className="chat-by-user">
            {text.slice(2)}
          </p>
        );
      }
    }
  );

  return (
    <div className="bg-slate-300 w-full h-[80vh] lg:h-[75vh] flex flex-col shadow-current shadow-sm rounded-sm ">
      <div className="flex flex-wrap p-2">
        <p className="bg-white px-2 py-1 my-1 mx-1 rounded-md  text-[12px]">
          Model: text-davinci-003
        </p>
        <p className="bg-white px-2 py-1 my-1 mx-1 rounded-md text-[12px]">
          Max Token: 10
        </p>
        <p className="bg-white px-2 py-1 my-1 mx-1 rounded-md text-[12px]">
          Temperature: 1
        </p>
        <p className="bg-white px-2 py-1 my-1 mx-1 rounded-md text-[12px]">
          Price: $0.0200 / 1K tokens
        </p>
      </div>

      <div className="bg-white flex-1 px-4 py-2 overflow-scroll">
        {chatPrenst}
        <div ref={scrollToEndRef}></div>
      </div>

      <div className=" bg-white w-[100%] items-center flex py-2 ">
        <div
          className="px-1 py-1 mx-1 lg:px-2 lg:py-2 lg:mx-2 flex justify-center items-center rounded-full cursor-pointer"
          onClick={() =>
            setChatHistory(
              "A.It's always great to start fresh. Ask me anything!"
            )
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 sm:w-6 sm:h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="first"
          name="first"
          className=" bg-slate-300 text-black  w-[80%] lg:h-8 md:flex-1 rounded-sm p-1"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
        />
        <div
          className="bc-dark-blue-color text-white px-2 py-2 mx-1 lg:mx-3 flex justify-center items-center rounded-full hover:cursor-pointer"
          onClick={askQuestion}
        >
          <p className="mx-2 hidden sm:block">Ask</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 sm:w-6 sm:h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </div>
      </div>

      {modalState && <ApiKeyModal closeModal={CloseModal} />}
    </div>
  );
}
