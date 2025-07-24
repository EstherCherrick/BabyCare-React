import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { Worker } from '../../types/worker';
import { useUpdateWorkerMutation } from '../../api/workerApi';

interface Props {
  open: boolean;
  onClose: () => void;
  worker: Worker | null;
}

const EditWorkerDialog: React.FC<Props> = ({ open, onClose, worker }) => {
  const [form, setForm] = useState<Partial<Worker>>({});
  const [updateWorker] = useUpdateWorkerMutation();

  useEffect(() => {
    if (worker) {
      setForm(worker);
    }
  }, [worker, open]); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "experience" ? parseInt(value) : value }); 
  };

const handleSubmit = async () => {
  if (form.workerId) {
    await updateWorker({ ...form, workerId: form.workerId } as Worker); 
    onClose();
  }
};


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>עריכת פרטי עובד</DialogTitle>
      <DialogContent>
        <TextField
          label="שם מלא"
          name="name"
          value={form.name || ''} 
          fullWidth
          onChange={handleChange}
        />
        <TextField
          label="טלפון"
          name="phone"
          value={form.phone || ''}
          fullWidth
          onChange={handleChange}
        />
        <TextField
          label="אימייל"
          name="email"
          value={form.email || ''} 
          fullWidth
          onChange={handleChange}
        />
        <TextField
          label="תפקיד"
          name="workerType"
          value={form.workerType || ''} 
          fullWidth
          onChange={handleChange}
        />
        <TextField
          label="שנות ניסיון"
          name="experience"
          value={form.experience || ''} 
          fullWidth
          type="number"
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>בטל</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">עדכן</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditWorkerDialog;
