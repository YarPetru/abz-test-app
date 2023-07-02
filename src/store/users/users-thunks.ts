import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { nanoid } from '@reduxjs/toolkit';
import { INewUserData } from 'types';
import { BASE_URL } from '../../constants';

axios.defaults.baseURL = String(BASE_URL);

export const fetchUsers = createAsyncThunk(
  'users/fetch',
  async ({ page = 1, count = 6 }: { page: number; count: number }) => {
    const res = await axios.get(`users?page=${page}&count=${count}`);
    return res.data;
  }
);

export const addUser = createAsyncThunk(
  'users/add',
  async (
    { body, token }: { body: INewUserData; token: string },
    { rejectWithValue }
  ) => {
    try {
      const headers = {
        Token: token,
        'Content-Type': 'multipart/form-data',
      };
      const response = await axios.post('/users', body, { headers });
      toast.success(`New user ${body.name} has successfully added`, {
        toastId: nanoid(),
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.warn(
          `Something went wrong. Error: ${error.response?.data.message}`,
          {
            toastId: nanoid(),
          }
        );
      } else {
        toast.warn(`Something went wrong. Error: ${error}`, {
          toastId: nanoid(),
        });
      }
      return rejectWithValue(error);
    }
  }
);
