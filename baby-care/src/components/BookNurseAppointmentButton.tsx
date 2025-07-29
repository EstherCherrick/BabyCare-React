import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, CircularProgress, Box, List, ListItem, TextField } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { he } from 'date-fns/locale';
import { useBookAppointmentMutation, useGetAllAvailableAppointmentsQuery } from '../api/appointmentsApi';

const BookNurseAppointmentButton: React.FC<{ babyId?: string; nurseId?: string }> = ({ babyId, nurseId }) => {
  const [open, setOpen] = useState(false);
  const [inputBabyId, setInputBabyId] = useState(babyId || '');
  const [calendarDate, setCalendarDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [bookAppointment, { isLoading }] = useBookAppointmentMutation();
  const { data: allAvailableAppointments, isLoading: isLoadingAll } = useGetAllAvailableAppointmentsQuery();

  const availableDays = React.useMemo(() => {
    if (!allAvailableAppointments || !inputBabyId) return [];
    return Array.from(new Set(
      allAvailableAppointments
        .filter((a: { appointmentDate: string; workerType?: string; babyId?: string }) => a.workerType === 'Nurse' && a.babyId === inputBabyId)
        .map(a => a.appointmentDate)
    ));
  }, [allAvailableAppointments, inputBabyId]);

  const shouldDisableDate = (date: Date) => {
    const day = date.toISOString().split('T')[0];
    return !availableDays.includes(day);
  };

  const availableTimes = React.useMemo(() => {
    if (!allAvailableAppointments || !calendarDate || !inputBabyId) return [];
    const day = calendarDate.toISOString().split('T')[0];
    return Array.from(new Set(
      allAvailableAppointments
        .filter((a: { appointmentDate: string; workerType?: string; babyId?: string }) => a.appointmentDate === day && a.workerType === 'Nurse' && a.babyId === inputBabyId)
        .map(a => a.startTime)
    ));
  }, [allAvailableAppointments, calendarDate, inputBabyId]);

  const handleBook = async () => {
    if (!inputBabyId || !calendarDate || !selectedTime) {
      setError('נא להזין מזהה תינוק, לבחור יום ושעה');
      setSuccess(false);
      return;
    }
    try {
      await bookAppointment({ babyId: inputBabyId, workerType: 'Nurse', date: calendarDate.toISOString().split('T')[0], time: selectedTime });
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
        קביעת תור לאחות
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>קביעת תור לאחות</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" color="text.secondary" mb={2} align="center">
            יש להזין מזהה תינוק
          </Typography>
          <Box mb={2}>
            <TextField
              fullWidth
              label="מזהה תינוק"
              value={inputBabyId}
              onChange={e => setInputBabyId(e.target.value)}
              variant="outlined"
              sx={{ mb: 2, borderRadius: 2, bgcolor: '#fafdff' }}
              inputProps={{ style: { textAlign: 'center', fontSize: '1.1em' } }}
            />
          </Box>
          {isLoadingAll ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight={120}>
              <CircularProgress color="primary" />
            </Box>
          ) : (
            inputBabyId ? (
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={he}>
                <Box sx={{
                  background: '#fff',
                  borderRadius: 4,
                  boxShadow: '0 2px 12px 0 #e3eaf1',
                  p: 2,
                  mb: 2,
                  '.MuiInputBase-root': { borderRadius: 3, bgcolor: '#fafdff', fontWeight: 500 },
                  '.MuiOutlinedInput-notchedOutline': { border: 'none' },
                  '.MuiPickersDay-root': { borderRadius: 3, fontWeight: 500, fontSize: 16 },
                  '.Mui-selected': { bgcolor: '#e3f6fb !important', color: '#1976d2 !important' },
                  '.MuiPickersDay-dayOutsideMonth': { color: '#cfd8dc' },
                  '.MuiPickersCalendarHeader-label': { fontWeight: 600, color: '#1976d2' },
                  direction: 'rtl',
                }}>
                  <DatePicker
                    label="בחר יום פנוי"
                    value={calendarDate}
                    onChange={date => setCalendarDate(date)}
                    shouldDisableDate={shouldDisableDate}
                    slotProps={{ textField: { fullWidth: true, sx: { mb: 2, bgcolor: '#fafdff', borderRadius: 2, fontWeight: 500 } } }}
                    disablePast
                    views={["year", "month", "day"]}
                  />
                </Box>
                {calendarDate && (
                  <>
                    <Typography variant="subtitle2" mt={2} mb={1} align="center">בחר שעה</Typography>
                    <List>
                      {availableTimes.length > 0 ? availableTimes.map(time => (
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
                      )) : (
                        <Typography color="text.secondary" align="center" sx={{ fontSize: 15, mt: 2 }}>
                          אין שעות פנויות ליום זה
                        </Typography>
                      )}
                    </List>
                  </>
                )}
              </LocalizationProvider>
            ) : (
              <Typography color="text.secondary" align="center" sx={{ fontSize: 15, mt: 2 }}>
                יש להזין מזהה תינוק כדי להציג תורים
              </Typography>
            )
          )}
          {error && <Typography color="error" align="center" mt={2}>{error}</Typography>}
          {success && <Typography color="success.main" align="center" mt={2}>התור נקבע בהצלחה!</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">ביטול</Button>
          <Button onClick={handleBook} color="primary" variant="contained" disabled={!calendarDate || !selectedTime || !inputBabyId || isLoading}>
            קבע תור
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BookNurseAppointmentButton;
