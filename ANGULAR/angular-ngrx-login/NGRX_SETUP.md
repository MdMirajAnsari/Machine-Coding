# NgRx Store Setup Guide

This project demonstrates a comprehensive NgRx setup for data storage and state management in Angular applications.

## 🏗️ Project Structure

```
src/app/store/
├── index.ts                     # Barrel exports
├── app.state.ts                 # Root application state
├── shared/
│   └── store.utils.ts          # Shared utilities
├── users/                       # Users feature
│   ├── users.model.ts          # User interface/types
│   ├── users.actions.ts        # User actions
│   ├── users.reducer.ts        # User reducer
│   ├── users.selectors.ts      # User selectors
│   ├── users.effects.ts        # User effects
│   └── users.service.ts        # User API service
└── todos/                       # Todos feature
    ├── todos.model.ts          # Todo interface/types
    ├── todos.actions.ts        # Todo actions
    ├── todos.reducer.ts        # Todo reducer
    ├── todos.selectors.ts      # Todo selectors
    ├── todos.effects.ts        # Todo effects
    └── todos.service.ts        # Todo API service
```

## 🚀 Getting Started

### 1. Install Dependencies

The project already includes the necessary NgRx packages:
- `@ngrx/store` - Core store functionality
- `@ngrx/effects` - Side effects management
- `@ngrx/store-devtools` - Redux DevTools integration

### 2. Run the Application

```bash
npm start
# or
ng serve
```

Visit `http://localhost:4200` to see the NgRx demo in action.

## 📚 Key Concepts

### Actions
Actions represent events that can change the application state:

```typescript
// Load users
this.store.dispatch(UsersActions.loadUsers());

// Add a new user
this.store.dispatch(UsersActions.addUser({ user: newUser }));

// Update existing user
this.store.dispatch(UsersActions.updateUser({ user: updatedUser }));
```

### Selectors
Selectors are pure functions that extract specific pieces of state:

```typescript
// Select all users
allUsers$ = this.store.select(selectAllUsers);

// Select loading state
loadingState$ = this.store.select(selectUsersLoadingState);

// Select users count
usersCount$ = this.store.select(selectUsersCount);
```

### Effects
Effects handle side effects like API calls:

```typescript
loadUsers$ = createEffect(() =>
  this.actions$.pipe(
    ofType(UsersActions.loadUsers),
    switchMap(() =>
      this.usersService.getAllUsers().pipe(
        map((users) => UsersActions.loadUsersSuccess({ users })),
        catchError((error) => of(UsersActions.loadUsersFailure({ error: error.message })))
      )
    )
  )
);
```

## 🎯 Features Implemented

### Users Feature
- ✅ Load users from API
- ✅ Add new users
- ✅ Update existing users
- ✅ Delete users
- ✅ Select specific users
- ✅ Filter by role (admin/user)
- ✅ Filter by status (active/inactive)
- ✅ Loading states and error handling

### Todos Feature
- ✅ Load todos from API
- ✅ Add new todos
- ✅ Update existing todos
- ✅ Toggle completion status
- ✅ Delete todos
- ✅ Filter todos (all/completed/pending/high-priority)
- ✅ Statistics (completion rate, counts)
- ✅ Tag management
- ✅ Priority levels
- ✅ Loading states and error handling

## 🛠️ How to Use in Components

### 1. Inject the Store

```typescript
import { Store } from '@ngrx/store';
import { AppState } from '../store';

export class MyComponent {
  constructor(private store: Store<AppState>) {}
}
```

### 2. Select Data from Store

```typescript
users$ = this.store.select(selectAllUsers);
loadingState$ = this.store.select(selectUsersLoadingState);
```

### 3. Dispatch Actions

```typescript
loadUsers(): void {
  this.store.dispatch(UsersActions.loadUsers());
}

addUser(user: Omit<User, 'id'>): void {
  this.store.dispatch(UsersActions.addUser({ user }));
}
```

### 4. Use in Templates

```html
<div *ngIf="loadingState$ | async as loading">
  <p *ngIf="loading.loading">Loading...</p>
  <p *ngIf="loading.hasError">{{ loading.error }}</p>
</div>

<div *ngFor="let user of users$ | async">
  {{ user.name }}
</div>
```

## 🎨 Advanced Patterns

### Custom Selectors
Create parameterized selectors for dynamic filtering:

```typescript
export const selectUserById = (id: string) =>
  createSelector(selectAllUsers, (users) => 
    users.find((user) => user.id === id)
  );

// Usage
specificUser$ = this.store.select(selectUserById('123'));
```

### Combined Selectors
Combine multiple selectors for computed data:

```typescript
export const selectTodosStats = createSelector(
  selectAllTodos,
  selectCompletedTodos,
  selectPendingTodos,
  (allTodos, completedTodos, pendingTodos) => ({
    total: allTodos.length,
    completed: completedTodos.length,
    pending: pendingTodos.length,
    completionRate: allTodos.length > 0 ? 
      (completedTodos.length / allTodos.length) * 100 : 0,
  })
);
```

## 🔧 Adding New Features

To add a new feature (e.g., "products"):

1. **Create the feature folder**: `src/app/store/products/`
2. **Define the model**: Create `products.model.ts`
3. **Create actions**: Define all CRUD actions in `products.actions.ts`
4. **Build the reducer**: Handle state changes in `products.reducer.ts`
5. **Write selectors**: Create data access functions in `products.selectors.ts`
6. **Add effects**: Handle API calls in `products.effects.ts`
7. **Create service**: Implement API calls in `products.service.ts`
8. **Update app state**: Add to `app.state.ts`
9. **Configure store**: Add reducer and effects to `app.config.ts`
10. **Export**: Add exports to `store/index.ts`

## 📊 DevTools

The project includes Redux DevTools integration. Install the browser extension and use it to:
- Inspect store state
- Time-travel debug
- Monitor action dispatches
- Analyze performance

## 🧪 Testing Patterns

### Testing Reducers
```typescript
it('should load users successfully', () => {
  const users = [{ id: '1', name: 'John' }];
  const action = UsersActions.loadUsersSuccess({ users });
  const result = usersReducer(initialState, action);
  
  expect(result.users).toEqual(users);
  expect(result.loading).toBe(false);
});
```

### Testing Selectors
```typescript
it('should select all users', () => {
  const users = [{ id: '1', name: 'John' }];
  const result = selectAllUsers.projector({ users, loading: false });
  
  expect(result).toEqual(users);
});
```

### Testing Effects
```typescript
it('should load users', () => {
  const action = UsersActions.loadUsers();
  const outcome = UsersActions.loadUsersSuccess({ users: [] });
  
  actions$ = hot('-a', { a: action });
  const expected = cold('-b', { b: outcome });
  
  expect(effects.loadUsers$).toBeObservable(expected);
});
```

## 🎉 Benefits of This Setup

1. **Predictable State**: Single source of truth
2. **Immutable**: State changes are pure functions
3. **Testable**: Easy to unit test all parts
4. **Debuggable**: Time-travel debugging with DevTools
5. **Scalable**: Feature-based organization
6. **Type-safe**: Full TypeScript support
7. **Performance**: Optimized with memoized selectors
8. **Side Effects**: Clean handling of async operations

## 📝 Next Steps

1. **Implement real API endpoints** - Replace mock services with real HTTP calls
2. **Add authentication** - Implement auth guards and user session management  
3. **Add caching** - Implement data caching strategies
4. **Add offline support** - Handle offline scenarios
5. **Performance optimization** - Use OnPush change detection
6. **Add more features** - Implement additional business features

Happy coding with NgRx! 🚀
