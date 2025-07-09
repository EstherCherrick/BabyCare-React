import React, { useState } from 'react';
import {
  Box, Typography, Button, IconButton, Dialog
} from '@mui/material';
import { Delete, Edit, PersonAdd } from '@mui/icons-material';
import {
  useGetAllWorkersQuery,
  useDeleteWorkerMutation
} from '../workersApi';
import { Worker } from '../types';
import ConfirmDeleteDialog from '../ConfirmDeleteDialog';
import AddWorkerDialog from '../AddWorkerDialog';
import EditWorkerDialog from '../EditWorkerDialog';

const WorkersDashboard = () => {
  const { data: workers, isLoading, error } = useGetAllWorkersQuery();
  const [deleteWorker] = useDeleteWorkerMutation();

  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const handleDelete = async (worker: Worker) => {
    setSelectedWorker(worker);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (selectedWorker) {
      deleteWorker({ id: selectedWorker.workerId, name: selectedWorker.name });
    }
    setOpenDeleteDialog(false);
  };

  const handleEdit = (worker: Worker) => {
    setSelectedWorker(worker);
    setOpenEditDialog(true);
  };

  if (isLoading) return <Typography>טוען עובדים...</Typography>;
  if (error) return <Typography>שגיאה בטעינת עובדים</Typography>;

  return (
    <Box p={4} bgcolor="#f5f9ff">
      <Typography variant="h4" mb={2}>ניהול עובדים</Typography>

      <Button
        variant="contained"
        color="primary"
        startIcon={<PersonAdd />}
        onClick={() => setOpenAddDialog(true)}
      >
        הוסף עובד
      </Button>

      <Box mt={3}>
        {workers?.map((worker) => (
          <Box
            key={worker.id}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            bgcolor="#fff"
            p={2}
            mb={1}
            boxShadow={1}
            borderRadius={2}
          >
            <Typography>
                {worker.name} - {worker.workerType}
            </Typography>
            <Box>
              <IconButton onClick={() => handleEdit(worker)}><Edit /></IconButton>
              <IconButton onClick={() => handleDelete(worker)}><Delete color="error" /></IconButton>
            </Box>
          </Box>
        ))}
      </Box>

      <AddWorkerDialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} />
      <EditWorkerDialog worker={selectedWorker} open={openEditDialog} onClose={() => setOpenEditDialog(false)} />
      <ConfirmDeleteDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={confirmDelete}
        worker={selectedWorker}
      />
    </Box>
  );
};

export default WorkersDashboard;
