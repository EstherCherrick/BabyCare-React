import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Baby } from '../types/baby';

export const babiesApi = createApi({
  reducerPath: 'babiesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:7047/api/',
    credentials: 'include',
  }),
  tagTypes: ['Baby'],
  endpoints: (builder) => ({
    getAllBabies: builder.query<Baby[], void>({
      query: () => 'Babies/getAllBabies',
      providesTags: ['Baby'],
    }),
    getBabyById: builder.query<Baby, string>({
      query: (id) => `Babies/getBaby/${id}`,
    }),
    addBaby: builder.mutation<Baby, Partial<Baby>>({
      query: (baby) => ({
        url: 'Babies/addBaby',
        method: 'POST',
        body: baby,
      }),
      invalidatesTags: ['Baby'],
    }),
    updateBabyDetails: builder.mutation<void, Baby>({
      query: (baby) => ({
        url: `Babies/${baby.babyId}`,
        method: 'PUT',
        body: baby,
      }),
      invalidatesTags: ['Baby'],
    }),
    deleteBaby: builder.mutation<void, string>({
      query: (id) => ({
        url: `Babies/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Baby'],
    }),
  }),
});

export const {
  useGetAllBabiesQuery,
  useGetBabyByIdQuery,
  useAddBabyMutation,
  useUpdateBabyDetailsMutation,
  useDeleteBabyMutation,
} = babiesApi;
