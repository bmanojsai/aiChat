"use client";

import Link from "next/link";
import { useState } from "react";
import { setApiKeyToLocalStorage } from "@/helpers/localStorage";

const ApiKeyModal: React.FC<{ closeModal: () => void }> = ({
  closeModal,
}): JSX.Element => {
  const [apiKey, setApiKey] = useState<string | undefined>();

  const storeApiKey: () => void = async () => {
    // note : to check whether user entered api key is valid or not, we can make an dummy api call with it and confirm
    if (apiKey && apiKey?.length == 51) {
      //TODO : check for api call successfull
      //if success -> store
      //else throw alert
      await setApiKeyToLocalStorage(apiKey);
      closeModal();
    }else{
      alert("Invalid Api Key!")
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full h-[110vh] lg:h-screen backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white shadow-current shadow-md rounded-md m-4 mb-[100px] max-w-[90%] lg:max-w-[40%] lg:mb-0">
        <div className="bg-slate-300 p-2 flex justify-between items-center rounded-t-md">
          <p className="text-md lg:text-lg">Add your API key</p>

          <div className="hover:cursor-pointer" onClick={closeModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>

        <div className="bg-white p-2">
          <div className="flex justify-center items-center my-2">
            <p className="text-[12px] mr-1">API KEY:</p>
            <input
              type="input"
              id="apiKey"
              name="apiKey"
              className="flex-1 bg-slate-200 rounded-sm p-1 "
              value={apiKey}
              onChange={(event) => setApiKey(event.target.value)}
            />
          </div>
          <p className="text-[12px] lg:text-md my-2">
            Get your personal API key{" "}
            <Link
              href={"https://platform.openai.com/account/api-keys"}
              className=" hover:underline hover:underline-offset-1 text-blue-300"
            >
              here
            </Link>
            .
          </p>
          <p className="text-[12px] lg:text-md my-2">
            Don't worry! Your api key will be safely encrypted and stored in
            your browser and never be shared with any third-party apps.
          </p>
        </div>

        <div className="flex justify-center p-2 ">
          <button
            className="bc-dark-blue-color text-white px-2 py-1 text-sm lg:text-md rounded-md "
            onClick={storeApiKey}
          >
            confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;
