"use client";
import { getCookie } from "cookies-next";
import React, { useEffect, useRef } from "react";
import { useState } from "react";

const page = () => {
  const headerRef = useRef<HTMLElement>(null);

  const [isMounted, setIsMounted] = useState(false);

  const authData = isMounted ? getCookie("authData") : null;


  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      const header = headerRef.current?.classList;
      if (window.scrollY > 80) {
        if (!header?.contains("bg-[#ffffff]")) {
          header?.add("bg-[#ffffff]");
        }
        if (!header?.contains("shadow-md")) {
          header?.add("shadow-md");
        }
      } else {
        header?.remove("bg-[#ffffff]");
        header?.remove("shadow-md");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen md:py-10 sm:py-20">
      <div className="w-[700px] md:w-[500px] bg-white rounded-lg shadow md:mt-0 sm:w-[300px] xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Profile
          </h1>
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Username
          </label>

          <input
            type="text"
            name="username"
            value={authData ? JSON.parse(authData)?.user_info?.username : ""}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            disabled
          />
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Email
          </label>
          <input
            type="text"
            name="email"
            value={authData ? JSON.parse(authData)?.user_info?.email : ""}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            disabled
          />
          <label
            htmlFor="user_type"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            User Type
          </label>
          <input
            type="text"
            name="user_type"
            value={authData ? JSON.parse(authData)?.user_info?.user_type : ""}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            disabled
          />
        </div>
      </div>
    </div>
  );
};

export default page;
