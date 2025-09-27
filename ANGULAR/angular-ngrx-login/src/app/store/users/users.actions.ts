import { createAction, props } from '@ngrx/store';
import { User } from './users.model';

// Load Users Actions
export const loadUsers = createAction('[Users] Load Users');

export const loadUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
  '[Users] Load Users Failure',
  props<{ error: string }>()
);

// Add User Actions
export const addUser = createAction(
  '[Users] Add User',
  props<{ user: Omit<User, 'id'> }>()
);

export const addUserSuccess = createAction(
  '[Users] Add User Success',
  props<{ user: User }>()
);

export const addUserFailure = createAction(
  '[Users] Add User Failure',
  props<{ error: string }>()
);

// Update User Actions
export const updateUser = createAction(
  '[Users] Update User',
  props<{ user: User }>()
);

export const updateUserSuccess = createAction(
  '[Users] Update User Success',
  props<{ user: User }>()
);

export const updateUserFailure = createAction(
  '[Users] Update User Failure',
  props<{ error: string }>()
);

// Delete User Actions
export const deleteUser = createAction(
  '[Users] Delete User',
  props<{ id: string }>()
);

export const deleteUserSuccess = createAction(
  '[Users] Delete User Success',
  props<{ id: string }>()
);

export const deleteUserFailure = createAction(
  '[Users] Delete User Failure',
  props<{ error: string }>()
);

// Select User Actions
export const selectUser = createAction(
  '[Users] Select User',
  props<{ id: string }>()
);

export const clearSelectedUser = createAction('[Users] Clear Selected User');
