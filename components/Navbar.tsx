"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { DefaultSession } from "next-auth";
import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import ApiKeyModal from "./ApiKeyModal";

const Navbar: React.FC = (): JSX.Element => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [modalState, setModalState] = useState<boolean>(false);

  const pathName = usePathname();

  const { data: session } = useSession();
  const loggedInUserDetails: DefaultSession["user"] = session?.user;

  const signInContent: JSX.Element = (
    <button
      className="mx-3 text-sm md:text-md lg:text-[16px] "
      onClick={() => signIn()}
    >
      Sign In
    </button>
  );

  const profileDropDown: JSX.Element = (
    <div className="flex flex-col bg-slate-200 p-1 lg:hidden my-2 ">
      <div className="bg-white border-slate-100 border-2  p-1 m-1 text-[12px]">
        {loggedInUserDetails?.name}
      </div>

      <div className="bg-white border-slate-100 border-2  p-1 m-1 text-[12px]">
        {loggedInUserDetails?.email}
      </div>

      <button
        className="bg-white border-slate-100 border-2 p-1 m-1 text-[12px] text-left underline underline-offset-1"
        onClick={() => () => setModalState(true)}
      >
        Update API key
      </button>

      <button
        className="bg-white border-slate-100 border-2 p-1 m-1 text-[12px] text-left underline underline-offset-1"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </div>
  );

  const signOutContent: JSX.Element = (
    <>
      {showDropdown && (
        <div className=" hidden bg-slate-200 p-1 lg:block absolute top-[100px] right-[60px] z-40 w-[350px]">
          <div className="bg-white border-slate-100 border-2  p-1 m-1 text-[12px] w-[335px]">
            {loggedInUserDetails?.email}
          </div>

          <button
            className="bg-white border-slate-100 border-2 p-1 m-1 text-[12px] text-left w-[335px] underline underline-offset-1"
            onClick={() => setModalState(true)}
          >
            Update API Key
          </button>

          <button
            className="bg-white border-slate-100 border-2 p-1 m-1 text-[12px] text-left w-[335px] underline underline-offset-1"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </div>
      )}

      <div className="mx-3 text-sm md:text-md lg:text-[16px] hidden lg:block">
        {loggedInUserDetails?.name}
      </div>

      <Image
        src={loggedInUserDetails?.image || ""}
        alt="User profile image"
        width={30}
        height={30}
        className="rounded-full shadow-sm shadow-black cursor-pointer"
        onClick={() => setShowDropdown(!showDropdown)}
      />
    </>
  );

  return (
    <>
      <nav className="flex justify-between items-center py-5 ">
        <h1 className="tc-dark-blue-color md:text-lg lg:text-xl xl:text-2xl">
          <Link href={"../"}>
            <b>AI CHAT</b>
          </Link>
        </h1>

        <div className="flex max-w-[60%] items-center">
          {session ? signOutContent : signInContent}

          {pathName === "/" && (
            <Link href={"/chat"}>
              <p className="bc-sky-blue-color tc-white-color hidden sm:block px-5 py-2 ml-4 rounded-full  md:text-md ">
                Chat Now
              </p>
            </Link>
          )}
        </div>
      </nav>

      {showDropdown && profileDropDown}
      {modalState && <ApiKeyModal closeModal={() => setModalState(false)} />}
    </>
  );
};

export default Navbar;
