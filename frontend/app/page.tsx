import React from "react";
import { FaPlus } from "react-icons/fa";
import AllJobs from "./(root)/home/AllJobs";
import Link from "next/link";

const page = () => {
  return (
    <>
      <main
        className={`bg-[url('/banner.jpg')] bg-cover bg-no-repeat bg-center w-full min-h-screen py-20 relative flex flex-col space-y-14 items-center justify-center`}
      >
        <article className={`container mx-auto `}>
          <p className="font-bebas  xl:text-[40px] lg:text-[30px] text-[20px] font-bold tracking-tighter uppercase text-white">
            Your Dream –
          </p>
          <h1 className="font-bebas  xl:text-[80px] lg:text-[30px] text-[20px] font-bold tracking-tighter uppercase text-white">
            Job is Waiting!{" "}
          </h1>
          <p className="font-bebas  xl:text-[20px] lg:text-[30px] text-[20px] font-bold tracking-tighter uppercase text-white mb-4">
            Find Your Most Suitable Job Here.
          </p>
          <Link
            href="/find-jobs"
            className="font-bebas bg-[#82CE52] text-white  py-2 mt-4 rounded-full border-none text-[26px] w-[200px] sm:py-2 px-8 sm:px-4"
          >
            Find Jobs
          </Link>
          <div className="flex mt-24 ml-5 sm:ml-0 gap-12  sm:mt-10 xsm:mt-10 sm:grid xsm:grid sm:grid-cols-2 ">
            <div className="flex flex-col gap-2">
              <p className="text-5xl sm:text-3xl xsm:text-3xl font-bebas flex items-center gap-2 text-[#82CE52] m-0">
                25000{" "}
                <FaPlus className=" text-white text-[30px] sm:text-[20px] xsm:text-[20px] mb-1" />
              </p>
              <p className="font-bebas text-white text-[24px] m-0 uppercase tracking-tighter">
                Open Jobs
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-5xl sm:text-3xl xsm:text-3xl font-bebas flex items-center gap-2 text-[#82CE52] m-0">
                1000{" "}
                <FaPlus className=" text-white text-[30px] sm:text-[20px] xsm:text-[20px] mb-1" />
              </p>
              <p className="font-bebas text-white text-[24px] m-0 uppercase tracking-tighter">
                Companies
              </p>
            </div>
            <div className="flex flex-col gap-2 ">
              <p className="text-5xl sm:text-3xl xsm:text-3xl font-bebas flex items-center gap-2 text-[#82CE52] m-0">
                24/7{" "}
              </p>
              <p className="font-bebas text-white text-[24px] m-0 uppercase tracking-tighter">
                Live Support
              </p>
            </div>
          </div>
        </article>
      </main>
      <AllJobs />
    </>
  );
};

export default page;
