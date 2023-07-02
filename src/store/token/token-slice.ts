import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchToken } from './token-thunks';
import { ITokenRespond } from 'types';

interface TokenState {
  data: string | null;
  isLoading: boolean;
  error: string | null;
}
const initialState: TokenState = {
  data: null,
  isLoading: false,
  error: null,
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchToken.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchToken.fulfilled,
      (state, action: PayloadAction<ITokenRespond>) => {
        state.isLoading = false;
        state.data = action.payload.token!;
      }
    );
    builder.addCase(fetchToken.rejected, (state, action) => {
      state.isLoading = true;
      state.error = action.payload ? String(action.payload) : 'Unknown error';
    });
  },
});

export default tokenSlice.reducer;
