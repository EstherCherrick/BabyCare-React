// // import React, { useState, useMemo } from 'react';
// // import { TypedUseSelectorHook, useSelector } from 'react-redux';
// // import { RootState } from '../../app/store';
// // import Calendar from 'react-calendar';
// // import 'react-calendar/dist/Calendar.css';
// // import {
// //   useGetAllAvailableAppointmentsQuery,
// //   useGetAvailableAppointmentsByDateQuery,
// //   useBookAppointmentMutation
// // } from '../../api/appointmentsApi';
// // import { Paper, Typography, Button, List, ListItem, CircularProgress, Box, Divider, TextField, MenuItem } from '@mui/material';
// // import EventAvailableIcon from '@mui/icons-material/EventAvailable';
// // import { Baby } from '../../types/baby';

// // const AppointmentsPage: React.FC = () => {
// //   const [calendarDate, setCalendarDate] = useState<Date>(new Date());
// //   const workerType = 'Nurse';
// //   const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// //   const babyId = useAppSelector((state) => state.auth.babyId);
// //   const [success, setSuccess] = useState(false);
// //   const [error, setError] = useState('');
// //   const [selectedTime, setSelectedTime] = useState<string>('');
// //   const [bookAppointment] = useBookAppointmentMutation();

// //   const formatDate = (date: Date) => date.toISOString().split('T')[0];

// //   const { data: allAvailableAppointments, isLoading: isLoadingAll } = useGetAllAvailableAppointmentsQuery();
// //   const {
// //     data: availableAppointments = [],
// //     isLoading: isLoadingDay,
// //     error: appointmentsError
// //   } = useGetAvailableAppointmentsByDateQuery(formatDate(calendarDate));

// //   const availableDays = useMemo(() => {
// //     if (!allAvailableAppointments) return [];
// //     return Array.from(new Set(
// //       allAvailableAppointments
// //         .filter((a: { appointmentDate: string; workerType?: string }) => a.workerType === workerType)
// //         .map(a => a.appointmentDate)
// //     ));
// //   }, [allAvailableAppointments, workerType]);

// //   const tileClassName = ({ date }: { date: Date }) => {
// //     const day = formatDate(date);
// //     return availableDays.includes(day) ? 'available-day' : '';
// //   };

// //   const tileDisabled = ({ date }: { date: Date }) => {
// //     const day = formatDate(date);
// //     return !availableDays.includes(day);
// //   };

// //   const availableTimes = useMemo(() => {
// //     if (!allAvailableAppointments) return [];
// //     const filtered = allAvailableAppointments.filter((a: { appointmentDate: string; workerType?: string; startTime: string }) => a.appointmentDate === formatDate(calendarDate) && a.workerType === workerType);
// //     const timeCounts: Record<string, number> = {};
// //     filtered.forEach((a) => {
// //       timeCounts[a.startTime] = (timeCounts[a.startTime] || 0) + 1;
// //     });
// //     return Object.entries(timeCounts)
// //       .filter(([_, count]) => count > 0)
// //       .map(([time]) => time);
// //   }, [allAvailableAppointments, calendarDate, workerType]);

// //   const handleDateChange = (value: any) => {
// //     const date = Array.isArray(value) ? value[0] : value;
// //     if (date instanceof Date) {
// //       setCalendarDate(date);
// //       setSuccess(false);
// //       setError('');
// //       setSelectedTime('');
// //     }
// //   };

// //   const formatTime = (time: string) => {
// //     if (/^\d{2}:\d{2}$/.test(time)) {
// //       return time + ':00';
// //     }
// //     return time;
// //   };

// //   const handleBook = async () => {
// //     if (!babyId || !selectedTime) {
// //       setError('נא לבחור שעה');
// //       setSuccess(false);
// //       return;
// //     }
// //     if (typeof babyId === 'string' && babyId.includes('@')) {
// //       setError('מזהה תינוק לא תקין. יש להתחבר מחדש או ליצור משתמש חדש.');
// //       setSuccess(false);
// //       return;
// //     }
// //     try {
// //       await bookAppointment({ babyId, workerType, date: formatDate(calendarDate), time: formatTime(selectedTime) }).unwrap();
// //       setSuccess(true);
// //       setError('');
// //       setSelectedTime('');
// //     } catch (e) {
// //       setError('אירעה שגיאה, נסי שוב');
// //       setSuccess(false);
// //     }
// //   };

// //   return (
// //     <Box sx={{ minHeight: '100vh', bgcolor: '#fafdff', display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
// //       <Paper elevation={0} sx={{ bgcolor: 'white', borderRadius: 6, p: { xs: 2, sm: 4 }, maxWidth: 420, width: '100%', boxShadow: '0 2px 16px 0 #e3eaf1', mb: 4 }}>
// //         <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
// //           <EventAvailableIcon sx={{ fontSize: 38, color: '#b2e0f7', mr: 1 }} />
// //           <Typography variant="h4" fontWeight={600} color="#3a4756" sx={{ fontFamily: 'Heebo, sans-serif' }}>קביעת תור</Typography>
// //         </Box>
// //         <Typography variant="subtitle1" color="#7b8a99" mb={2} align="center" sx={{ fontWeight: 400 }}>
// //           בחרי יום פנוי לקביעת תור
// //         </Typography>
// //         <Box sx={{
// //           '.react-calendar': { border: 'none', borderRadius: 4, boxShadow: '0 1px 6px #e3eaf1', fontFamily: 'inherit', width: '100%', background: '#fafdff', p: 1 },
// //           '.react-calendar__tile': { borderRadius: 3, fontWeight: 400, fontSize: 15, transition: '0.2s', py: 1, color: '#3a4756', background: 'none' },
// //           '.react-calendar__tile--active, .available-day': { bgcolor: '#e3f6fb !important', color: '#1e88e5 !important', borderRadius: 3, fontWeight: 500 },
// //           '.react-calendar__tile:disabled': { bgcolor: '#f5f7fa !important', color: '#cfd8dc !important' },
// //         }}>
// //           <Calendar
// //             onChange={handleDateChange}
// //             value={calendarDate}
// //             tileDisabled={tileDisabled}
// //             tileClassName={tileClassName}
// //             locale="he-IL"
// //             calendarType="hebrew"
// //           />
// //         </Box>
// //         <Divider sx={{ my: 3, bgcolor: '#f0f4f8' }} />
// //         {isLoadingAll || isLoadingDay ? (
// //           <Box display="flex" justifyContent="center" mt={2}><CircularProgress size={28} /></Box>
// //         ) : (
// //           calendarDate && availableTimes.length > 0 ? (
// //             <List sx={{ px: 0 }}>
// //               {availableTimes.map((time) => (
// //                 <ListItem key={time} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 0, py: 1 }}>
// //                   <Typography sx={{ fontSize: 16 }}>{time}</Typography>
// //                   <Button
// //                     variant={selectedTime === time ? 'contained' : 'outlined'}
// //                     color="primary"
// //                     sx={{ borderRadius: 8, minWidth: 90, boxShadow: 'none', bgcolor: selectedTime === time ? '#b2e0f7' : undefined, color: '#1976d2', fontWeight: 500, '&:hover': { bgcolor: '#e3f6fb' } }}
// //                     onClick={() => setSelectedTime(time)}
// //                   >
// //                     בחרי שעה
// //                   </Button>
// //                 </ListItem>
// //               ))}
// //             </List>
// //           ) : calendarDate && availableDays.includes(formatDate(calendarDate)) ? (
// //             <Typography color="#b0bec5" align="center" sx={{ fontSize: 15, mt: 2 }}>
// //               אין תורים פנויים ליום זה
// //             </Typography>
// //           ) : null
// //         )}
// //         <Button
// //           variant="contained"
// //           color="primary"
// //           sx={{ borderRadius: 8, minWidth: 120, mt: 2, fontWeight: 600, bgcolor: '#b2e0f7', color: '#1976d2', '&:hover': { bgcolor: '#e3f6fb' } }}
// //           onClick={handleBook}
// //           disabled={!selectedTime || !babyId || !workerType}
// //         >
// //           קבעי תור
// //         </Button>
// //         {success && <Typography color="success.main" align="center" mt={2} sx={{ fontWeight: 500 }}>התור נקבע בהצלחה!</Typography>}
// //         {error && <Typography color="error" align="center" mt={2} sx={{ fontWeight: 500 }}>{error}</Typography>}
// //       </Paper>
// //     </Box>
// //   );
// // };

// // export default AppointmentsPage;import React, { useState, useMemo } from 'react';

// import React, { useState, useMemo } from 'react';
// import { TypedUseSelectorHook, useSelector } from 'react-redux';
// import { RootState } from '../../app/store';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import {
//   useGetAllAvailableAppointmentsQuery,
//   useGetAvailableAppointmentsByDateQuery,
//   useBookAppointmentMutation
// } from '../../api/appointmentsApi';
// import { Paper, Typography, Button, List, ListItem, CircularProgress, Box, Divider } from '@mui/material';
// import EventAvailableIcon from '@mui/icons-material/EventAvailable';

// const AppointmentsPage: React.FC = () => {
//   const [calendarDate, setCalendarDate] = useState<Date>(new Date());
//   const workerType = 'Nurse';
//   const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
//   const babyId = useAppSelector((state) => state.auth.babyId);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState('');
//   const [selectedTime, setSelectedTime] = useState<string>('');
//   const [bookAppointment] = useBookAppointmentMutation();

//   const formatDate = (date: Date) => date.toISOString().split('T')[0];

//   const { data: allAvailableAppointments, isLoading: isLoadingAll } = useGetAllAvailableAppointmentsQuery();
//   const {
//     data: availableAppointments = [],
//     isLoading: isLoadingDay,
//   } = useGetAvailableAppointmentsByDateQuery(formatDate(calendarDate));

//   const availableDays = useMemo(() => {
//     if (!allAvailableAppointments) return [];
//     return Array.from(new Set(
//       allAvailableAppointments
//         .filter((a: { appointmentDate: string; workerType?: string }) => a.workerType === workerType)
//         .map(a => a.appointmentDate)
//     ));
//   }, [allAvailableAppointments, workerType]);

//   const tileClassName = ({ date }: { date: Date }) => {
//     const day = formatDate(date);
//     const today = formatDate(new Date());
//     if (day === today) return 'today'; // צבע שונה לתאריך של היום
//     return availableDays.includes(day) ? 'available-day' : '';
//   };

//   const tileDisabled = ({ date }: { date: Date }) => {
//     const day = formatDate(date);
//     return !availableDays.includes(day);
//   };

//   const availableTimes = useMemo(() => {
//     if (!allAvailableAppointments) return [];
//     const filtered = allAvailableAppointments.filter((a: { appointmentDate: string; workerType?: string; startTime: string }) => a.appointmentDate === formatDate(calendarDate) && a.workerType === workerType);
//     const timeCounts: Record<string, number> = {};
//     filtered.forEach((a) => {
//       timeCounts[a.startTime] = (timeCounts[a.startTime] || 0) + 1;
//     });
//     return Object.entries(timeCounts)
//       .filter(([_, count]) => count > 0)
//       .map(([time]) => time);
//   }, [allAvailableAppointments, calendarDate, workerType]);

//   const handleDateChange = (value: any) => {
//     const date = Array.isArray(value) ? value[0] : value;
//     if (date instanceof Date) {
//       setCalendarDate(date);
//       setSuccess(false);
//       setError('');
//       setSelectedTime('');
//     }
//   };

//   const handleBook = async () => {
//     if (!babyId || !selectedTime) {
//       setError('נא לבחור שעה');
//       setSuccess(false);
//       return;
//     }
//     try {
//       await bookAppointment({ babyId, workerType, date: formatDate(calendarDate), time: selectedTime }).unwrap();
//       setSuccess(true);
//       setError('');
//       setSelectedTime('');
//     } catch (e) {
//       setError('אירעה שגיאה, נסי שוב');
//       setSuccess(false);
//     }
//   };

//   return (
//     <Box sx={{ minHeight: '100vh', bgcolor: '#fafdff', display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
//       <Paper elevation={0} sx={{ bgcolor: 'white', borderRadius: 6, p: { xs: 2, sm: 4 }, maxWidth: 420, width: '100%', boxShadow: '0 2px 16px 0 #e3eaf1', mb: 4 }}>
//         <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
//           <EventAvailableIcon sx={{ fontSize: 38, color: '#b2e0f7', mr: 1 }} />
//           <Typography variant="h4" fontWeight={600} color="#3a4756">קביעת תור</Typography>
//         </Box>
//         <Typography variant="subtitle1" color="#7b8a99" mb={2} align="center">
//           בחרי יום פנוי לקביעת תור
//         </Typography>
//         <Box sx={{
//           '.react-calendar': { border: 'none', borderRadius: 4, boxShadow: '0 1px 6px #e3eaf1', fontFamily: 'inherit', width: '100%', background: '#fafdff', p: 1 },
//           '.react-calendar__tile': { borderRadius: 3, fontWeight: 400, fontSize: 15, transition: '0.2s', py: 1, color: '#3a4756', background: 'none' },
//           '.react-calendar__tile--active, .available-day': { bgcolor: '#e3f6fb !important', color: '#1e88e5 !important', borderRadius: 3, fontWeight: 500 },
//           '.react-calendar__tile.today': { bgcolor: '#ffeb3b !important', color: '#000 !important' }, 
//           '.react-calendar__tile:disabled': { bgcolor: '#f5f7fa !important', color: '#cfd8dc !important' },
//         }}>
//           <Calendar
//             onChange={handleDateChange}
//             value={calendarDate}
//             tileDisabled={tileDisabled}
//             tileClassName={tileClassName}
//             locale="he-IL"
//             calendarType="hebrew"
//           />
//         </Box>
//         <Divider sx={{ my: 3, bgcolor: '#f0f4f8' }} />
//         {isLoadingAll || isLoadingDay ? (
//           <Box display="flex" justifyContent="center" mt={2}><CircularProgress size={28} /></Box>
//         ) : (
//           calendarDate && availableTimes.length > 0 ? (
//             <List sx={{ px: 0 }}>
//               {availableTimes.map((time) => (
//                 <ListItem key={time} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 0, py: 1 }}>
//                   <Typography sx={{ fontSize: 16 }}>{time}</Typography>
//                   <Button
//                     variant={selectedTime === time ? 'contained' : 'outlined'}
//                     color="primary"
//                     sx={{ borderRadius: 8, minWidth: 90, boxShadow: 'none', bgcolor: selectedTime === time ? '#b2e0f7' : undefined, color: 'c6dcf1ff', fontWeight: 500, '&:hover': { bgcolor: '#e3f6fb' } }}
//                     onClick={() => setSelectedTime(time)}
//                   >
//                     בחרי שעה
//                   </Button>
//                 </ListItem>
//               ))}
//             </List>
//           ) : (
//             <Typography color="#b0bec5" align="center" sx={{ fontSize: 15, mt: 2 }}>
//               אין תורים פנויים ליום זה
//             </Typography>
//           )
//         )}
//         <Button
//           variant="contained"
//           color="primary"
//           sx={{ borderRadius: 8, minWidth: 120, mt: 2, fontWeight: 600, bgcolor: '#b2e0f7', color: '#c6dcf1ff', '&:hover': { bgcolor: '#e3f6fb' } }}
//           onClick={handleBook}
//           disabled={!selectedTime || !babyId || !workerType}
//         >
//           קבעי תור
//         </Button>
//         {success && <Typography color="success.main" align="center" mt={2} sx={{ fontWeight: 500 }}>התור נקבע בהצלחה!</Typography>}
//         {error && <Typography color="error" align="center" mt={2} sx={{ fontWeight: 500 }}>{error}</Typography>}
//       </Paper>
//     </Box>
//   );
// };

// export default AppointmentsPage;


// // import React, { useState, useMemo } from 'react';
// // import { TypedUseSelectorHook, useSelector } from 'react-redux';
// // import { RootState } from '../../app/store';
// // import Calendar from 'react-calendar';
// // import 'react-calendar/dist/Calendar.css';
// // import {
// //   useGetAllAvailableAppointmentsQuery,
// //   useGetAvailableAppointmentsByDateQuery,
// //   useBookAppointmentMutation
// // } from '../../api/appointmentsApi';
// // import { Paper, Typography, Button, List, ListItem, CircularProgress, Box, Divider } from '@mui/material';
// // import EventAvailableIcon from '@mui/icons-material/EventAvailable';

// // const AppointmentsPage: React.FC = () => {
// //   const [calendarDate, setCalendarDate] = useState<Date>(new Date());
// //   const workerType = 'Nurse';
// //   const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// //   const babyId = useAppSelector((state) => state.auth.babyId);
// //   const [success, setSuccess] = useState(false);
// //   const [error, setError] = useState('');
// //   const [selectedTime, setSelectedTime] = useState<string>('');
// //   const [bookAppointment] = useBookAppointmentMutation();

// //   const formatDate = (date: Date) => date.toISOString().split('T')[0];

// //   const { data: allAvailableAppointments, isLoading: isLoadingAll } = useGetAllAvailableAppointmentsQuery();
// //   const {
// //     data: availableAppointments = [],
// //     isLoading: isLoadingDay,
// //   } = useGetAvailableAppointmentsByDateQuery(formatDate(calendarDate));

// //   const availableDays = useMemo(() => {
// //     if (!allAvailableAppointments) return [];
// //     return Array.from(new Set(
// //       allAvailableAppointments
// //         .filter((a: { appointmentDate: string; workerType?: string }) => a.workerType === workerType)
// //         .map(a => a.appointmentDate)
// //     ));
// //   }, [allAvailableAppointments, workerType]);

// //   const tileClassName = ({ date }: { date: Date }) => {
// //     const day = formatDate(date);
// //     const today = formatDate(new Date());
// //     if (day === today) return 'today'; // צבע שונה לתאריך של היום
// //     return availableDays.includes(day) ? 'available-day' : '';
// //   };

// //   const tileDisabled = ({ date }: { date: Date }) => {
// //     const day = formatDate(date);
// //     return !availableDays.includes(day);
// //   };

// //   const availableTimes = useMemo(() => {
// //     if (!allAvailableAppointments) return [];
// //     const filtered = allAvailableAppointments.filter((a: { appointmentDate: string; workerType?: string; startTime: string }) => a.appointmentDate === formatDate(calendarDate) && a.workerType === workerType);
// //     const timeCounts: Record<string, number> = {};
// //     filtered.forEach((a) => {
// //       timeCounts[a.startTime] = (timeCounts[a.startTime] || 0) + 1;
// //     });
// //     return Object.entries(timeCounts)
// //       .filter(([_, count]) => count > 0)
// //       .map(([time]) => time);
// //   }, [allAvailableAppointments, calendarDate, workerType]);

// //   const handleDateChange = (value: any) => {
// //     const date = Array.isArray(value) ? value[0] : value;
// //     if (date instanceof Date) {
// //       setCalendarDate(date);
// //       setSuccess(false);
// //       setError('');
// //       setSelectedTime('');
// //     }
// //   };

// //   const handleBook = async () => {
// //     if (!babyId || !selectedTime) {
// //       setError('נא לבחור שעה');
// //       setSuccess(false);
// //       return;
// //     }
// //     try {
// //       await bookAppointment({ babyId, workerType, date: formatDate(calendarDate), time: selectedTime }).unwrap();
// //       setSuccess(true);
// //       setError('');
// //       setSelectedTime('');
// //     } catch (e) {
// //       setError('אירעה שגיאה, נסי שוב');
// //       setSuccess(false);
// //     }
// //   };

// //   return (
// //     <Box sx={{ minHeight: '100vh', bgcolor: '#fafdff', display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
// //       <Paper elevation={0} sx={{ bgcolor: 'white', borderRadius: 6, p: { xs: 2, sm: 4 }, maxWidth: 420, width: '100%', boxShadow: '0 2px 16px 0 #e3eaf1', mb: 4 }}>
// //         <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
// //           <EventAvailableIcon sx={{ fontSize: 38, color: '#b2e0f7', mr: 1 }} />
// //           <Typography variant="h4" fontWeight={600} color="#3a4756">קביעת תור</Typography>
// //         </Box>
// //         <Typography variant="subtitle1" color="#7b8a99" mb={2} align="center">
// //           בחרי יום פנוי לקביעת תור
// //         </Typography>
// //         <Box sx={{
// //           '.react-calendar': { border: 'none', borderRadius: 4, boxShadow: '0 1px 6px #e3eaf1', fontFamily: 'inherit', width: '100%', background: '#fafdff', p: 1 },
// //           '.react-calendar__tile': { borderRadius: 3, fontWeight: 400, fontSize: 15, transition: '0.2s', py: 1, color: '#3a4756', background: 'none' },
// //           '.react-calendar__tile--active, .available-day': { bgcolor: '#e3f6fb !important', color: '#1e88e5 !important', borderRadius: 3, fontWeight: 500 },
// //           '.react-calendar__tile.today': { bgcolor: '#ffeb3b !important', color: '#000 !important' }, // צבע לתאריך של היום
// //           '.react-calendar__tile:disabled': { bgcolor: '#f5f7fa !important', color: '#cfd8dc !important' },
// //         }}>
// //           <Calendar
// //             onChange={handleDateChange}
// //             value={calendarDate}
// //             tileDisabled={tileDisabled}
// //             tileClassName={tileClassName}
// //             locale="he-IL"
// //             calendarType="hebrew"
// //           />
// //         </Box>
// //         <Divider sx={{ my: 3, bgcolor: '#f0f4f8' }} />
// //         {isLoadingAll || isLoadingDay ? (
// //           <Box display="flex" justifyContent="center" mt={2}><CircularProgress size={28} /></Box>
// //         ) : (
// //           calendarDate && availableTimes.length > 0 ? (
// //             <List sx={{ px: 0 }}>
// //               {availableTimes.map((time) => (
// //                 <ListItem key={time} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 0, py: 1 }}>
// //                   <Typography sx={{ fontSize: 16 }}>{time}</Typography>
// //                   <Button
// //                     variant={selectedTime === time ? 'contained' : 'outlined'}
// //                     color="primary"
// //                     sx={{ borderRadius: 8, minWidth: 90, boxShadow: 'none', bgcolor: selectedTime === time ? '#b2e0f7' : undefined, color: 'white', fontWeight: 500, '&:hover': { bgcolor: '#e3f6fb' } }}
// //                     onClick={() => setSelectedTime(time)}
// //                   >
// //                     בחרי שעה
// //                   </Button>
// //                 </ListItem>
// //               ))}
// //             </List>
// //           ) : (
// //             <Typography color="#b0bec5" align="center" sx={{ fontSize: 15, mt: 2 }}>
// //               אין תורים פנויים ליום זה
// //             </Typography>
// //           )
// //         )}
// //         <Button
// //           variant="contained"
// //           color="primary"
// //           sx={{ borderRadius: 8, minWidth: 120, mt: 2, fontWeight: 600, bgcolor: '#b2e0f7', color: '#1976d2', '&:hover': { bgcolor: '#e3f6fb' } }}
// //           onClick={handleBook}
// //           disabled={!selectedTime || !babyId || !workerType}
// //         >
// //           קבעי תור
// //         </Button>
// //         {success && <Typography color="success.main" align="center" mt={2} sx={{ fontWeight: 500 }}>התור נקבע בהצלחה!</Typography>}
// //         {error && <Typography color="error" align="center" mt={2} sx={{ fontWeight: 500 }}>{error}</Typography>}
// //       </Paper>
// //     </Box>
// //   );
// // };

// // export default AppointmentsPage;

//  import React, { useState, useMemo } from 'react';
// import { TypedUseSelectorHook, useSelector } from 'react-redux';
// import { RootState } from '../../app/store';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import {
//   useGetAllAvailableAppointmentsQuery,
//   useGetAvailableAppointmentsByDateQuery,
//   useBookAppointmentMutation
// } from '../../api/appointmentsApi';
// import { Paper, Typography, Button, List, ListItem, CircularProgress, Box, Divider } from '@mui/material';
// import EventAvailableIcon from '@mui/icons-material/EventAvailable';

// const AppointmentsPage: React.FC = () => {
//   const [calendarDate, setCalendarDate] = useState<Date>(new Date());
//   const workerType = 'Nurse';
//   const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
//   const babyId = useAppSelector((state) => state.auth.babyId);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState('');
//   const [selectedTime, setSelectedTime] = useState<string>('');
//   const [bookAppointment] = useBookAppointmentMutation();

//   const formatDate = (date: Date) => date.toISOString().split('T')[0];

//   const { data: allAvailableAppointments, isLoading: isLoadingAll } = useGetAllAvailableAppointmentsQuery();
//   const {
//     data: availableAppointments = [],
//     isLoading: isLoadingDay,
//   } = useGetAvailableAppointmentsByDateQuery(formatDate(calendarDate));

//   const availableDays = useMemo(() => {
//     if (!allAvailableAppointments) return [];
//     return Array.from(new Set(
//       allAvailableAppointments
//         .filter((a: { appointmentDate: string; workerType?: string }) => a.workerType === workerType)
//         .map(a => a.appointmentDate)
//     ));
//   }, [allAvailableAppointments, workerType]);

//   const tileClassName = ({ date }: { date: Date }) => {
//     const day = formatDate(date);
//     const today = formatDate(new Date());
//     if (day === today) return 'today'; // צבע שונה לתאריך של היום
//     return availableDays.includes(day) ? 'available-day' : '';
//   };

//   const tileDisabled = ({ date }: { date: Date }) => {
//     const day = formatDate(date);
//     return !availableDays.includes(day);
//   };

//   const availableTimes = useMemo(() => {
//     if (!allAvailableAppointments) return [];
//     const filtered = allAvailableAppointments.filter((a: { appointmentDate: string; workerType?: string; startTime: string }) => a.appointmentDate === formatDate(calendarDate) && a.workerType === workerType);
//     const timeCounts: Record<string, number> = {};
//     filtered.forEach((a) => {
//       timeCounts[a.startTime] = (timeCounts[a.startTime] || 0) + 1;
//     });
//     return Object.entries(timeCounts)
//       .filter(([_, count]) => count > 0)
//       .map(([time]) => time);
//   }, [allAvailableAppointments, calendarDate, workerType]);

//   const handleDateChange = (value: any) => {
//     const date = Array.isArray(value) ? value[0] : value;
//     if (date instanceof Date) {
//       setCalendarDate(date);
//       setSuccess(false);
//       setError('');
//       setSelectedTime('');
//     }
//   };

//   const handleBook = async () => {
//     if (!babyId || !selectedTime) {
//       setError('נא לבחור שעה');
//       setSuccess(false);
//       return;
//     }
//     try {
//       await bookAppointment({ babyId, workerType, date: formatDate(calendarDate), time: selectedTime }).unwrap();
//       setSuccess(true);
//       setError('');
//       setSelectedTime('');
//     } catch (e) {
//       setError('אירעה שגיאה, נסי שוב');
//       setSuccess(false);
//     }
//   };

//   return (
//     <Box sx={{ minHeight: '100vh', bgcolor: '#fafdff', display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
//       <Paper elevation={0} sx={{ bgcolor: 'white', borderRadius: 6, p: { xs: 2, sm: 4 }, maxWidth: 420, width: '100%', boxShadow: '0 2px 16px 0 #e3eaf1', mb: 4 }}>
//         <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
//           <EventAvailableIcon sx={{ fontSize: 38, color: '#b2e0f7', mr: 1 }} />
//           <Typography variant="h4" fontWeight={600} color="#3a4756">קביעת תור</Typography>
//         </Box>
//         <Typography variant="subtitle1" color="#7b8a99" mb={2} align="center">
//           בחרי יום פנוי לקביעת תור
//         </Typography>
//         <Box sx={{
//           '.react-calendar': { border: 'none', borderRadius: 4, boxShadow: '0 1px 6px #e3eaf1', fontFamily: 'inherit', width: '100%', background: '#fafdff', p: 1 },
//           '.react-calendar__tile': { borderRadius: 3, fontWeight: 400, fontSize: 15, transition: '0.2s', py: 1, color: '#3a4756', background: 'none' },
//           '.react-calendar__tile--active, .available-day': { bgcolor: '#e3f6fb !important', color: '#1e88e5 !important', borderRadius: 3, fontWeight: 500 },
//           '.react-calendar__tile.today': { bgcolor: '#ffeb3b !important', color: '#000 !important' }, // צבע לתאריך של היום
//           '.react-calendar__tile:disabled': { bgcolor: '#f5f7fa !important', color: '#cfd8dc !important' },
//         }}>
//           <Calendar
//             onChange={handleDateChange}
//             value={calendarDate}
//             tileDisabled={tileDisabled}
//             tileClassName={tileClassName}
//             locale="he-IL"
//             calendarType="hebrew"
//           />
//         </Box>
//         <Divider sx={{ my: 3, bgcolor: '#f0f4f8' }} />
//         {isLoadingAll || isLoadingDay ? (
//           <Box display="flex" justifyContent="center" mt={2}><CircularProgress size={28} /></Box>
//         ) : (
//           calendarDate && availableTimes.length > 0 ? (
//             <List sx={{ px: 0 }}>
//               {availableTimes.map((time) => (
//                 <ListItem key={time} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 0, py: 1 }}>
//                   <Typography sx={{ fontSize: 16 }}>{time}</Typography>
//                   <Button
//                     variant={selectedTime === time ? 'contained' : 'outlined'}
//                     color="primary"
//                     sx={{ borderRadius: 8, minWidth: 90, boxShadow: 'none', bgcolor: selectedTime === time ? '#b2e0f7' : undefined, color: 'white', fontWeight: 500, '&:hover': { bgcolor: '#e3f6fb' } }}
//                     onClick={() => setSelectedTime(time)}
//                   >
//                     בחרי שעה
//                   </Button>
//                 </ListItem>
//               ))}
//             </List>
//           ) : (
//             <Typography color="#b0bec5" align="center" sx={{ fontSize: 15, mt: 2 }}>
//               אין תורים פנויים ליום זה
//             </Typography>
//           )
//         )}
//         <Button
//           variant="contained"
//           color="primary"
//           sx={{ borderRadius: 8, minWidth: 120, mt: 2, fontWeight: 600, bgcolor: '#b2e0f7', color: '#1976d2', '&:hover': { bgcolor: '#e3f6fb' } }}
//           onClick={handleBook}
//           disabled={!selectedTime || !babyId || !workerType}
//         >
//           קבעי תור
//         </Button>
//         {success && <Typography color="success.main" align="center" mt={2} sx={{ fontWeight: 500 }}>התור נקבע בהצלחה!</Typography>}
//         {error && <Typography color="error" align="center" mt={2} sx={{ fontWeight: 500 }}>{error}</Typography>}
//       </Paper>
//     </Box>
//   );
// };

// export default AppointmentsPage;
import React, { useState, useMemo } from 'react';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {
  useGetAllAvailableAppointmentsQuery,
  useGetAvailableAppointmentsByDateQuery,
  useBookAppointmentMutation
} from '../../api/appointmentsApi';
import { Paper, Typography, Button, List, ListItem, CircularProgress, Box, Divider } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const AppointmentsPage: React.FC = () => {
  const [calendarDate, setCalendarDate] = useState<Date>(new Date());
  const workerType = 'Nurse';
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const babyId = useAppSelector((state) => state.auth.babyId);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [bookAppointment] = useBookAppointmentMutation();

  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  const { data: allAvailableAppointments, isLoading: isLoadingAll } = useGetAllAvailableAppointmentsQuery();
  const {
    data: availableAppointments = [],
    isLoading: isLoadingDay,
  } = useGetAvailableAppointmentsByDateQuery(formatDate(calendarDate));

  const availableDays = useMemo(() => {
    if (!allAvailableAppointments) return [];
    return Array.from(new Set(
      allAvailableAppointments
        .filter((a: { appointmentDate: string; workerType?: string }) => a.workerType === workerType)
        .map(a => a.appointmentDate)
    ));
  }, [allAvailableAppointments, workerType]);

  const tileClassName = ({ date }: { date: Date }) => {
    const day = formatDate(date);
    const today = formatDate(new Date());
    if (day === today) return 'today';
    if (calendarDate && day === formatDate(calendarDate)) return 'selected-day';
    return availableDays.includes(day) ? 'available-day' : '';
  };

  const tileDisabled = ({ date }: { date: Date }) => {
    const day = formatDate(date);
    return !availableDays.includes(day);
  };

  const availableTimes = useMemo(() => {
    if (!allAvailableAppointments) return [];
    const filtered = allAvailableAppointments.filter((a: { appointmentDate: string; workerType?: string; startTime: string }) => a.appointmentDate === formatDate(calendarDate) && a.workerType === workerType);
    const timeCounts: Record<string, number> = {};
    filtered.forEach((a) => {
      timeCounts[a.startTime] = (timeCounts[a.startTime] || 0) + 1;
    });
    return Object.entries(timeCounts)
      .filter(([_, count]) => count > 0)
      .map(([time]) => time);
  }, [allAvailableAppointments, calendarDate, workerType]);

  // שליחת יום נבחר לשרת
  const handleDateChange = (value: any) => {
    const date = Array.isArray(value) ? value[0] : value;
    if (date instanceof Date) {
      setCalendarDate(date);
      setSuccess(false);
      setError('');
      setSelectedTime('');
    }
  };

  const handleBook = async () => {
    if (!babyId || !selectedTime) {
      setError('נא לבחור שעה');
      setSuccess(false);
      return;
    }
    try {
      await bookAppointment({ babyId, workerType, date: formatDate(calendarDate), time: selectedTime }).unwrap();
      setSuccess(true);
      setError('');
      setSelectedTime('');
    } catch (e) {
      setError('כבר קיים תור ביום הנבחר');
      setSuccess(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fafdff', display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
      <Paper elevation={0} sx={{ bgcolor: 'white', borderRadius: 6, p: { xs: 2, sm: 4 }, maxWidth: 420, width: '100%', boxShadow: '0 2px 16px 0 #e3eaf1', mb: 4 }}>
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <EventAvailableIcon sx={{ fontSize: 38, color: '#b2e0f7', mr: 1 }} />
          <Typography variant="h4" fontWeight={600} color="#3a4756">קביעת תור</Typography>
        </Box>
        <Typography variant="subtitle1" color="#7b8a99" mb={2} align="center">
          בחרי יום פנוי לקביעת תור
        </Typography>
        <Box sx={{
          '.react-calendar': { border: 'none', borderRadius: 4, boxShadow: '0 1px 6px #e3eaf1', fontFamily: 'inherit', width: '100%', background: '#fafdff', p: 1 },
          '.react-calendar__tile': { borderRadius: 3, fontWeight: 400, fontSize: 15, transition: '0.2s', py: 1, color: '#3a4756', background: 'none' },
          '.react-calendar__tile--active, .selected-day': { bgcolor: '#1976d2 !important', color: '#fff !important', borderRadius: 3, fontWeight: 500 },
          '.react-calendar__tile.today': { bgcolor: '#fffde7 !important', color: '#fbc02d !important', borderRadius: 3, fontWeight: 700 },
          '.react-calendar__tile:disabled': { bgcolor: '#f5f7fa !important', color: '#cfd8dc !important' },
        }}>
          <Calendar
            onChange={handleDateChange}
            value={calendarDate}
            tileDisabled={tileDisabled}
            tileClassName={tileClassName}
            locale="he-IL"
          />
        </Box>
        <Divider sx={{ my: 3, bgcolor: '#f0f4f8' }} />
        {isLoadingAll || isLoadingDay ? (
          <Box display="flex" justifyContent="center" mt={2}><CircularProgress size={28} /></Box>
        ) : (
          calendarDate && availableTimes.length > 0 ? (
            <List sx={{ px: 0 }}>
              {availableTimes.map((time) => (
                <ListItem key={time} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 0, py: 1 }}>
                  <Typography sx={{ fontSize: 16 }}>{time}</Typography>
                  <Button
                    variant={selectedTime === time ? 'contained' : 'outlined'}
                    color="primary"
                    sx={{ borderRadius: 8, minWidth: 90, boxShadow: 'none', bgcolor: selectedTime === time ? '#b2e0f7' : undefined, color: 'white', fontWeight: 500, '&:hover': { bgcolor: '#e3f6fb' } }}
                    onClick={() => setSelectedTime(time)}
                  >
                    בחרי שעה
                  </Button>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography color="#b0bec5" align="center" sx={{ fontSize: 15, mt: 2 }}>
              אין תורים פנויים ליום זה
            </Typography>
          )
        )}
        <Button
          variant="contained"
          color="primary"
          sx={{ borderRadius: 8, minWidth: 120, mt: 2, fontWeight: 600, bgcolor: '#b2e0f7', color: '#1976d2', '&:hover': { bgcolor: '#e3f6fb' } }}
          onClick={handleBook}
          disabled={!selectedTime || !babyId || !workerType}
        >
          קבעי תור
        </Button>
        {success && <Typography color="success.main" align="center" mt={2} sx={{ fontWeight: 500 }}>התור נקבע בהצלחה!</Typography>}
        {error && <Typography color="error" align="center" mt={2} sx={{ fontWeight: 500 }}>{error}</Typography>}
      </Paper>
    </Box>
  );
};

export default AppointmentsPage;

