"use client";
import React from "react";

const Footer = () => {
  return (
    <footer className="container z-10">
      <div className=" bottom-4 container py-10 rounded-[50px] justify-center items-center flex flex-col xl:gap-14 lg:gap-10 md:gap-8 gap-2 ">
        <div className="flex w-full xl:flex-row flex-col">
          <div className="flex flex-col xl:w-1/2 lg:w-1/2 w-full  ">
            <h3 className="font-bold font-dmsans  text-white text-[32px] sm:text-[24px] uppercase">
              <span className="text-[#82CE52]">Job</span> Portal
            </h3>
            <h4 className=" text-[#fff] text-[16px] mt-5">
              Is the best plan for job seekers and employers to find the best
            </h4>
          </div>
          <div className="xl:w-1/2 w-full flex gap-4 justify-between mt-2 sm:grid sm:grid-cols-2 text-white">
            <div className="">
              <h2 className="font-semibold  text-[20px] text-justify tracking-[-0.40px] leading-[30px] whitespace-nowrap xl:mb-10 lg:mb-10 mb-4">
                Company
              </h2>
              <ul className="flex flex-col xl:gap-y-8 lg:gap-y-8 gap-y-4 text-sm ">
                <li className="cursor-pointer hover:text-[#82CE52]">
                  About Us
                </li>

                <li className="cursor-pointer hover:text-[#82CE52]">
                  Our Partners
                </li>
              </ul>
            </div>
            <div className="">
              <h1 className="font-semibold text-white text-[20px] text-justify tracking-[-0.40px] leading-[30px] whitespace-nowrap xl:mb-10 lg:mb-10 mb-4">
                Resources
              </h1>
              <ul className="flex flex-col xl:gap-y-8 lg:gap-y-8 gap-y-4 text-sm">
                <li className="cursor-pointer hover:text-[#82CE52]">Blog</li>
                <li className="cursor-pointer hover:text-[#82CE52]">FAQ</li>
              </ul>
            </div>
            <div className="">
              <p className="font-semibold text-white text-[20px] text-justify tracking-[-0.40px] leading-[30px] whitespace-nowrap xl:mb-10 lg:mb-10 mb-4">
                Follow Us
              </p>
              <ul className="flex flex-col xl:gap-y-8 lg:gap-y-8 gap-y-4 text-sm">
                <li className="cursor-pointer hover:text-[#82CE52]">
                  Facebook
                </li>
                <li className="cursor-pointer hover:text-[#82CE52]">
                  Instagram
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center mt-5">
          <div className="h-[1px] bg-gray-400 w-[29%] md:hidden sm:hidden xsm:hidden" />
          <h5 className="font-normal text-white text-[16px] tracking-[0.80px] w-[40%] px-2 text-center sm:w-full xsm:w-full">
            © 2024 Job Portal. All rights reserved.
          </h5>
          <div className="h-[1px] bg-gray-400 w-[29%] md:hidden sm:hidden xsm:hidden" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
