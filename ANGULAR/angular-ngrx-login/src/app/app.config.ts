import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { usersReducer } from './store/users/users.reducer';
import { todosReducer } from './store/todos/todos.reducer';
import { UsersEffects } from './store/users/users.effects';
import { TodosEffects } from './store/todos/todos.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    // NgRx Store Configuration
    provideStore({
      users: usersReducer,
      todos: todosReducer,
    }),
    provideEffects([UsersEffects, TodosEffects]),
    // DevTools (only in development)
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false,
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ]
};
