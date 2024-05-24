"use client";

import {
  jobListing,
  useCreateJob,
  useDeleteJob,
  useGetCreateJob,
  useModifyJob,
} from "@/hooks/reactQuery/CreateJobQuery";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [modifyId, setModifyId] = useState<number>(0);

  const { getAllCreateJobQuery } = useGetCreateJob();
  console.log(getAllCreateJobQuery?.data);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ title: "", description: "" });
    setIsUpdate(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { createJob } = useCreateJob();

  const handleAddItem = () => {
    const payload = {
      title: formData.title,
      description: formData.description,
    };
    createJob.mutate(payload, {
      onSuccess: (data) => {
        toast.success("New Job created successfully");
        setFormData({ title: "", description: "" });
        handleCloseModal();
      },
      onError: () => {
        console.log("Failed to create job");
      },
    });
  };

  const { deleteJob } = useDeleteJob();
  const handleDeleteItem = (id: string) => {
    deleteJob.mutate(id, {
      onSuccess: () => {
        toast.success("Job deleted successfully");
      },
      onError: () => {
        console.log("Failed to delete job");
      },
    });
  };

  const { modifyJob } = useModifyJob();

  const handleUpdateItem = () => {
    const payload = {
        id: modifyId,
        title: formData.title,
        description: formData.description,
    };
    modifyJob.mutate(payload, {
      onSuccess: (data) => {
        toast.success("Job updated successfully");
        setFormData({ title: "", description: "" });
        handleCloseModal();
      },
      onError: () => {
        console.log("Failed to update job");
      },
    });
  };

  return (
    <div className="container mx-auto mt-32 min-h-screen md:py-10 sm:py-10">
      <h1 className="xl:text-[50px] md:text-[30px] sm:text-[20px] lg:text-[40px] mb-4 sm:mb-2 uppercase flex justify-center items-center mt-32 text-[#82CE52]">
        Create Job
      </h1>
      <button
        className="bg-[#82CE52] text-white py-2 px-4 rounded mb-4"
        onClick={handleOpenModal}
      >
        Add Item
      </button>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {Array.isArray(getAllCreateJobQuery?.data) &&
            getAllCreateJobQuery?.data.map((item: jobListing) => (
              <tr key={item.id}>
                <td className="py-2 px-4 border-b text-center">{item.title}</td>
                <td className="py-2 px-4 border-b text-center">
                  {item.description}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    className="bg-blue-500 text-white py-1 px-2 rounded mr-2"
                    onClick={() => {
                      setIsUpdate(true);
                      setFormData({
                        title: item.title,
                        description: item.description,
                      });
                      setModifyId(Number(item.id));
                      handleOpenModal();
                    }}
                  >
                    Update
                  </button>
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

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl mb-4">
              {isUpdate ? "Update Item" : "Add Item"}
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 text-black py-2 px-4 rounded mr-2"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded"
                onClick={isUpdate ? handleUpdateItem : handleAddItem}
              >
                {isUpdate ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
