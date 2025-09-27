import { createReducer, on } from '@ngrx/store';
import { Todo } from './todos.model';
import * as TodosActions from './todos.actions';
import { TodoFilter } from './todos.actions';

export interface TodosState {
  todos: Todo[];
  filter: TodoFilter;
  loading: boolean;
  error: string | null;
}

export const initialState: TodosState = {
  todos: [],
  filter: 'all',
  loading: false,
  error: null,
};

export const todosReducer = createReducer(
  initialState,

  // Load Todos
  on(TodosActions.loadTodos, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(TodosActions.loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos,
    loading: false,
    error: null,
  })),

  on(TodosActions.loadTodosFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Add Todo
  on(TodosActions.addTodo, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(TodosActions.addTodoSuccess, (state, { todo }) => ({
    ...state,
    todos: [...state.todos, todo],
    loading: false,
    error: null,
  })),

  on(TodosActions.addTodoFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update Todo
  on(TodosActions.updateTodo, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(TodosActions.updateTodoSuccess, (state, { todo }) => ({
    ...state,
    todos: state.todos.map((t) => (t.id === todo.id ? todo : t)),
    loading: false,
    error: null,
  })),

  on(TodosActions.updateTodoFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Toggle Todo Completion
  on(TodosActions.toggleTodoCompletion, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(TodosActions.toggleTodoCompletionSuccess, (state, { todo }) => ({
    ...state,
    todos: state.todos.map((t) => (t.id === todo.id ? todo : t)),
    loading: false,
    error: null,
  })),

  on(TodosActions.toggleTodoCompletionFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete Todo
  on(TodosActions.deleteTodo, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(TodosActions.deleteTodoSuccess, (state, { id }) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== id),
    loading: false,
    error: null,
  })),

  on(TodosActions.deleteTodoFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Filter
  on(TodosActions.setTodoFilter, (state, { filter }) => ({
    ...state,
    filter,
  })),

  on(TodosActions.clearTodoFilter, (state) => ({
    ...state,
    filter: 'all',
  }))
);
