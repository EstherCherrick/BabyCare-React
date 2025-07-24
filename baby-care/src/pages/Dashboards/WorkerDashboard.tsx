// import { Box, Typography, Card, CardContent, Grid, Button ,CircularProgress} from '@mui/material';
// import { useGetAllWorkersQuery } from '../../api/workerApi';
// // import BabyIcon from '../../assets/baby-icon.svg';

// const WorkerDashboard: React.FC = () => {
//   const { data: workers, isLoading, error } = useGetAllWorkersQuery();

//   return (
//     <Box sx={{ p: 4, bgcolor: 'background.default', minHeight: '100vh' }}>
//       <Typography variant="h3" color="primary" mb={2}>אזור העובד</Typography>
//       <Typography variant="h5" color="secondary" mb={4}>ניהול מטופלים ותורים</Typography>
//       <Grid container spacing={3}>
//         <Grid size={{ xs: 12, sm: 6 }}>
//           <Card sx={{ boxShadow: 2, borderRadius: 4 }}>
//             <CardContent>
//               <Typography variant="h6" color="primary">מטופלים שלך</Typography>
//               {isLoading ? <CircularProgress color="primary" /> : error ? <Typography color="error">שגיאה בטעינת נתונים</Typography> :
//                 workers?.map(worker => (
//                   <Box key={worker.workerId} display="flex" alignItems="center" mb={2}>
//                     <img alt="Baby" style={{ width: 32, marginRight: 8 }} />
//                     <Typography>{worker.name} ({worker.workerType})</Typography>
//                   </Box>
//                 ))
//               }
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid size={{ xs: 12, sm: 6 }}>
//           <Card sx={{ boxShadow: 2, borderRadius: 4 }}>
//             <CardContent>
//               <Typography variant="h6" color="primary">פעולות מהירות</Typography>
//               <Button variant="contained" color="success" sx={{ mt: 2 }}>הוסף תור חדש</Button>
//               <Button variant="outlined" color="info" sx={{ mt: 2 }}>צפה בהיסטוריית תורים</Button>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };
// export default WorkerDashboard;

import React from 'react';
import { useGetAllWorkersQuery } from '../../api/workerApi';
import '../../styles/WorkerDashboard.css';

const WorkerDashboard: React.FC = () => {
  const { data: workers, isLoading, error } = useGetAllWorkersQuery();

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">אזור העובד</h2>
      <div className="status-message">
        {isLoading && "טוען נתונים..."}
        {error && <span className="error">שגיאה בטעינת נתונים</span>}
      </div>
      <table className="workers-table">
        <thead>
          <tr>
            <th>שם</th>
            <th>תפקיד</th>
            <th>טלפון</th>
            <th>אימייל</th>
          </tr>
        </thead>
        <tbody>
          {workers?.map(worker => (
            <tr key={worker.workerId}>
              <td>{worker.name}</td>
              <td>{worker.workerType}</td>
              <td>{worker.phone}</td>
              <td>{worker.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkerDashboard;
