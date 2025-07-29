import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, Stack
} from '@mui/material';
import { Worker } from '../../types/worker';

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  worker: Worker | null;
}

const ConfirmDeleteDialog: React.FC<Props> = ({ open, onClose, onConfirm, worker }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>אישור מחיקת עובד</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Typography>
            האם אתה בטוח שברצונך למחוק את העובד:
          </Typography>
          <Typography fontWeight="bold">
            {worker?.name} ({worker?.workerType})
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" sx={{ bgcolor: '#f5f5f5', color: '#333', fontWeight: 600, fontSize: '1rem', boxShadow: 0 }}>בטל</Button>
        <Button onClick={onConfirm} variant="contained" sx={{ bgcolor: '#d32f2f', color: '#fff', fontWeight: 600, fontSize: '1rem', boxShadow: 0 }}>מחק</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
