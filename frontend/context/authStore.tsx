"use client";

import Loader from "@/components/ui/Loader";
import { AuthData } from "@/types/auth";
import { getCookie, setCookie } from "cookies-next";
import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";



type ContextType = {
    authData: AuthData | null;
    setAuthData: Dispatch<SetStateAction<AuthData | null>>;
};

export const AuthContext = createContext<ContextType>({
    authData: null,
    setAuthData: (): void => { },
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authData, setAuthData] = useState<AuthData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    console.log("authData", authData);

    // read data from localstorage
    useEffect(() => {
        setLoading(true);
        const data = getCookie("authData") as string;
        if (data) {
            const parseData = JSON.parse(data);
            if (parseData && typeof parseData === "object") {
                setAuthData(parseData as AuthData);
            }
        }
        setLoading(false);
    }, []);

    if (loading) return <Loader />;

    return (
        <AuthContext.Provider
            value={{
                authData,
                setAuthData,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;