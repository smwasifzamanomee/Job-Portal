import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import { User, Session } from "next-auth";
import axios, { AxiosError } from "axios";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        try {
          const { email, password } = credentials as {
            email: string;
            password: string;
          };
          const response = await axios({
            method: "POST",
            data: {
              username: email,
              password: password,
            },
          });
          if (response.status === 200) {
            return response.data;
          }
        } catch (error) {
          if(axios.isAxiosError(error)){
            const axiosError = error as AxiosError
            const status = axiosError.response?.status
            if(status === 500){
             throw new Error("internal_server_error")
            }
            if(status === 400){
              throw new Error("bad_request")
            }
            if(status === 404){
              throw new Error("user_not_found")
            }
            if(status === 401){
             throw new Error("unauthorized")
            }
          }
          throw new Error("unknown_error")
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  pages: {
    signIn: "/login",
  },
};