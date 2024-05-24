"use client";

import config from "@/config";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getCookie } from "cookies-next";
import { AxiosError } from "axios";

const authData = getCookie("authData");

const token = authData ? JSON.parse(authData) : null;

export type jobListing = {
    id?: number,
    title: string,
    description: string,
}

const useGetCreateJob = () => {
const getAllCreateJobQuery = useQuery<jobListing>({
    queryKey: ["jobListing"],
    queryFn: async () => {
        const url = config.api_url + "api/job-listing/";
        const data = await axios(url, {
            method: "GET",
            headers: {
            Authorization: `Bearer ${(token as { access_token?: string })?.access_token}`,
            }
        });
        return data.data;
    },
});
  return { getAllCreateJobQuery };
};

const useCreateJob = () => {
    const queryClient = useQueryClient();
    const createJob = useMutation({
        mutationFn: async (formData: jobListing) => {
            const url = config.api_url + "api/job-listing/";
            const data = await axios.post(url, formData, {
                headers: {
                    Authorization: `Bearer ${(token as { access_token?: string })?.access_token}`,
                }
            });
            return data.data;
        },
        onError(error: AxiosError) {
            const status = error.response?.status;
            if (status === 500) {
                console.log("Internal server error")
            }
            throw error;
        },
        onSettled() {
            queryClient.invalidateQueries({ queryKey: ['jobListing'] });
        },
    });
    return { createJob };
}

const useModifyJob = () => {
    const queryClient = useQueryClient();
    const modifyJob = useMutation({
        mutationFn: async (formData: jobListing) => {
            const url = config.api_url + `api/job-listing/${formData.id}/`;
            const data = await axios.put(url, formData, {
                headers: {
                    Authorization: `Bearer ${(token as { access_token?: string })?.access_token}`,
                }
            });
            return data.data;
        },
        onError(error: AxiosError) {
            const status = error.response?.status;
            if (status === 500) {
                console.log("Internal server error")
            }
            throw error;
        },
        onSettled() {
            queryClient.invalidateQueries({ queryKey: ['jobListing'] });
        },
    });
    return { modifyJob };
}

const useDeleteJob = () => {
    const queryClient = useQueryClient();
    const deleteJob = useMutation({
        mutationFn: async (id: string) => {
            const url = config.api_url + `api/job-listing/${id}/`;
            const data = await axios.delete(url, {
                headers: {
                    Authorization: `Bearer ${(token as { access_token?: string })?.access_token}`,
                }
            });
            return data.data;
        },
        onError(error: AxiosError) {
            const status = error.response?.status;
            if (status === 500) {
                console.log("Internal server error")
            }
            throw error;
        },
        onSettled() {
            queryClient.invalidateQueries({ queryKey: ['jobListing'] });
        },
    });
    return { deleteJob };
}

export {
    useGetCreateJob,
    useCreateJob,
    useModifyJob,
    useDeleteJob
}