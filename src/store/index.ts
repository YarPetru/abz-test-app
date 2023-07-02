import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from '@reduxjs/toolkit';

import { positionsReducer } from './positions';
import { tokenReducer } from './token';
import { usersReducer } from './users';

const rootReducer = combineReducers({
  positions: positionsReducer,
  users: usersReducer,
  token: tokenReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
