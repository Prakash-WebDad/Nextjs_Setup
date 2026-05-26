"use client";
import { useEffect } from "react";
import { store } from "../store/store";
import {
    logout,
    refreshToken,
} from "../store/slice/authSlice";
import {
    setupTokenRefresh,
} from "../utils/setupTokenRefresh";

import {
    setLogoutHandler,
} from "../api/FetchApi";

export default function AuthBootstrap(): null {
    useEffect(() => {
        setupTokenRefresh({
            store,
            logoutAction: logout,
            refreshTokenAction: refreshToken,
        });
        setLogoutHandler((): void => {
            store.dispatch(logout());
        });
    }, []);

    return null;
}