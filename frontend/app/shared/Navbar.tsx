"use client";

import Button from "@/components/ui/Button";
import config from "@/config";
import { useAuth } from "@/context/authStore";
import randomString from "@/helpers/randomId";
import useMenus from "@/hooks/custom/useMenus";
import useOutsideClickHandler from "@/hooks/custom/useOutsideClickHandler";
import { faker } from "@faker-js/faker";
import { deleteCookie, getCookie } from "cookies-next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

type DropDownList = {
  id: string;
  name: string;
  route: string;
};

const lists: DropDownList[] = [
  { id: randomString(), name: "Profile", route: "/profile" },
  { id: randomString(), name: "Save Jobs", route: "/save-jobs" },
  { id: randomString(), name: "Create Jobs ", route: "/create-jobs" },
];

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { menus } = useMenus();
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const close = () => setShowMobileMenu(false);
  const closeRef = useOutsideClickHandler<HTMLUListElement>(close);
  const closeDropdown = () => setIsOpenDropdown(false);

  const closeDropdownRef =
    useOutsideClickHandler<HTMLUListElement>(closeDropdown);

  const router = useRouter();
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

  const handleSignOut = () => {
    closeDropdown();
    deleteCookie("authData");
    location.reload();
  };

  return (
    <>
      <header
        ref={headerRef}
        className="h-[100px] flex items-center justify-center fixed left-0 right-0 top-0 z-10 bg-black backdrop-blur-lg bg-opacity-50 transition-all duration-500"
      >
        <nav className="container mx-auto flex items-center justify-between gap-5">
          <Link href={"/"}>
            <h1 className="text-xl text-white">JOB PORTAL</h1>
          </Link>
          <div className="flex items-center gap-4 md:hidden sm:hidden font-bebas text-white uppercase">
            {menus.map((menu) => (
              <Link key={menu.id} href={menu.route}>
                {menu.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {authData ? (
              <div className="relative w-[160px]  md:hidden sm:hidden font-dm">
                <button
                  onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                  type="button"
                  className="w-full flex justify-between items-center gap-2 text-white"
                >
                  <img
                    src={faker.image.avatar()}
                    alt="avatar"
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                  <p className="capitalize font-bold text-white">
                    {JSON.parse(authData)?.user_info?.username}
                  </p>
                  <IoIosArrowDown size={25} className="pointer-events-none" />
                </button>
                <ul
                  ref={closeDropdownRef}
                  className={` ${
                    isOpenDropdown
                      ? " h-[145px] bg-black/40 shadow border border-white/20 z-20 backdrop-blur-2xl rounded-md "
                      : "h-0 opacity-0 -z-20"
                  } transition-all duration-300 ease-in-out absolute top-12 left-0 right-0 p-2 space-y-2 capitalize`}
                >
                  {/* use_type when company show profile and create job and when candidate show profile and save job */}
                  {
                    JSON.parse(authData)?.user_info?.user_type === "company" ? (
                      <>
                        <li className="text-white hover:text-[#9CFF5E]">
                          <Link href="/profile">Profile</Link>
                        </li>
                        <li className="text-white hover:text-[#9CFF5E]">
                          <Link href="/create-jobs">Create Jobs</Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="text-white hover:text-[#9CFF5E]">
                          <Link href="/profile">Profile</Link>
                        </li>
                        <li className="text-white hover:text-[#9CFF5E]">
                          <Link href="/save-jobs">Save Jobs</Link>
                        </li>
                      </>
                    )
                  }                  
                  <li
                    style={{
                      display: isOpenDropdown ? "block" : "none",
                    }}
                    className="text-white hover:text-[#9CFF5E]"
                  >
                    <button className="underline" onClick={handleSignOut}>
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                href={"/login"}
                className="px-6 md:hidden sm:hidden bg-[#82CE52] text-white rounded-full py-2 uppercase"
              >
                login
              </Link>
            )}
          </div>
          <button
            onClick={() => {
              setShowMobileMenu(!showMobileMenu);
            }}
            type="button"
            className="xl:hidden lg:hidden text-white"
          >
            <AiOutlineMenu size={30} className="pointer-events-none" />
          </button>
        </nav>
      </header>
      {/* Mobile Navbar */}
      <div
        className={`transform ${
          showMobileMenu ? "translate-x-0" : "translate-x-[100%] "
        } fixed top-0 left-0 right-0 bottom-0 bg-dark/30 z-20 backdrop-blur-2xl transition-transform duration-300`}
      >
        <div className="text-end p-2">
          <button type="button" onClick={close} className="text-white p-4">
            <AiOutlineClose size={25} />
          </button>
        </div>
        <ul
          ref={closeRef}
          className="list-none m-0 text-center space-y-2 mt-20 font-dm"
        >
          {[...menus].map((menu) => (
            <li
              key={menu.id}
              onClick={() => {
                router.push(menu.route);
                close();
              }}
              className="text-white capitalize"
            >
              {menu.name}
            </li>
          ))}
        </ul>
        {/* <div className="text-white text-center mt-8">
          <button className="rounded-full xl:hidden lg:hidden">login</button>
        </div> */}
      </div>
    </>
  );
};

export default Navbar;