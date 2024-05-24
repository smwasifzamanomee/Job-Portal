"use client";
import config from "@/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { AxiosError } from "axios";

type formData = {
    user_type: string,
    username: string,
    email: string,
    password: string,
}

const registerQuery = () => {
    const queryClient = useQueryClient();

    const createAccount = useMutation({
        mutationFn: async (formData: formData) => {
            const url = config.api_url + "api/register/";
            const data = await axios.post(url, formData);
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
            queryClient.invalidateQueries({ queryKey: ['register'] });
          },
        });
    return { createAccount };
}

export {
    registerQuery
}