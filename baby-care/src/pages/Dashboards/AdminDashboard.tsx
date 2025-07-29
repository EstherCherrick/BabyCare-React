import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Popover,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Tooltip,
  Divider,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip as ChartTooltip, Legend } from "chart.js";
import { useGetAllWorkersQuery, useGetAmountOfEachTypeQuery, useDeleteWorkerMutation, useUpdateWorkerMutation } from "../../api/workerApi";
import { useGetAllBabiesQuery } from "../../api/babyApi";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "../../styles/adminDashboard.css";
import AddWorkerDialog from "../../features/workers/AddWorkerDialog";
import EditWorkerDialog from "../../features/workers/EditWorkerDialog";
import ConfirmDeleteDialog from "../../features/workers/ConfirmDeleteDialog";

Chart.register(CategoryScale, LinearScale, BarElement, Title, ChartTooltip, Legend);

const AdminDashboard: React.FC = () => {
  const { data: workers = [], isLoading: loadingWorkers } = useGetAllWorkersQuery();
  const { data: babies = [], isLoading: loadingBabies } = useGetAllBabiesQuery();
  const { data: workerTypeStats = {}, isLoading: loadingStats } = useGetAmountOfEachTypeQuery();
  const [deleteWorker] = useDeleteWorkerMutation();
  const [anchorElWorkers, setAnchorElWorkers] = useState<null | HTMLElement>(null);
  const [anchorElBabies, setAnchorElBabies] = useState<null | HTMLElement>(null);
  const workersPopoverRef = useRef<HTMLDivElement>(null);
  const babiesPopoverRef = useRef<HTMLDivElement>(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [selectedWorker, setSelectedWorker] = useState<any>(null);
  const [selectedBaby, setSelectedBaby] = useState<any>(null);

  const chartData = {
    labels: Object.keys(workerTypeStats),
    datasets: [
      {
        label: "כמות עובדים",
        data: Object.values(workerTypeStats),
        backgroundColor: "#0ea5e9",
      },
    ],
  };

  const handleEditWorker = (worker: any) => {
    setSelectedWorker(worker);
    setOpenEditDialog(true);
  };
  const handleDeleteWorker = (worker: any) => {
    setSelectedWorker(worker);
    setOpenDeleteDialog(true);
  };
  const confirmDeleteWorker = async () => {
    if (selectedWorker) {
      await deleteWorker({ id: selectedWorker.workerId, name: selectedWorker.name });
    }
    setOpenDeleteDialog(false);
    setSelectedWorker(null);
  };

  const handleDeleteBaby = (baby: any) => {
    setSelectedBaby(baby);
  };

  return (
      <Box sx={{ minHeight: "100vh", width: '100vw', maxWidth: '100vw', boxSizing: 'border-box', p: 0, m: 0 }}>
        <Typography variant="h2" sx={{ color: "#1565c0", fontWeight: 800, mb: 2, fontFamily: 'Tahoma, Arial, sans-serif', letterSpacing: 1 }}>דשבורד מנהל</Typography>
        <Typography variant="h5" sx={{ mb: 4, color: '#333', fontFamily: 'Tahoma, Arial, sans-serif', fontWeight: 400 }}>ניהול כולל של המרפאה</Typography>

        <Box display="flex" gap={0.5} mb={4} flexWrap="nowrap" justifyContent="center" alignItems="center">
          {/* כפתור עובדים */}
          <Button
            variant="contained"
            color="primary"
            sx={{ minWidth: 32, height: 28, fontWeight: 700, fontSize: "0.85rem", color: '#fff', px: 0.2, py: 0.2, boxShadow: 1, borderRadius: 2, letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 0.2 }}
            onMouseEnter={e => setAnchorElWorkers(e.currentTarget)}
            onMouseLeave={e => {
              setTimeout(() => {
                const popoverHovered = workersPopoverRef.current && workersPopoverRef.current.matches && workersPopoverRef.current.matches(':hover');
                const buttonHovered = e.currentTarget && e.currentTarget.matches && e.currentTarget.matches(':hover');
                if (!popoverHovered && !buttonHovered) {
                  setAnchorElWorkers(null);
                }
              }, 800);
            }}
          >
            עובדים&nbsp;({workers.length})
          </Button>
          <Popover
            open={Boolean(anchorElWorkers)}
            anchorEl={anchorElWorkers}
            onClose={() => setAnchorElWorkers(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            PaperProps={{
              style: { maxHeight: 420, overflowY: "auto", minWidth: 220, borderRadius: 12, boxShadow: '0 4px 24px #0002' },
              ref: workersPopoverRef,
              onMouseEnter: () => setAnchorElWorkers(anchorElWorkers),
              onMouseLeave: () => setAnchorElWorkers(null)
            }}
          >
            <List>
              {workers.map((worker: any, idx: number) => (
                <React.Fragment key={worker.workerId}>
                  <ListItem
                    secondaryAction={
                      <Box display="flex" gap={1}>
                        <Tooltip title="ערוך">
                          <IconButton edge="end" size="small" sx={{ p: 0.5, bgcolor: 'transparent', border: 'none', boxShadow: 'none', outline: 'none' }} onClick={() => handleEditWorker(worker)}>
                            <EditOutlinedIcon sx={{ color: '#757575', fontSize: 18, border: 'none', bgcolor: 'transparent', boxShadow: 'none', outline: 'none' }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="מחק">
                          <IconButton edge="end" size="small" sx={{ p: 0.5, bgcolor: 'transparent', border: 'none', boxShadow: 'none', outline: 'none' }} onClick={() => handleDeleteWorker(worker)}>
                            <DeleteOutlineIcon sx={{ color: '#d32f2f', fontSize: 18, border: 'none', bgcolor: 'transparent', boxShadow: 'none', outline: 'none' }} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    }
                    sx={{ py: 0.7, px: 0.7 }}
                  >
                    <ListItemText
                      primary={<span style={{ fontWeight: 600, fontSize: '1.02rem', color: '#1976d2', fontFamily: 'Tahoma, Arial, sans-serif' }}>{worker.name} <span style={{ color: "#333", fontWeight: 400 }}>({worker.workerType})</span></span>}
                      secondary={<span style={{ color: '#666', fontSize: '0.90rem', fontFamily: 'Tahoma, Arial, sans-serif' }}>{worker.email}</span>}
                    />
                  </ListItem>
                  {idx < workers.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Popover>
          <Button
            variant="contained"
            color="secondary"
            sx={{ minWidth: 32, height: 28, fontWeight: 700, fontSize: "0.85rem", color: '#fff', px: 0.2, py: 0.2, boxShadow: 1, borderRadius: 2, letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 0.2 }}
            onMouseEnter={e => setAnchorElBabies(e.currentTarget)}
            onMouseLeave={e => {
              setTimeout(() => {
                const popoverHovered = babiesPopoverRef.current && babiesPopoverRef.current.matches && babiesPopoverRef.current.matches(':hover');
                const buttonHovered = e.currentTarget && e.currentTarget.matches && e.currentTarget.matches(':hover');
                if (!popoverHovered && !buttonHovered) {
                  setAnchorElBabies(null);
                }
              }, 800);
            }}
          >
            תינוקות&nbsp;({babies.length})
          </Button>
          <Popover
            open={Boolean(anchorElBabies)}
            anchorEl={anchorElBabies}
            onClose={() => setAnchorElBabies(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            PaperProps={{
              style: { maxHeight: 420, overflowY: "auto", minWidth: 220, borderRadius: 12, boxShadow: '0 4px 24px #0002' },
              ref: babiesPopoverRef,
              onMouseEnter: () => setAnchorElBabies(anchorElBabies),
              onMouseLeave: () => setAnchorElBabies(null)
            }}
          >
            <List>
              {babies.map((baby: any, idx: number) => (
                <React.Fragment key={baby.babyId}>
                  <ListItem
                    secondaryAction={
                      <Tooltip title="מחק">
                        <IconButton edge="end" size="small" sx={{ p: 0.5, bgcolor: 'transparent', border: 'none', boxShadow: 'none', outline: 'none' }} onClick={() => handleDeleteBaby(baby)}>
                          <DeleteOutlineIcon sx={{ color: '#d32f2f', fontSize: 18, border: 'none', bgcolor: 'transparent', boxShadow: 'none', outline: 'none' }} />
                        </IconButton>
                      </Tooltip>
                    }
                    sx={{ py: 0.7, px: 0.7 }}
                  >
                    <ListItemText
                      primary={<span style={{ fontWeight: 600, fontSize: '1.02rem', color: '#1976d2', fontFamily: 'Tahoma, Arial, sans-serif' }}>{baby.name}</span>}
                      secondary={<span style={{ color: '#666', fontSize: '0.90rem', fontFamily: 'Tahoma, Arial, sans-serif' }}>{`ת.ז: ${baby.babyId}`}</span>}
                    />
                  </ListItem>
                  {idx < babies.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Popover>

          <Button
            variant="contained"
            color="info"
            startIcon={<PersonAddIcon />}
            sx={{ minWidth: 32, height: 28, fontWeight: 700, fontSize: "0.85rem", color: '#fff', px: 0.2, py: 0.2, boxShadow: 1, borderRadius: 2, letterSpacing: 1, gap: 0.2, display: 'flex', alignItems: 'center' }}
            onClick={() => setOpenAddDialog(true)}
          >
            הוסף עובד
          </Button>
        </Box>

        {/* סטטיסטיקה לפי סוגי עובדים */}
        <Box sx={{ maxWidth: 700, mx: 'auto', mt: 2 }}>
          <Typography variant="h4" sx={{ mb: 2, color: "#1976d2", fontWeight: 700, fontFamily: 'Tahoma, Arial, sans-serif' }}>סטטיסטיקה לפי סוגי עובדים</Typography>
          {loadingStats ? (
            <div className="loader"></div>
          ) : (
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { x: { title: { display: true, text: "סוג עובד" } }, y: { title: { display: true, text: "כמות" }, beginAtZero: true } }
              }}
            />
          )}
        </Box>

        {/* דיאלוגים */}
        <AddWorkerDialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} />
        <EditWorkerDialog worker={selectedWorker} open={openEditDialog} onClose={() => { setOpenEditDialog(false); setSelectedWorker(null); }} />
        <ConfirmDeleteDialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          onConfirm={confirmDeleteWorker}
          worker={selectedWorker}
        />
      </Box>
  );
};

export default AdminDashboard;