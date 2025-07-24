import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography
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
        <Typography>
          האם אתה בטוח שברצונך למחוק את העובד:
        </Typography>
        <Typography fontWeight="bold">
          {worker?.name} ({worker?.workerType})
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>בטל</Button>
        <Button onClick={onConfirm} color="error" variant="contained">מחק</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
