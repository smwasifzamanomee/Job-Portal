"use client";

import Card from "@/components/ui/Card";
import { job, useGetAllJob } from "@/hooks/reactQuery/AllJobQuery";
import Link from "next/link";
import React from "react";

const AllJobs = () => {
  const { getAllJobQuery } = useGetAllJob();
  const topJobs = Array.isArray(getAllJobQuery?.data)
    ? getAllJobQuery?.data.slice(0, 3)
    : [];

  return (
    <section className="flex items-center flex-col justify-center xl:h-[80vh] lg:h-[80vh] min-h-screen md:py-10 sm:py-10">
      <div className="container mx-auto py-20">
        <h1 className="text-2xl font-bebas uppercase text-[#82CE52]">
          Top Jobs
        </h1>
        <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-4 py-20">
          {getAllJobQuery?.isLoading ? (
            <div className="text-center text-white">Loading...</div>
          ) : getAllJobQuery?.isError ? (
            <div className="text-center">Error</div>
          ) : topJobs.length === 0 ? (
            <div className="text-center">No Jobs Found</div>
          ) : (
            topJobs.map((item: job) => <Card key={item.id} {...item} />)
          )}
        </div>
        <div className="flex justify-center items-center">
          <Link
            href={"/find-jobs"}
            className="font-bebas text-center bg-[#82CE52] text-white  py-2 mt-4 rounded-full border-none text-[26px] sm:py-2 w-[200px]"
          >
            See More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AllJobs;
