import React from 'react';
import { useGetAllWorkersQuery } from '../../api/workerApi';
import { Box, Typography, CircularProgress } from '@mui/material';
import BookNurseAppointmentButton from '../../components/BookNurseAppointmentButton';
import BookPhysioAppointmentButton from '../../components/BookPhysioAppointmentButton';
import BookDoctorAppointmentButton from '../../components/BookDoctorAppointmentButton';

const WorkerDashboard: React.FC = () => {
  const { data: workers, isLoading, error } = useGetAllWorkersQuery();

  return (
    <Box sx={{
      maxWidth: 1100,
      margin: '40px auto',
      padding: 4,
      bgcolor: '#f6f8fa',
      borderRadius: 4,
      boxShadow: 3,
      fontFamily: 'Heebo, Segoe UI, Arial, sans-serif',
    }}>
      <Typography variant="h3" color="primary" fontWeight={700} mb={3} textAlign="right">
        אזור העובד
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mb: 4 }}>
        <BookNurseAppointmentButton />
        <BookPhysioAppointmentButton />
        <BookDoctorAppointmentButton />
      </Box>
      <Box mb={2} textAlign="right">
        {isLoading && <CircularProgress color="primary" />}
        {error && <Typography color="error" fontWeight={600}>שגיאה בטעינת נתונים</Typography>}
      </Box>
      {/* כאן יתווספו ה-modal/טפסים לכל פעולה */}
      {/* כאן יתווספו ה-modal/טפסים לכל פעולה */}
    </Box>
  );
};

export default WorkerDashboard;
