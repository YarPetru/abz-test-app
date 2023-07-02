import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUsers, addUser } from './users-thunks';
import { IUser, IUsersRespond } from 'types';

interface UsersState {
  data: IUsersRespond | null;
  isLoading: boolean;
  fetchingError: string | null;
  registerError: string | null;
  currentUsers: IUser[];
  isSuccessAdding: boolean;
}
const initialState: UsersState = {
  data: null,
  isLoading: false,
  fetchingError: null,
  registerError: null,
  currentUsers: [],
  isSuccessAdding: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentUsers: (state, action: PayloadAction<IUser[]>) => {
      state.currentUsers = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = true;
      state.fetchingError = action.payload
        ? String(action.payload)
        : 'Unknown error';
    });

    builder.addCase(addUser.pending, (state, _) => {
      state.isLoading = true;
      state.isSuccessAdding = false;
    });
    builder.addCase(
      addUser.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.isLoading = false;
        state.data!.users = [
          action.payload,
          ...(state.data?.users?.slice(0, -1) || []),
        ];
        state.currentUsers = [
          action.payload,
          ...state.currentUsers.slice(0, -1),
        ];
        state.isSuccessAdding = true;
      }
    );
    builder.addCase(addUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccessAdding = false;
      state.registerError = action.payload
        ? String(action.payload)
        : 'Unknown error';
    });
  },
});

export const { setCurrentUsers } = usersSlice.actions;

export default usersSlice.reducer;
