import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7047/api/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    checkUser: builder.mutation({
      query: ({ id, email }) => ({
        url: `Login/login?id=${encodeURIComponent(id)}&email=${encodeURIComponent(email)}`,
        method: "POST",
        credentials: "include",
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: "Babies/addBaby",
        method: "POST",
        body: userData,
        credentials: "include",
      }),
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: "Login/refresh",
        method: "POST",
        credentials: "include",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "Login/logout",
        method: "POST",
        credentials: "include",
      }),
    }),
    sendVerificationCode: builder.mutation({
      query: ({ email }) => ({
        url: "Login/sendVarificationCode",
        method: "POST",
        params: { email },
      }),
    }),
    validateOTP: builder.mutation({
      query: ({ email, otp }) => ({
        url: "Login/validate",
        method: "POST",
        params: { email, otp },
      }),
    }),
  }),
});

export const {
  useCheckUserMutation,
  useRegisterMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useSendVerificationCodeMutation,
  useValidateOTPMutation,
} = authApi;