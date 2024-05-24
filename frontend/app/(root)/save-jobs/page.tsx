"use client";

import {
  saveJob,
  useDeleteSaveJob,
  useGetSaveJob,
} from "@/hooks/reactQuery/SaveJobQuery";
import React from "react";

const page = () => {
  const { getAllSaveJobQuery } = useGetSaveJob();
  const { deleteSaveJob } = useDeleteSaveJob();

  const handleDeleteItem = (id: string) => {
    deleteSaveJob.mutate(id, {
      onSuccess: () => {
        console.log("Job deleted successfully");
      },
      onError: () => {
        console.log("Failed to delete job");
      },
    });
  };

  return (
    <div className="container mx-auto mt-32 min-h-screen md:py-10 sm:py-10">
      <h1 className="xl:text-[50px] md:text-[30px] sm:text-[20px] lg:text-[40px] mb-4 sm:mb-2 uppercase flex justify-center items-center mt-32 text-[#82CE52]">
        Save Job
      </h1>

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {Array.isArray(getAllSaveJobQuery?.data) &&
            getAllSaveJobQuery?.data.map((item: saveJob) => (
              <tr key={item.id}>
                <td className="py-2 px-4 border-b text-center">{item.title}</td>
                <td className="py-2 px-4 border-b text-center">
                  {item.description}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    className="bg-red-500 text-white py-1 px-2 rounded"
                    onClick={() => {
                      handleDeleteItem(String(item.id));
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default page;
