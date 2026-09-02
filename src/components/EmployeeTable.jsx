import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';

export default function EmployeeTable({ employees, onEdit, onDelete }) {
  if (!employees || employees.length === 0) {
    return <Typography sx={{ p: 2, textAlign: 'center' }}>No employees found.</Typography>;
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: 'grey.100' }}>
            <TableCell><b>ID</b></TableCell>
            <TableCell><b>Name</b></TableCell>
            <TableCell><b>Email</b></TableCell>
            <TableCell><b>Mobile</b></TableCell>
            <TableCell><b>Country</b></TableCell>
            <TableCell align="right"><b>Actions</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((emp) => (
            <TableRow key={emp.id}>
              <TableCell>{emp.id}</TableCell>
              <TableCell>{emp.name}</TableCell>
              <TableCell>{emp.email}</TableCell>
              <TableCell>{emp.mobile}</TableCell>
              <TableCell>{emp.country}</TableCell>
              <TableCell align="right">
                <Button variant="outlined" size="small" onClick={() => onEdit(emp)} sx={{ mr: 1 }}>Edit</Button>
                <Button variant="contained" color="error" size="small" onClick={() => onDelete(emp.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}