import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Worker } from '../types/worker';

export const workersApi = createApi({
  reducerPath: 'workersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:7047/api/',
    credentials: 'include'
  }),
  tagTypes: ['Worker'],
  endpoints: (builder) => ({
    getAllWorkers: builder.query<Worker[], void>({
      query: () => 'Worker',
      providesTags: ['Worker'],
    }),
    getWorkerById: builder.query<Worker, string>({
      query: (id) => `Worker/${id}`,
    }),
    addWorker: builder.mutation<Worker, Partial<Worker>>({
      query: (worker) => ({
        url: 'Worker/addWorker',
        method: 'POST',
        body: worker,
      }),
      invalidatesTags: ['Worker'],
    }),
    updateWorker: builder.mutation<void, Worker>({
      query: (worker) => ({
        url: `Worker/${worker.workerId}`,
        method: 'PUT',
        body: worker,
      }),
      invalidatesTags: ['Worker'],
    }),
    deleteWorker: builder.mutation<void, { id: string; name: string }>({
      query: ({ id, name }) => ({
        url: `Worker/${id}?name=${encodeURIComponent(name)}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Worker'],
    }),
    getAmountOfEachType: builder.query<Record<string, number>, void>({
      query: () => 'Worker/getAmountOfEachType',
    }),
  }),
});

export const {
  useGetAllWorkersQuery,
  useGetWorkerByIdQuery,
  useAddWorkerMutation,
  useUpdateWorkerMutation,
  useDeleteWorkerMutation,
  useGetAmountOfEachTypeQuery,
} = workersApi;
