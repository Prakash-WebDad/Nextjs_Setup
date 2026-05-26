import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { FetchApi } from "../../api/FetchApi";

export interface User {
  _id?: string;
  firstName?: string;
  email?: string;
  mobile?: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  message: string | null;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface AuthResponse {
  success?: boolean;
  message?: string;
  user?: User;
  accessToken?: string;
  refreshToken?: string;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  message: null,
};

export const loginUser = createAsyncThunk<
  AuthResponse,
  LoginPayload,
  {
    rejectValue: string;
  }
>(
  "auth/loginUser",

  async (payload, thunkAPI) => {
    try {
      const res = await FetchApi<{
        data: AuthResponse;
      }>({
        endpoint: "/user/login",
        method: "POST",
        body: payload,
      });

      const data = res?.data;
      if (data?.success === false) {
        return thunkAPI.rejectWithValue(data?.message || "Login failed");
      }

      if (data?.accessToken) {
        localStorage.setItem(
          "tokenExpiry",
          String(Date.now() + 50 * 60 * 1000),
        );
        localStorage.setItem("loginTimestamp", String(Date.now()));
      }

      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message || "Login failed");
    }
  },
);

export const refreshToken = createAsyncThunk<
  AuthResponse,
  void,
  {
    state: {
      auth: AuthState;
    };
    rejectValue: string;
  }
>("auth/refreshToken", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const refreshTokenValue = state.auth.refreshToken;
  if (!refreshTokenValue) {
    return thunkAPI.rejectWithValue("No refresh token");
  }

  try {
    const res = await FetchApi<{
      data: AuthResponse;
    }>({
      endpoint: "/user/refresh",
      method: "POST",
      token: refreshTokenValue,
    });
    const data = res?.data;
    if (data?.accessToken) {
      localStorage.setItem("tokenExpiry", String(Date.now() + 50 * 60 * 1000));
    }
    return data;
  } catch {
    return thunkAPI.rejectWithValue("Session expired");
  }
});

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;
      state.message = null;
      localStorage.removeItem("tokenExpiry");
      localStorage.removeItem("loginTimestamp");
    },

    clearAuthError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;

        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.isLoading = false;
          state.user = action.payload?.user || null;
          state.accessToken = action.payload?.accessToken || null;
          state.refreshToken = action.payload?.refreshToken || null;
          state.isAuthenticated = true;
          state.message = action.payload?.message || "Login successful";
        },
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Login failed";
      })

      .addCase(
        refreshToken.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.accessToken = action.payload?.accessToken || null;
          state.isAuthenticated = true;
        },
      )
      .addCase(refreshToken.rejected, (state) => {
        state.isAuthenticated = false;
        state.accessToken = null;
        state.refreshToken = null;
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
