import { RootState } from 'store';

export const getFetchedUsers = (state: RootState) => state.users;

export const getCurrentUsers = (state: RootState) => state.users.currentUsers;

export const getSuccessAdding = (state: RootState) =>
  state.users.isSuccessAdding;
