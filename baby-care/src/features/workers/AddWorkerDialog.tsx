import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { useAddWorkerMutation } from '../../api/workerApi';

interface Props {
  open: boolean;
  onClose: () => void;
}

const AddWorkerDialog: React.FC<Props> = ({ open, onClose }) => {

  const [form, setForm] = useState({
    Id: 0,
    workerId: '',
    name: '',
    birthdate: '',
    phone: '',
    email: '',
    workerType: '',
    startDate: '',
    experience: 0,
  });


  const [addWorker] = useAddWorkerMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const numericFields = ["experience", "Id"];

    setForm({
      ...form,
      [name]: numericFields.includes(name) ? Number(value) : value,
    });
  };


  const handleSubmit = async () => {
    await addWorker(form);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>הוספת עובד חדש</DialogTitle>
      <DialogContent>
        <TextField label="תעודת זהות" name="workerId" fullWidth onChange={handleChange} />
        <TextField label="שם מלא" name="name" fullWidth onChange={handleChange} />
        <TextField label="תאריך לידה" name="birthdate" fullWidth type="date" onChange={handleChange} InputLabelProps={{ shrink: true }} />
        <TextField label="טלפון" name="phone" fullWidth onChange={handleChange} />
        <TextField label="אימייל" name="email" fullWidth onChange={handleChange} />
        <TextField label="תפקיד" name="workerType" fullWidth onChange={handleChange} />
        <TextField label="תאריך התחלה" name="startDate" fullWidth type="date" onChange={handleChange} InputLabelProps={{ shrink: true }} />
        <TextField label="שנות ניסיון" name="experience" fullWidth type="number" onChange={handleChange} />

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>בטל</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">שמור</Button>
      </DialogActions>
    </Dialog>

  );
};

export default AddWorkerDialog;
