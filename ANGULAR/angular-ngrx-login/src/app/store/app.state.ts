import { UsersState } from './users/users.reducer';
import { TodosState } from './todos/todos.reducer';

export interface AppState {
  users: UsersState;
  todos: TodosState;
}
