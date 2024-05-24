"use client";

import { usePathname } from "next/navigation"

const useMenus = () => {
    const pathname = usePathname();

    const menus = [
        {
            id: 1,
            route: "/",
            name: "home",
        },
        {
            id: 2,
            route: "/find-jobs", 
            name: "find jobs",
        },
        {
            id: 3,
            route: "/contact-us",
            name: "contact us",
        },
    ];

    return { menus, pathname };
};

export default useMenus;