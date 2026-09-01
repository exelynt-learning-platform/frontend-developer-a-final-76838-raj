import React from 'react';
import { Dialog, DialogTitle, DialogActions, Button, Typography } from '@mui/material';

export default function ConfirmDialog({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <Typography sx={{ px: 3 }}>Are you sure you want to delete this employee?</Typography>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="outlined">Cancel</Button>
        <Button onClick={onConfirm} variant="contained" color="error">Delete</Button>
      </DialogActions>
    </Dialog>
  );
}