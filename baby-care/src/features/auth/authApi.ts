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
        url: "Login/checkUser", 
        method: "POST",
        params: { id, email }, 
      }),
    }),
register: builder.mutation({
  query: (userData) => ({
    url: "Babies/addBaby",
    method: "POST",
    body: userData,
    credentials: 'include', // Ensure cookies are sent with the request
  }),
}),
    sendVerificationCode: builder.mutation({
      query: ({ email }) => ({
        url: 'Login/sendVarificationCode', 
        method: 'POST',
        params: { email }, 
      }),
    }),
    validateOTP: builder.mutation({
      query: ({ email, otp }) => ({
        url: 'Login/validate', 
        method: 'POST',
        params: { email, otp }, 
      }),
    }),
  }),
});

export const { 
  useCheckUserMutation,
  useRegisterMutation,
  useSendVerificationCodeMutation,
  useValidateOTPMutation 
} = authApi;
