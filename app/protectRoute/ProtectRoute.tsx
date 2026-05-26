"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

interface RootState {
  auth: {
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
  };
}

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();

  const { token, isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth,
  );

  const [mounted, setMounted] = useState(false);
  const protectedRoutes = [
    "/contact",
  ];

  const isProtectedRoute = protectedRoutes.includes(pathname);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (
      mounted &&
      isProtectedRoute &&
      !isLoading &&
      (!token || !isAuthenticated)
    ) {
      router.replace("/login");
    }
  }, [
    mounted,
    isProtectedRoute,
    token,
    isAuthenticated,
    isLoading,
    router,
  ]);

  if (!mounted) return null;

  if (
    isProtectedRoute &&
    (isLoading || !token || !isAuthenticated)
  ) {
    return null;
  }

  return children;
}