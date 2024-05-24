"use client";

import config from "@/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type job =  {
    id?: number,
    title: string,
    description: string,
}

const useGetAllJob = () => {
  const getAllJobQuery = useQuery<job>({
    queryKey: ["allJob"],
    queryFn: async () => {
      const url = config.api_url + "api/all-jobs/";
      const data = await axios(url, {
        method: "GET",
      });
      return data.data;
    },
  });
  return { getAllJobQuery };
};

export {
    useGetAllJob
}