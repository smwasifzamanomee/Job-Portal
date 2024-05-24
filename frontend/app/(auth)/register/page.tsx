"use client";
import { registerQuery } from "@/hooks/reactQuery/RegisterQuery";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [formData, setFormData] = useState({
    user_type: "",
    username: "",
    email: "",
    password: "",
  });

  const { createAccount } = registerQuery();
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createAccount.mutate(formData, {
      onSuccess: (data) => {
        toast.success("Account created successfully");
        setFormData({
          user_type: "",
          username: "",
          email: "",
          password: "",
        });
        router.push("/login"); // Redirect to login page on success
      },
      onError: (error) => {
        console.log(error);
        toast.error("Failed to create account");
      },
    });
  };

  return (
    <section className="">
      <div className="flex flex-col items-center justify-center min-h-screen md:py-10 sm:py-20">
        <div className="w-[700px] md:w-[500px] bg-white rounded-lg shadow md:mt-0 sm:w-[300px] xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="user_type"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  User type
                </label>
                <select
                  name="user_type"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  value={formData.user_type}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select user type
                  </option>
                  <option value="company">Company</option>
                  <option value="candidate">Candidate</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Username / Company name
                </label>
                <input
                  type="text"
                  name="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Enter your username or company name"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Create an account
              </button>
              <p className="text-sm font-light">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
