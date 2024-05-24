"use client";

import Card from "@/components/ui/Card";
import { useGetAllJob } from "@/hooks/reactQuery/AllJobQuery";
import React from "react";
import Title from "../home/Title";

const page = () => {
  const { getAllJobQuery } = useGetAllJob();
  const topJobs = Array.isArray(getAllJobQuery?.data)
    ? getAllJobQuery?.data
    : [];
  return (
    <section className="flex items-center flex-col justify-center min-h-screen md:py-10 sm:py-10">
      <div className="container mx-auto">
        <Title />
        <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-4 py-20">
          {topJobs.map((item) => (
            <Card key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default page;
