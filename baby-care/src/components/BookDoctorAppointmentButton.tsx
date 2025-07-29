import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, CircularProgress, Box, List, ListItem, TextField } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { he } from 'date-fns/locale';
import { useBookDoctorAppointmentMutation, useGetAllAvailableAppointmentsQuery } from '../api/appointmentsApi';

const BookDoctorAppointmentButton: React.FC<{ babyId?: string; doctorId?: string }> = ({ babyId, doctorId }) => {
  const [open, setOpen] = useState(false);
  const [calendarDate, setCalendarDate] = useState<Date | null>(null);
  const [searched, setSearched] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [bookDoctorAppointment, { isLoading }] = useBookDoctorAppointmentMutation();
  const { data: allAvailableAppointments, isLoading: isLoadingAll } = useGetAllAvailableAppointmentsQuery();

  const availableDays = React.useMemo(() => {
    if (!allAvailableAppointments) return [];
    return Array.from(new Set(
      allAvailableAppointments
        .filter((a: { appointmentDate: string; workerType?: string }) => a.workerType === 'Doctor')
        .map(a => a.appointmentDate)
    ));
  }, [allAvailableAppointments]);

  const shouldDisableDate = (date: Date) => {
    const day = date.toISOString().split('T')[0];
    return !availableDays.includes(day);
  };

  const availableTimes = React.useMemo(() => {
    if (!allAvailableAppointments || !calendarDate) return [];
    const day = calendarDate.toISOString().split('T')[0];
    return Array.from(new Set(
      allAvailableAppointments
        .filter((a: { appointmentDate: string; workerType?: string }) => a.appointmentDate === day && a.workerType === 'Doctor')
        .map(a => a.startTime)
    ));
  }, [allAvailableAppointments, calendarDate]);

  const handleBook = async () => {
    if (!babyId || !doctorId || !calendarDate || !selectedTime) {
      setError('נא לבחור יום ושעה');
      setSuccess(false);
      return;
    }
    try {
      await bookDoctorAppointment({ babyId, doctorId, date: calendarDate.toISOString().split('T')[0], time: selectedTime });
      setSuccess(true);
      setError('');
      setOpen(false);
      setSelectedTime('');
      setCalendarDate(null);
    } catch (e) {
      setError('אירעה שגיאה, נסה שוב');
      setSuccess(false);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        sx={{ fontWeight: 600, fontSize: '1.08em', borderRadius: 2, px: 4, py: 1.5, minWidth: 170, boxShadow: 1, background: '#1976d2' }}
        onClick={() => setOpen(true)}
        disabled={isLoadingAll}
      >
        קביעת תור לרופא
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>קביעת תור לרופא</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" color="text.secondary" mb={2} align="center">
            בחרי יום פנוי לקביעת תור
          </Typography>
          <Box mb={2} sx={{ bgcolor: '#fff', borderRadius: 4, boxShadow: '0 1px 8px #e3eaf1', p: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={he}>
              <DatePicker
                label="בחרי יום"
                value={calendarDate}
                onChange={(date: React.SetStateAction<Date | null>) => { setCalendarDate(date); setSearched(false); setSelectedTime(''); setSuccess(false); setError(''); }}
                shouldDisableDate={shouldDisableDate}
                slotProps={{ textField: { fullWidth: true, sx: { mb: 2, bgcolor: '#fafdff', borderRadius: 2 } } }}
                disablePast
                sx={{ direction: 'rtl', width: '100%' }}
              />
            </LocalizationProvider>
            <Button
              variant="contained"
              color="info"
              sx={{ width: '100%', mt: 1, fontWeight: 600, borderRadius: 2, fontSize: '1.08em' }}
              onClick={() => setSearched(true)}
              disabled={!calendarDate}
            >
              חפש תורים
            </Button>
          </Box>
          {isLoadingAll ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight={120}>
              <CircularProgress color="primary" />
            </Box>
          ) : (
            searched && calendarDate && availableTimes.length > 0 ? (
              <List>
                {availableTimes.map(time => (
                  <ListItem key={time} disablePadding>
                    <Button
                      variant={selectedTime === time ? 'contained' : 'outlined'}
                      color="primary"
                      sx={{ width: '100%', mb: 1, borderRadius: 2, fontWeight: 500 }}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </Button>
                  </ListItem>
                ))}
              </List>
            ) : searched && calendarDate && availableDays.includes(calendarDate.toISOString().split('T')[0]) ? (
              <Typography color="text.secondary" align="center" sx={{ fontSize: 15, mt: 2 }}>
                אין שעות פנויות ליום זה
              </Typography>
            ) : null
          )}
          {error && <Typography color="error" align="center" mt={2}>{error}</Typography>}
          {success && <Typography color="success.main" align="center" mt={2}>התור נקבע בהצלחה!</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">ביטול</Button>
          <Button onClick={handleBook} color="primary" variant="contained" disabled={!calendarDate || !selectedTime || isLoading}>
            קבע תור
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BookDoctorAppointmentButton;
