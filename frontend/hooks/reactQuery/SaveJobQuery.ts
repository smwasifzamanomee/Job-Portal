"use client";

import config from "@/config";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getCookie } from "cookies-next";
import { AxiosError } from "axios";

const authData = getCookie("authData");

const token = authData ? JSON.parse(authData) : null;

export type saveJob = {
    id?: number | string,
    title: string,
    description: string,
}

const useGetSaveJob = () => {
    const getAllSaveJobQuery = useQuery<saveJob>({
        queryKey: ["saveJob"],
        queryFn: async () => {
            const url = config.api_url + "api/save-job/";
            const data = await axios(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${(token as { access_token?: string })?.access_token}`,
                }
            });
            return data.data;
        },
    });
    return { getAllSaveJobQuery };
};

const useCreateSaveJob = () => {
    const queryClient = useQueryClient();
    const createSaveJob = useMutation({
        mutationFn: async (formData: saveJob) => {
            const url = config.api_url + `api/save-job/?job=${formData.id}`;
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
            queryClient.invalidateQueries({ queryKey: ['saveJob'] });
        },
    });
    return { createSaveJob };
}

const useDeleteSaveJob = () => {
    const queryClient = useQueryClient();
    const deleteSaveJob = useMutation({
        mutationFn: async (id: string) => {
            const url = config.api_url + `api/save-job/${id}/`;
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
            queryClient.invalidateQueries({ queryKey: ['saveJob'] });
        },
    });
    return { deleteSaveJob };
}


export {
    useGetSaveJob,
    useCreateSaveJob,
    useDeleteSaveJob
}