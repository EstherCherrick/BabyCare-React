// // import React, { useState } from 'react';
// // import { Box, Typography, Button, IconButton, Dialog} from '@mui/material';
// // import { Delete, Edit, PersonAdd } from '@mui/icons-material';
// // import { useGetAllWorkersQuery, useDeleteWorkerMutation} from '../../api/workerApi';
// // import { Worker } from '../../features/workers/types';
// // import ConfirmDeleteDialog from '../../features/workers/ConfirmDeleteDialog';
// // import AddWorkerDialog from '../../features/workers/AddWorkerDialog';
// // import EditWorkerDialog from '../../features/workers/EditWorkerDialog';

// // const AdminDashboard = () => {
// //   const { data: workers, isLoading, error } = useGetAllWorkersQuery();
// //   const [deleteWorker] = useDeleteWorkerMutation();

// //   const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
// //   const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
// //   const [openAddDialog, setOpenAddDialog] = useState(false);
// //   const [openEditDialog, setOpenEditDialog] = useState(false);

// //   const handleDelete = async (worker: Worker) => {
// //     setSelectedWorker(worker);
// //     setOpenDeleteDialog(true);
// //   };

// //   const confirmDelete = () => {
// //     if (selectedWorker) {
// //       deleteWorker({ id: selectedWorker.workerId, name: selectedWorker.name });
// //     }
// //     setOpenDeleteDialog(false);
// //   };

// //   const handleEdit = (worker: Worker) => {
// //     setSelectedWorker(worker);
// //     setOpenEditDialog(true);
// //   };

// //   if (isLoading) return <Typography>טוען עובדים...</Typography>;
// //   if (error) return <Typography>שגיאה בטעינת עובדים</Typography>;

// //   return (
// //     <Box p={4} bgcolor="#f5f9ff">
// //       <Typography variant="h4" mb={2}>ניהול עובדים</Typography>

// //       <Button
// //         variant="contained"
// //         color="primary"
// //         startIcon={<PersonAdd />}
// //         onClick={() => setOpenAddDialog(true)}
// //       >
// //         הוסף עובד
// //       </Button>

// //       <Box mt={3}>
// //         {workers?.map((worker) => (
// //           <Box
// //             key={worker.workerId}
// //             display="flex"
// //             justifyContent="space-between"
// //             alignItems="center"
// //             bgcolor="#fff"
// //             p={2}
// //             mb={1}
// //             boxShadow={1}
// //             borderRadius={2}
// //           >
// //             <Typography>
// //               {worker.name} - {worker.workerType}
// //             </Typography>
// //             <Box>
// //               <IconButton onClick={() => handleEdit(worker)}><Edit /></IconButton>
// //               <IconButton onClick={() => handleDelete(worker)}><Delete color="error" /></IconButton>
// //             </Box>
// //           </Box>
// //         ))}
// //       </Box>

// //       <AddWorkerDialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} />
// //       <EditWorkerDialog worker={selectedWorker} open={openEditDialog} onClose={() => setOpenEditDialog(false)} />
// //       <ConfirmDeleteDialog
// //         open={openDeleteDialog}
// //         onClose={() => setOpenDeleteDialog(false)}
// //         onConfirm={confirmDelete}
// //         worker={selectedWorker}
// //       />
// //     </Box>
// //   );
// // };

// // export default AdminDashboard;

// // import React, { useState } from 'react';
// // import { Box, Typography, Button, IconButton, Paper } from '@mui/material';
// // import { Delete, Edit, PersonAdd } from '@mui/icons-material';
// // import { DataGrid } from '@mui/x-data-grid'; // Change to DataGrid
// // import { useGetAllWorkersQuery, useDeleteWorkerMutation } from '../../api/workerApi';
// // import { Worker } from '../../features/workers/types';
// // import ConfirmDeleteDialog from '../../features/workers/ConfirmDeleteDialog';
// // import AddWorkerDialog from '../../features/workers/AddWorkerDialog';
// // import EditWorkerDialog from '../../features/workers/EditWorkerDialog';

// // const AdminDashboard = () => {
// //   const { data: workers, isLoading, error } = useGetAllWorkersQuery();
// //   const [deleteWorker] = useDeleteWorkerMutation();

// //   const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
// //   const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
// //   const [openAddDialog, setOpenAddDialog] = useState(false);
// //   const [openEditDialog, setOpenEditDialog] = useState(false);

// //   const handleDelete = (worker: Worker) => {
// //     setSelectedWorker(worker);
// //     setOpenDeleteDialog(true);
// //   };

// //   const confirmDelete = () => {
// //     if (selectedWorker) {
// //       deleteWorker({ id: selectedWorker.workerId, name: selectedWorker.name });
// //     }
// //     setOpenDeleteDialog(false);
// //   };

// //   const handleEdit = (worker: Worker) => {
// //     setSelectedWorker(worker);
// //     setOpenEditDialog(true);
// //   };

// //   const columns = [
// //     { field: 'name', headerName: 'שם', flex: 1 },
// //     { field: 'workerType', headerName: 'סוג עובד', flex: 1 },
// //     {
// //       field: 'actions',
// //       headerName: 'פעולות',
// //       renderCell: (cellValues: any) => (
// //         <Box>
// //           <IconButton onClick={() => handleEdit(cellValues.row)}><Edit /></IconButton>
// //           <IconButton onClick={() => handleDelete(cellValues.row)}><Delete color="error" /></IconButton>
// //         </Box>
// //       ),
// //     },
// //   ];

// //   if (isLoading) return <Typography>טוען עובדים...</Typography>;
// //   if (error) return <Typography>שגיאה בטעינת עובדים</Typography>;

// //   return (
// //     <Box display="flex" p={0} bgcolor="#f5f9ff" height="100vh">
// //       <Box flex={1} display="flex" flexDirection="column" p={1}>
// //         <Paper elevation={3} style={{ padding: '16px', marginBottom: '0', borderRadius: '0' }}>
// //           <Typography variant="h4">ניהול עובדים</Typography>
// //           <Button
// //             variant="contained"
// //             color="primary"
// //             startIcon={<PersonAdd />}
// //             onClick={() => setOpenAddDialog(true)}
// //           >
// //             הוסף עובד
// //           </Button>
// //         </Paper>
// //         <Paper elevation={3} style={{ height: '100%', flex: 1, borderRadius: '0' }}>
// //           <DataGrid
// //             loading={isLoading}
// //             rows={workers || []}
// //             columns={columns}
// //             onRowClick={(row: any) => setSelectedWorker(row)}
// //             pagination
// //           />
// //         </Paper>
// //       </Box>

// //       <Box flex={1} display="flex" flexDirection="column" p={1}>
// //         <Paper elevation={3} style={{ flex: 1, marginBottom: '16px', padding: '16px', borderRadius: '0' }}>
// //           <Typography variant="h6">סטטיסטיקה 1</Typography>
// //           {/* Add your visual statistic component here */}
// //         </Paper>
// //         <Paper elevation={3} style={{ flex: 1, padding: '16px', borderRadius: '0' }}>
// //           <Typography variant="h6">סטטיסטיקה 2</Typography>
// //           {/* Add your visual statistic component here */}
// //         </Paper>
// //       </Box>

// //       <AddWorkerDialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} />
// //       <EditWorkerDialog worker={selectedWorker} open={openEditDialog} onClose={() => setOpenEditDialog(false)} />
// //       <ConfirmDeleteDialog
// //         open={openDeleteDialog}
// //         onClose={() => setOpenDeleteDialog(false)}
// //         onConfirm={confirmDelete}
// //         worker={selectedWorker}
// //       />
// //     </Box>
// //   );
// // };

// // export default AdminDashboard;

// import React, { useState } from 'react';
// import { Box, Typography, Button, IconButton, Paper } from '@mui/material';
// import { Delete, Edit, PersonAdd } from '@mui/icons-material';
// import { DataGrid } from '@mui/x-data-grid';
// import { useGetAllWorkersQuery, useDeleteWorkerMutation } from '../../api/workerApi';
// import { Worker } from '../../features/workers/types';
// import ConfirmDeleteDialog from '../../features/workers/ConfirmDeleteDialog';
// import AddWorkerDialog from '../../features/workers/AddWorkerDialog';
// import EditWorkerDialog from '../../features/workers/EditWorkerDialog';

// const AdminDashboard = () => {
//   const { data: workers, isLoading, error } = useGetAllWorkersQuery();
//   const [deleteWorker] = useDeleteWorkerMutation();

//   const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
//   const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
//   const [openAddDialog, setOpenAddDialog] = useState(false);
//   const [openEditDialog, setOpenEditDialog] = useState(false);

//   const handleDelete = (worker: Worker) => {
//     setSelectedWorker(worker);
//     setOpenDeleteDialog(true);
//   };

//   const confirmDelete = () => {
//     if (selectedWorker) {
//       deleteWorker({ id: selectedWorker.workerId, name: selectedWorker.name });
//     }
//     setOpenDeleteDialog(false);
//   };

//   const handleEdit = (worker: Worker) => {
//     setSelectedWorker(worker);
//     setOpenEditDialog(true);
//   };

//   const columns = [
//     { field: 'name', headerName: 'שם', flex: 1 },
//     { field: 'workerType', headerName: 'סוג עובד', flex: 1 },
//     {
//       field: 'actions',
//       headerName: 'פעולות',
//       renderCell: (cellValues: any) => (
//         <Box>
//           <IconButton onClick={() => handleEdit(cellValues.row)}><Edit /></IconButton>
//           <IconButton onClick={() => handleDelete(cellValues.row)}><Delete color="error" /></IconButton>
//         </Box>
//       ),
//     },
//   ];

//   if (isLoading) return <Typography>טוען עובדים...</Typography>;
//   if (error) return <Typography>שגיאה בטעינת עובדים</Typography>;

//   return (
//     <Box display="flex" p={0} bgcolor="#f5f9ff" height="100vh">
//       <Box flex={1} display="flex" flexDirection="column" p={1}>
//         <Paper elevation={3} style={{ padding: '16px', marginBottom: '0', borderRadius: '0' }}>
//           <Typography variant="h4">ניהול עובדים</Typography>
//           <Button
//             variant="contained"
//             color="primary"
//             startIcon={<PersonAdd />}
//             onClick={() => setOpenAddDialog(true)}
//           >
//             הוסף עובד
//           </Button>
//         </Paper>
//         <Paper elevation={3} style={{ height: '100%', flex: 1, borderRadius: '0', marginBottom: '0' }}>
//           <DataGrid
//             loading={isLoading}
//             rows={workers || []}
//             columns={columns}
//             onRowClick={(row: any) => setSelectedWorker(row)}
//             pagination
//           />
//         </Paper>
//       </Box>

//       <Box flex={1} display="flex" flexDirection="column" p={1}>
//         <Paper elevation={3} style={{ flex: 1, marginBottom: '0', padding: '16px', borderRadius: '0' }}>
//           <Typography variant="h6">סטטיסטיקה 1</Typography>
//           {/* Add your visual statistic component here */}
//         </Paper>
//         <Paper elevation={3} style={{ flex: 1, padding: '16px', borderRadius: '0', marginBottom: '0' }}>
//           <Typography variant="h6">סטטיסטיקה 2</Typography>
//           {/* Add your visual statistic component here */}
//         </Paper>
//       </Box>

//       <AddWorkerDialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} />
//       <EditWorkerDialog worker={selectedWorker} open={openEditDialog} onClose={() => setOpenEditDialog(false)} />
//       <ConfirmDeleteDialog
//         open={openDeleteDialog}
//         onClose={() => setOpenDeleteDialog(false)}
//         onConfirm={confirmDelete}
//         worker={selectedWorker}
//       />
//     </Box>
//   );
// };

// export default AdminDashboard;

import React from "react";
import { useGetAllWorkersQuery } from "../../api/workerApi";
import { useGetAllBabiesQuery } from "../../api/babyApi";
// import { useGetVaccinesQuery } from "../../api/vaccineApi";
import { Bar } from "react-chartjs-2";
import "../../styles/adminDashboard.css";

const AdminDashboard: React.FC = () => {
  const { data: workers, isLoading: loadingWorkers } = useGetAllWorkersQuery();
  const { data: babies, isLoading: loadingBabies } = useGetAllBabiesQuery();
//   const { data: vaccines, isLoading: loadingVaccines } = useGetVaccinesQuery();

  // דוגמה לסטטיסטיקות
  const stats = {
    workers: workers?.length || 0,
    babies: babies?.length || 0,
    // vaccines: vaccines?.length || 0,
  };

  // דוגמה לגרף
  const chartData = {
    labels: ["עובדים", "תינוקות", "חיסונים"],
    datasets: [
      {
        label: "סטטיסטיקות",
        // data: [stats.workers, stats.babies, stats.vaccines],
        backgroundColor: ["#0ea5e9", "#3b82f6", "#16a34a"],
      },
    ],
  };

  return (
    <div className="admin-dashboard-container">
      <header className="admin-dashboard-header">
        <h2>דשבורד מנהל</h2>
        <p>ניהול כולל של המרפאה</p>
      </header>
      <section className="dashboard-section">
        <h3>סטטיסטיקות כלליות</h3>
        <div className="stats-cards">
          <div className="stat-card">
            <span>עובדים</span>
            <strong>{stats.workers}</strong>
          </div>
          <div className="stat-card">
            <span>תינוקות</span>
            <strong>{stats.babies}</strong>
          </div>
          <div className="stat-card">
            <span>חיסונים</span>
            {/* <strong>{stats.vaccines}</strong> */}
          </div>
        </div>
        <div className="chart-container">
          {/* <Bar data={chartData} /> */}
        </div>
      </section>
      <section className="dashboard-section">
        <h3>רשימת עובדים</h3>
        {loadingWorkers ? (
          <div className="loader"></div>
        ) : (
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>שם</th>
                <th>תפקיד</th>
                <th>טלפון</th>
                <th>אימייל</th>
              </tr>
            </thead>
            <tbody>
              {workers?.map((worker: any) => (
                <tr key={worker.workerId}>
                  <td>{worker.name}</td>
                  <td>{worker.workerType}</td>
                  <td>{worker.phone}</td>
                  <td>{worker.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
      <section className="dashboard-section">
        <h3>רשימת תינוקות</h3>
        {loadingBabies ? (
          <div className="loader"></div>
        ) : (
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>שם</th>
                <th>ת.ז</th>
                <th>תאריך לידה</th>
              </tr>
            </thead>
            <tbody>
              {babies?.map((baby: any) => (
                <tr key={baby.id}>
                  <td>{baby.name}</td>
                  <td>{baby.babyId}</td>
                  <td>{baby.birthdate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
