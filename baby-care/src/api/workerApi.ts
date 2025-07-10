import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Worker } from '../features/workers/types';

export const workersApi = createApi({
  reducerPath: 'workersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:7047/api/' }),
  tagTypes: ['Worker'],
  endpoints: (builder) => ({
    getAllWorkers: builder.query<Worker[], void>({
      query: () => 'WorkerManagement',
      providesTags: ['Worker'],
    }),
    getWorkerById: builder.query<Worker, string>({
      query: (id) => `WorkerManagement/${id}`,
    }),
    addWorker: builder.mutation<Worker, Partial<Worker>>({
      query: (worker) => ({
        url: 'WorkerManagement',
        method: 'POST',
        body: worker,
      }),
      invalidatesTags: ['Worker'],
    }),
  updateWorker: builder.mutation<void, Worker>({
  query: (worker) => ({
    url: `WorkerManagement/${worker.workerId}`,
    method: 'PUT',
    body: worker,
  }),
  invalidatesTags: ['Worker'],
}),

    deleteWorker: builder.mutation<void, { id: string; name: string }>({
      query: ({ id, name }) => ({
        url: `WorkerManagement/${id}?name=${encodeURIComponent(name)}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Worker'],
    }),
  }),
});

export const {
  useGetAllWorkersQuery,
  useGetWorkerByIdQuery,
  useAddWorkerMutation,
  useUpdateWorkerMutation,
  useDeleteWorkerMutation,
} = workersApi;
