import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchEmployees, fetchEmployeeById, createEmployee, updateEmployee, deleteEmployee, fetchCountries } from '../services/api';

export const getEmployees = createAsyncThunk('employees/getEmployees', async () => {
  const res = await fetchEmployees();
  return res.data;
});

export const getEmployeeById = createAsyncThunk('employees/getEmployeeById', async (id) => {
  const res = await fetchEmployeeById(id);
  return res.data;
});

export const addEmployee = createAsyncThunk('employees/addEmployee', async (data) => {
  const res = await createEmployee(data);
  return res.data;
});

export const editEmployee = createAsyncThunk('employees/editEmployee', async ({ id, data }) => {
  const res = await updateEmployee(id, data);
  return res.data;
});

export const removeEmployee = createAsyncThunk('employees/removeEmployee', async (id) => {
  await deleteEmployee(id);
  return id;
});

export const getCountries = createAsyncThunk('countries/getCountries', async () => {
  const res = await fetchCountries();
  return res.data;
});

const employeeSlice = createSlice({
  name: 'employee',
  initialState: { employees: [], countries: [], searchedEmployee: null, loading: false, error: null },
  reducers: {
    clearSearch: (state) => { state.searchedEmployee = null; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmployees.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(getEmployees.fulfilled, (state, action) => { state.loading = false; state.employees = action.payload; })
      .addCase(getEmployees.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
      .addCase(getEmployeeById.fulfilled, (state, action) => { state.searchedEmployee = action.payload; })
      .addCase(getEmployeeById.rejected, (state) => { state.searchedEmployee = null; })
      .addCase(addEmployee.fulfilled, (state, action) => { state.employees.unshift(action.payload); })
      .addCase(editEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex(e => e.id === action.payload.id);
        if (index !== -1) state.employees[index] = action.payload;
      })
      .addCase(removeEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(e => e.id !== action.payload);
      })
      .addCase(getCountries.fulfilled, (state, action) => { state.countries = action.payload; });
  }
});

export const { clearSearch } = employeeSlice.actions;
export default employeeSlice.reducer;