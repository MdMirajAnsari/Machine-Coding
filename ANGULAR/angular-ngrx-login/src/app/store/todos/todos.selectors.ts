import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodosState } from './todos.reducer';
import { TodoFilter } from './todos.actions';

export const selectTodosState = createFeatureSelector<TodosState>('todos');

// Basic selectors
export const selectAllTodos = createSelector(selectTodosState, (state) => state.todos);

export const selectTodosFilter = createSelector(selectTodosState, (state) => state.filter);

export const selectTodosLoading = createSelector(selectTodosState, (state) => state.loading);

export const selectTodosError = createSelector(selectTodosState, (state) => state.error);

// Derived selectors
export const selectTodosCount = createSelector(selectAllTodos, (todos) => todos.length);

export const selectCompletedTodos = createSelector(selectAllTodos, (todos) =>
  todos.filter((todo) => todo.completed)
);

export const selectPendingTodos = createSelector(selectAllTodos, (todos) =>
  todos.filter((todo) => !todo.completed)
);

export const selectHighPriorityTodos = createSelector(selectAllTodos, (todos) =>
  todos.filter((todo) => todo.priority === 'high')
);

export const selectTodosByPriority = (priority: 'low' | 'medium' | 'high') =>
  createSelector(selectAllTodos, (todos) => todos.filter((todo) => todo.priority === priority));

export const selectTodoById = (id: string) =>
  createSelector(selectAllTodos, (todos) => todos.find((todo) => todo.id === id));

// Filtered todos based on current filter
export const selectFilteredTodos = createSelector(
  selectAllTodos,
  selectTodosFilter,
  (todos, filter) => {
    switch (filter) {
      case 'completed':
        return todos.filter((todo) => todo.completed);
      case 'pending':
        return todos.filter((todo) => !todo.completed);
      case 'high-priority':
        return todos.filter((todo) => todo.priority === 'high');
      case 'all':
      default:
        return todos;
    }
  }
);

// Statistics selectors
export const selectTodosStats = createSelector(
  selectAllTodos,
  selectCompletedTodos,
  selectPendingTodos,
  selectHighPriorityTodos,
  (allTodos, completedTodos, pendingTodos, highPriorityTodos) => ({
    total: allTodos.length,
    completed: completedTodos.length,
    pending: pendingTodos.length,
    highPriority: highPriorityTodos.length,
    completionRate: allTodos.length > 0 ? (completedTodos.length / allTodos.length) * 100 : 0,
  })
);

// UI selectors
export const selectTodosLoadingState = createSelector(
  selectTodosLoading,
  selectTodosError,
  (loading, error) => ({
    loading,
    error,
    hasError: !!error,
  })
);

// Tags selectors
export const selectAllTodoTags = createSelector(selectAllTodos, (todos) => {
  const tags = todos.flatMap((todo) => todo.tags);
  return [...new Set(tags)].sort();
});

export const selectTodosByTag = (tag: string) =>
  createSelector(selectAllTodos, (todos) => todos.filter((todo) => todo.tags.includes(tag)));
