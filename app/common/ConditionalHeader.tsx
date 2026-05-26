"use client";
import { usePathname } from "next/navigation";
import Header from "../components/Common/Header/Header";

function ConditionalHeader() {
    const pathname = usePathname();

    const authRoutes = [
        "/",
    ];

    const isAuthRoute = authRoutes.includes(pathname);

    return (
        <>
            {isAuthRoute &&
                <Header />
            }
        </>
    );
}

export default ConditionalHeader;