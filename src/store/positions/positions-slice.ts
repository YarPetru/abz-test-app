import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPositions } from './positions-thunks';
import { IPositionsRespond, IPosition } from 'types';

interface PositionsState {
  data: IPosition[];
  isLoading: boolean;
  error: string | null;
}
const initialState: PositionsState = {
  data: [],
  isLoading: false,
  error: null,
};

const positionsSlice = createSlice({
  name: 'positions',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPositions.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchPositions.fulfilled,
      (state, action: PayloadAction<IPositionsRespond>) => {
        state.isLoading = false;
        state.data = action.payload.positions!;
      }
    );
    builder.addCase(fetchPositions.rejected, (state, action) => {
      state.isLoading = true;
      state.error = action.payload ? String(action.payload) : 'Unknown error';
    });
  },
});

export default positionsSlice.reducer;
