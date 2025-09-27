import { createSelector } from '@ngrx/store';

// Generic loading state interface
export interface LoadingState {
  loading: boolean;
  error: string | null;
}

// Generic entity state interface
export interface EntityState<T> {
  entities: T[];
  selectedEntity: T | null;
  loading: boolean;
  error: string | null;
}

// Helper function to create loading state selectors
export function createLoadingStateSelector<T>(
  featureSelector: any,
  loadingProp: keyof T,
  errorProp: keyof T
) {
  return createSelector(featureSelector, (state: T) => ({
    loading: state[loadingProp] as boolean,
    error: state[errorProp] as string | null,
    hasError: !!(state[errorProp] as string | null),
  }));
}

// Helper function to generate unique IDs
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Helper function to sort entities by date
export function sortByCreatedDate<T extends { createdAt: Date }>(entities: T[]): T[] {
  return [...entities].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export function sortByUpdatedDate<T extends { updatedAt: Date }>(entities: T[]): T[] {
  return [...entities].sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
}

// Generic error handling
export function handleError(error: any): string {
  if (error?.message) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unexpected error occurred';
}
