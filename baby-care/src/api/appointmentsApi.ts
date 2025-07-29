
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Appointment {
  id: number;
  workerId?: string;
  workerName?: string;
  workerType?: string;
  appointmentDate: string;
  startTime: string; 
  endTime?: string;
}

export interface BookAppointmentRequest {
  babyId: string;
  workerType: string;
  date: string; 
  time: string; 
}

export const appointmentsApi = createApi({
  reducerPath: 'appointmentsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:7047/api/AvailableAppointments',
    credentials: 'include',
  }),
  tagTypes: ['Appointments', 'AvailableAppointments'],
  endpoints: (builder) => ({
    getAllAvailableAppointments: builder.query<Appointment[], void>({
      query: () => ({
        url: `/all`,
        method: 'GET',
      }),
      providesTags: [{ type: 'AvailableAppointments' }],
    }),
    getAvailableAppointmentsByDate: builder.query<Appointment[], string>({
      query: (date) => ({
        url: `/findAvailableAppointmentsByDate?date=${date}`,
        method: 'GET',
      }),
      providesTags: (result, error, date) => [{ type: 'AvailableAppointments', id: date }],
    }),
    getAvailableAppointmentsByWorkerType: builder.query<Appointment[], string>({
      query: (workerType) => ({
        url: `/getAvailableAppointmentsByWorkerType?workerType=${workerType}`,
        method: 'GET',
      }),
      providesTags: [{ type: 'AvailableAppointments' }],
    }),
    bookAppointment: builder.mutation<void, BookAppointmentRequest>({
      query: ({ babyId, workerType, date, time }) => ({
        url: `https://localhost:7047/api/Appointments/add?babyId=${babyId}&workerType=${workerType}&date=${date}&time=${time}`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, { date }) => [
        { type: 'AvailableAppointments', id: date },
        { type: 'Appointments' },
      ],
    }),
    bookPhysicalTherapistAppointments: builder.mutation<void, { babyId: string; physiotherapistName: string; startDate: string; sessionsCount: number }>({
      query: ({ babyId, physiotherapistName, startDate, sessionsCount }) => ({
        url: `https://localhost:7047/api/Appointments/bookPhysicalTherapistAppointments?babyId=${babyId}&physiotherapistName=${physiotherapistName}&startDate=${startDate}&sessionsCount=${sessionsCount}`,
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'Appointments' }],
    }),
    bookVaccineAppointment: builder.mutation<void, { babyId: string }>({
      query: ({ babyId }) => ({
        url: `https://localhost:7047/api/Appointments/bookVaccineAppointment?babyId=${babyId}`,
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'Appointments' }],
    }),
    bookDoctorAppointment: builder.mutation<void, { babyId: string; doctorId: string; date: string; time: string }>({
      query: ({ babyId, doctorId, date, time }) => ({
        url: `https://localhost:7047/api/Appointments/bookDoctorAppointment?babyId=${babyId}&doctorId=${doctorId}&date=${date}&time=${time}`,
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'Appointments' }],
    }),
    getUserAppointments: builder.query<Appointment[], string>({
      query: (babyId) => ({
        url: `https://localhost:7047/api/Appointments/booked/${babyId}`,
        method: 'GET',
      }),
      providesTags: [{ type: 'Appointments' }],
    }),
  }),
});

export const {
  useGetAllAvailableAppointmentsQuery,
  useGetAvailableAppointmentsByDateQuery,
  useGetAvailableAppointmentsByWorkerTypeQuery,
  useBookAppointmentMutation,
  useBookPhysicalTherapistAppointmentsMutation,
  useBookVaccineAppointmentMutation,
  useBookDoctorAppointmentMutation,
  useGetUserAppointmentsQuery,
} = appointmentsApi;
