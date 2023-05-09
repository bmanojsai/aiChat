import Image from "next/image";
import Link from "next/link";

const Home: React.FC = () => {
  return (
    <main className="w-full h-full ">
      <div className="flex justify-around flex-wrap-reverse">
        <div className=" flex flex-col justify-center items-start max-w-[80%] m-4 lg:max-w-[40%]">
          <h1 className="tc-dark-blue-color text-lg my-3  lg:text-2xl  xl:text-[45px] font-black ">
            Having Questions ?
          </h1>
          <p className="tc-dark-grey-color  my-3  xl:mt-5 xl:mb-8 xl:pb-5">
            get clarified with aiChat, an AI tool based out of chatGPT. go ahead
            and try now!
          </p>
          <Link
            href={"/chat"}
            className=" bc-sky-blue-color tc-white-color  px-5 py-3 my-6 mx-auto lg:ml-0 rounded-full"
          >
            Chat Now
          </Link>
        </div>

        <div className=" h-[250px] w-[250px] md:h-[400px] md:w-[400px] xl:h-[700px] xl:w-[700px] relative">
          <Image
            src={"/mobile_chatting.png"}
            alt="mobile_chatting"
            fill
            className=" object-contain"
          ></Image>
        </div>
      </div>
    </main>
  );
};

export default Home;
