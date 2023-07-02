import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../constants';

axios.defaults.baseURL = String(BASE_URL);

export const fetchToken = createAsyncThunk('token/fetch', async () => {
  const res = await axios.get('/token');
  return res.data;
});
