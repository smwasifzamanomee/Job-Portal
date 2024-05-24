"use client";

import { usePathname } from 'next/navigation';
import React from 'react';


let content: string = '';

const Title = () => {
  const pathname = usePathname();

  if (pathname === '/find-jobs') {
    content = 'Find Jobs';
  } else if (pathname === '/contact-us') {
    content = 'Contact Us';
  }

  return (
    <div className="relative p-4">
      <h1 className="xl:text-[50px] md:text-[30px] sm:text-[20px] lg:text-[40px] mb-4 sm:mb-2 uppercase flex justify-center items-center mt-32 text-[#82CE52]">
        {content}
      </h1>
    </div>
  );
};

export default Title;