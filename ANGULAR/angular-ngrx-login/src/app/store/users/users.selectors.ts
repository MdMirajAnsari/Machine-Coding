import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users.reducer';

export const selectUsersState = createFeatureSelector<UsersState>('users');

// Basic selectors
export const selectAllUsers = createSelector(selectUsersState, (state) => state.users);

export const selectSelectedUser = createSelector(selectUsersState, (state) => state.selectedUser);

export const selectUsersLoading = createSelector(selectUsersState, (state) => state.loading);

export const selectUsersError = createSelector(selectUsersState, (state) => state.error);

// Derived selectors
export const selectUsersCount = createSelector(selectAllUsers, (users) => users.length);

export const selectActiveUsers = createSelector(selectAllUsers, (users) =>
  users.filter((user) => user.isActive)
);

export const selectInactiveUsers = createSelector(selectAllUsers, (users) =>
  users.filter((user) => !user.isActive)
);

export const selectAdminUsers = createSelector(selectAllUsers, (users) =>
  users.filter((user) => user.role === 'admin')
);

export const selectRegularUsers = createSelector(selectAllUsers, (users) =>
  users.filter((user) => user.role === 'user')
);

export const selectUserById = (id: string) =>
  createSelector(selectAllUsers, (users) => users.find((user) => user.id === id));

export const selectUsersByRole = (role: 'admin' | 'user') =>
  createSelector(selectAllUsers, (users) => users.filter((user) => user.role === role));

// UI selectors
export const selectUsersLoadingState = createSelector(
  selectUsersLoading,
  selectUsersError,
  (loading, error) => ({
    loading,
    error,
    hasError: !!error,
  })
);
