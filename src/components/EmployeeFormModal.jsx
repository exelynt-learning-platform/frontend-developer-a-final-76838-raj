import React from 'react';
import { Modal, Box, Typography, TextField, Button, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required').max(50, 'Too long'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  mobile: Yup.string().required('Mobile is required').matches(/^[0-9]{10}$/, 'Must be 10 digits'),
  country: Yup.string().required('Country is required'),
  state: Yup.string().required('State is required'),
  district: Yup.string().required('District is required'),
});

const style = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 450, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2 };

export default function EmployeeFormModal({ open, handleClose, onSubmit, initialValues, countries }) {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues || { name: '', email: '', mobile: '', country: '', state: '', district: '' },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
      handleClose();
    },
  });

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>{initialValues ? 'Edit Employee' : 'Add Employee'}</Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField fullWidth margin="dense" name="name" label="Name" value={formik.values.name} onChange={formik.handleChange} error={formik.touched.name && Boolean(formik.errors.name)} helperText={formik.touched.name && formik.errors.name} />
          <TextField fullWidth margin="dense" name="email" label="Email" value={formik.values.email} onChange={formik.handleChange} error={formik.touched.email && Boolean(formik.errors.email)} helperText={formik.touched.email && formik.errors.email} />
          <TextField fullWidth margin="dense" name="mobile" label="Mobile (10 digits)" value={formik.values.mobile} onChange={formik.handleChange} error={formik.touched.mobile && Boolean(formik.errors.mobile)} helperText={formik.touched.mobile && formik.errors.mobile} />
          
          <TextField 
            select 
            fullWidth 
            margin="dense" 
            name="country" 
            label="Country" 
            value={formik.values.country} 
            onChange={formik.handleChange} 
            error={formik.touched.country && Boolean(formik.errors.country)} 
            helperText={formik.touched.country && formik.errors.country}
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  style: {
                    maxHeight: 220, // Dropdown height fix taaki scroll properly chale
                  },
                },
              },
            }}
          >
            {countries && countries.map((c, index) => {
              const countryName = typeof c === 'string' ? c : (c.name || c.country || c.title);
              return (
                <MenuItem key={c.id || index} value={countryName}>
                  {countryName}
                </MenuItem>
              );
            })}
          </TextField>

          <TextField fullWidth margin="dense" name="state" label="State" value={formik.values.state} onChange={formik.handleChange} error={formik.touched.state && Boolean(formik.errors.state)} helperText={formik.touched.state && formik.errors.state} />
          <TextField fullWidth margin="dense" name="district" label="District" value={formik.values.district} onChange={formik.handleChange} error={formik.touched.district && Boolean(formik.errors.district)} helperText={formik.touched.district && formik.errors.district} />
          <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
            <Button onClick={handleClose} variant="outlined">Cancel</Button>
            <Button type="submit" variant="contained">Save</Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}