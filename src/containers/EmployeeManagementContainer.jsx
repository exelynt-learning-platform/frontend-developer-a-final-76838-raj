import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees, getCountries, addEmployee, editEmployee, removeEmployee, getEmployeeById, clearSearch } from '../store/employeeSlice';
import EmployeeTable from '../components/EmployeeTable';
import EmployeeFormModal from '../components/EmployeeFormModal';
import ConfirmDialog from '../components/ConfirmDialog';
import { Container, Typography, Button, TextField, Box, CircularProgress, Alert, Paper } from '@mui/material';

export default function EmployeeManagementContainer() {
  const dispatch = useDispatch();
  const { employees, countries, searchedEmployee, loading, error } = useSelector((state) => state.employee);

  const [searchId, setSearchId] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getCountries());
  }, [dispatch]);

  const handleSearch = () => {
    if (searchId.trim()) dispatch(getEmployeeById(searchId.trim()));
  };

  const handleResetSearch = () => {
    setSearchId('');
    dispatch(clearSearch());
  };

  const handleSubmitForm = (values) => {
    if (editData) {
      dispatch(editEmployee({ id: editData.id, data: values }));
    } else {
      dispatch(addEmployee(values));
    }
    setEditData(null);
  };

  const handleDeleteConfirm = () => {
    if (deleteId) {
      dispatch(removeEmployee(deleteId));
      setDeleteId(null);
    }
  };

  const displayList = searchedEmployee ? [searchedEmployee] : employees;

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          Employee Management Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={4}>
          Manage employees, search records, and handle details seamlessly.
        </Typography>
        
        <Box display="flex" justifyContent="space-between" mb={3} gap={2} flexWrap="wrap">
          <Box display="flex" gap={1} flexGrow={1} maxWidth={400}>
            <TextField 
              fullWidth 
              size="small" 
              placeholder="Search by Employee ID..." 
              value={searchId} 
              onChange={(e) => setSearchId(e.target.value)} 
            />
            <Button variant="contained" onClick={handleSearch}>Search</Button>
            {searchedEmployee && <Button variant="outlined" onClick={handleResetSearch}>Reset</Button>}
          </Box>
          <Button variant="contained" color="success" onClick={() => { setEditData(null); setModalOpen(true); }}>
            + Add Employee
          </Button>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {loading && <Box display="flex" justifyContent="center" my={4}><CircularProgress /></Box>}

        {!loading && (
          <EmployeeTable 
            employees={displayList} 
            onEdit={(emp) => { setEditData(emp); setModalOpen(true); }} 
            onDelete={(id) => setDeleteId(id)} 
          />
        )}
      </Paper>

      <EmployeeFormModal 
        open={modalOpen} 
        handleClose={() => setModalOpen(false)} 
        onSubmit={handleSubmitForm} 
        initialValues={editData} 
        countries={countries} 
      />

      <ConfirmDialog 
        open={Boolean(deleteId)} 
        onClose={() => setDeleteId(null)} 
        onConfirm={handleDeleteConfirm} 
      />
    </Container>
  );
}