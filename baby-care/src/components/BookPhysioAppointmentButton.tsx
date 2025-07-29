import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, CircularProgress, Box, List, ListItem, TextField } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { he } from 'date-fns/locale';
import { useBookAppointmentMutation, useGetAllAvailableAppointmentsQuery } from '../api/appointmentsApi';

const BookPhysioAppointmentButton: React.FC<{ babyId?: string; physioId?: string }> = ({ babyId, physioId }) => {
  const [open, setOpen] = useState(false);
  const [physioName, setPhysioName] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [sessionsCount, setSessionsCount] = useState<number>(1);
  const [seriesAppointments, setSeriesAppointments] = useState<any[]>([]);
  const [calendarDate, setCalendarDate] = useState<Date | null>(null);
  const [searched, setSearched] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [bookAppointment, { isLoading }] = useBookAppointmentMutation();
  const { data: allAvailableAppointments, isLoading: isLoadingAll } = useGetAllAvailableAppointmentsQuery();

  const availableDays = React.useMemo(() => {
    if (!seriesAppointments.length) return [];
    return Array.from(new Set(seriesAppointments.map(a => a.appointmentDate)));
  }, [seriesAppointments]);

  const shouldDisableDate = (date: Date) => {
    const day = date.toISOString().split('T')[0];
    return !availableDays.includes(day);
  };

  const availableTimes = React.useMemo(() => {
    if (!seriesAppointments.length || !calendarDate) return [];
    const day = calendarDate.toISOString().split('T')[0];
    return Array.from(new Set(
      seriesAppointments
        .filter((a: { appointmentDate: string }) => a.appointmentDate === day)
        .map(a => a.startTime)
    ));
  }, [seriesAppointments, calendarDate]);

  const handleBook = async () => {
    if (!babyId || !calendarDate || !selectedTime) {
      setError('נא לבחור יום ושעה');
      setSuccess(false);
      return;
    }
    try {
      await bookAppointment({ babyId, workerType: 'Physiotherapist', date: calendarDate.toISOString().split('T')[0], time: selectedTime });
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
        קביעת תור לפיזיותרפיסט
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>קביעת סדרת תורים לפיזיותרפיסט</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" color="text.secondary" mb={2} align="center">
            יש למלא את כל השדות וללחוץ חפש
          </Typography>
          <Box mb={2} sx={{ bgcolor: '#fff', borderRadius: 4, boxShadow: '0 1px 8px #e3eaf1', p: 2 }}>
            <TextField
              fullWidth
              label="שם פיזיותרפיסט"
              value={physioName}
              onChange={e => setPhysioName(e.target.value)}
              variant="outlined"
              sx={{ mb: 2, borderRadius: 2, bgcolor: '#fafdff' }}
              inputProps={{ style: { textAlign: 'center', fontSize: '1.1em' } }}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={he}>
              <DatePicker
                label="תאריך התחלה"
                value={startDate}
                onChange={date => setStartDate(date)}
                slotProps={{ textField: { fullWidth: true, sx: { mb: 2, bgcolor: '#fafdff', borderRadius: 2 } } }}
                disablePast
                sx={{ direction: 'rtl', width: '100%' }}
              />
            </LocalizationProvider>
            <TextField
              fullWidth
              label="מספר מפגשים"
              type="number"
              inputProps={{ min: 1, style: { textAlign: 'center', fontSize: '1.1em' } }}
              value={sessionsCount}
              onChange={e => setSessionsCount(Number(e.target.value))}
              variant="outlined"
              sx={{ mb: 2, borderRadius: 2, bgcolor: '#fafdff' }}
            />
            <Button
              variant="contained"
              color="info"
              sx={{ width: '100%', mt: 1, fontWeight: 600, borderRadius: 2, fontSize: '1.08em' }}
              onClick={async () => {
                if (!physioName || !startDate || !sessionsCount) return;
                if (!allAvailableAppointments) return;
                setSearched(true);
                const start = new Date(startDate);
                const end = new Date(start);
                end.setMonth(end.getMonth() + 1);
                const filtered = allAvailableAppointments.filter((a: any) =>
                  a.workerType === 'Physiotherapist' &&
                  a.workerName === physioName &&
                  new Date(a.appointmentDate) >= start &&
                  new Date(a.appointmentDate) <= end
                );
                setSeriesAppointments(filtered);
                setCalendarDate(null);
                setSelectedTime('');
                setSuccess(false);
                setError('');
              }}
              disabled={!physioName || !startDate || !sessionsCount}
            >
              חפש תורים
            </Button>
          </Box>
          {isLoadingAll ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight={120}>
              <CircularProgress color="primary" />
            </Box>
          ) : (
            searched && seriesAppointments.length > 0 ? (
              <>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={he}>
                  <DatePicker
                    label="בחרי יום"
                    value={calendarDate}
                    onChange={date => { setCalendarDate(date); setSelectedTime(''); setSuccess(false); setError(''); }}
                    shouldDisableDate={shouldDisableDate}
                    slotProps={{ textField: { fullWidth: true, sx: { mb: 2, bgcolor: '#fafdff', borderRadius: 2 } } }}
                    disablePast
                    sx={{ direction: 'rtl', width: '100%' }}
                  />
                </LocalizationProvider>
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
              </>
            ) : searched && seriesAppointments.length === 0 ? (
              <Typography color="text.secondary" align="center" sx={{ fontSize: 15, mt: 2 }}>
                אין סדרת תורים מתאימה
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

export default BookPhysioAppointmentButton;
