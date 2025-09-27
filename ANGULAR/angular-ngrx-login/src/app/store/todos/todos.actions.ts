import { createAction, props } from '@ngrx/store';
import { Todo } from './todos.model';

// Load Todos Actions
export const loadTodos = createAction('[Todos] Load Todos');

export const loadTodosSuccess = createAction(
  '[Todos] Load Todos Success',
  props<{ todos: Todo[] }>()
);

export const loadTodosFailure = createAction(
  '[Todos] Load Todos Failure',
  props<{ error: string }>()
);

// Add Todo Actions
export const addTodo = createAction(
  '[Todos] Add Todo',
  props<{ todo: Omit<Todo, 'id'> }>()
);

export const addTodoSuccess = createAction(
  '[Todos] Add Todo Success',
  props<{ todo: Todo }>()
);

export const addTodoFailure = createAction(
  '[Todos] Add Todo Failure',
  props<{ error: string }>()
);

// Update Todo Actions
export const updateTodo = createAction(
  '[Todos] Update Todo',
  props<{ todo: Todo }>()
);

export const updateTodoSuccess = createAction(
  '[Todos] Update Todo Success',
  props<{ todo: Todo }>()
);

export const updateTodoFailure = createAction(
  '[Todos] Update Todo Failure',
  props<{ error: string }>()
);

// Toggle Todo Completion
export const toggleTodoCompletion = createAction(
  '[Todos] Toggle Todo Completion',
  props<{ id: string }>()
);

export const toggleTodoCompletionSuccess = createAction(
  '[Todos] Toggle Todo Completion Success',
  props<{ todo: Todo }>()
);

export const toggleTodoCompletionFailure = createAction(
  '[Todos] Toggle Todo Completion Failure',
  props<{ error: string }>()
);

// Delete Todo Actions
export const deleteTodo = createAction(
  '[Todos] Delete Todo',
  props<{ id: string }>()
);

export const deleteTodoSuccess = createAction(
  '[Todos] Delete Todo Success',
  props<{ id: string }>()
);

export const deleteTodoFailure = createAction(
  '[Todos] Delete Todo Failure',
  props<{ error: string }>()
);

// Filter Actions
export const setTodoFilter = createAction(
  '[Todos] Set Filter',
  props<{ filter: TodoFilter }>()
);

export const clearTodoFilter = createAction('[Todos] Clear Filter');

export type TodoFilter = 'all' | 'completed' | 'pending' | 'high-priority';
