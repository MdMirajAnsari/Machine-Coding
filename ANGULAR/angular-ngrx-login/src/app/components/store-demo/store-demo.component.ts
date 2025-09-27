import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../../store';
import { User } from '../../store/users/users.model';
import { Todo } from '../../store/todos/todos.model';
import * as UsersActions from '../../store/users/users.actions';
import * as TodosActions from '../../store/todos/todos.actions';
import {
  selectAllUsers,
  selectUsersLoadingState,
  selectUsersCount,
  selectActiveUsers,
} from '../../store/users/users.selectors';
import {
  selectAllTodos,
  selectTodosLoadingState,
  selectTodosStats,
  selectFilteredTodos,
} from '../../store/todos/todos.selectors';

@Component({
  selector: 'app-store-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="store-demo">
      <h1>NgRx Store Demo</h1>
      
      <!-- Users Section -->
      <section class="users-section">
        <h2>Users Management</h2>
        <div class="actions">
          <button (click)="loadUsers()">Load Users</button>
          <button (click)="addSampleUser()">Add Sample User</button>
        </div>
        
        <div *ngIf="usersLoadingState$ | async as loadingState">
          <p *ngIf="loadingState.loading">Loading users...</p>
          <p *ngIf="loadingState.hasError" class="error">{{ loadingState.error }}</p>
        </div>
        
        <div class="stats">
          <p>Total Users: {{ usersCount$ | async }}</p>
          <p>Active Users: {{ activeUsers$ | async | json }}</p>
        </div>
        
        <div class="user-list">
          <div *ngFor="let user of allUsers$ | async" class="user-card">
            <h4>{{ user.name }}</h4>
            <p>{{ user.email }} - {{ user.role }}</p>
            <p>Status: {{ user.isActive ? 'Active' : 'Inactive' }}</p>
            <button (click)="deleteUser(user.id)">Delete</button>
          </div>
        </div>
      </section>

      <!-- Todos Section -->
      <section class="todos-section">
        <h2>Todos Management</h2>
        <div class="actions">
          <button (click)="loadTodos()">Load Todos</button>
          <button (click)="addSampleTodo()">Add Sample Todo</button>
        </div>
        
        <div class="filters">
          <button (click)="setFilter('all')">All</button>
          <button (click)="setFilter('completed')">Completed</button>
          <button (click)="setFilter('pending')">Pending</button>
          <button (click)="setFilter('high-priority')">High Priority</button>
        </div>
        
        <div *ngIf="todosLoadingState$ | async as loadingState">
          <p *ngIf="loadingState.loading">Loading todos...</p>
          <p *ngIf="loadingState.hasError" class="error">{{ loadingState.error }}</p>
        </div>
        
        <div class="stats">
          <div *ngIf="todosStats$ | async as stats">
            <p>Total: {{ stats.total }}</p>
            <p>Completed: {{ stats.completed }}</p>
            <p>Pending: {{ stats.pending }}</p>
            <p>Completion Rate: {{ stats.completionRate | number:'1.0-1' }}%</p>
          </div>
        </div>
        
        <div class="todo-list">
          <div *ngFor="let todo of filteredTodos$ | async" class="todo-card">
            <h4>{{ todo.title }}</h4>
            <p *ngIf="todo.description">{{ todo.description }}</p>
            <p>Priority: {{ todo.priority }}</p>
            <p>Tags: {{ todo.tags.join(', ') }}</p>
            <div class="todo-actions">
              <button (click)="toggleTodo(todo.id)">
                {{ todo.completed ? 'Mark Pending' : 'Complete' }}
              </button>
              <button (click)="deleteTodo(todo.id)">Delete</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .store-demo {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    
    section {
      margin-bottom: 40px;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
    }
    
    .actions, .filters {
      margin-bottom: 20px;
    }
    
    button {
      margin-right: 10px;
      padding: 8px 16px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    button:hover {
      background-color: #0056b3;
    }
    
    .stats {
      background-color: #f8f9fa;
      padding: 15px;
      border-radius: 4px;
      margin-bottom: 20px;
    }
    
    .user-card, .todo-card {
      border: 1px solid #eee;
      padding: 15px;
      margin-bottom: 10px;
      border-radius: 4px;
      background-color: #fff;
    }
    
    .todo-actions {
      margin-top: 10px;
    }
    
    .error {
      color: #dc3545;
      font-weight: bold;
    }
    
    h1 {
      text-align: center;
      color: #333;
    }
    
    h2 {
      color: #007bff;
      border-bottom: 2px solid #007bff;
      padding-bottom: 5px;
    }
  `]
})
export class StoreDemoComponent implements OnInit {
  // Users observables
  allUsers$: Observable<User[]>;
  usersLoadingState$: Observable<any>;
  usersCount$: Observable<number>;
  activeUsers$: Observable<User[]>;
  
  // Todos observables
  allTodos$: Observable<Todo[]>;
  filteredTodos$: Observable<Todo[]>;
  todosLoadingState$: Observable<any>;
  todosStats$: Observable<any>;

  constructor(private store: Store<AppState>) {
    // Initialize selectors
    this.allUsers$ = this.store.select(selectAllUsers);
    this.usersLoadingState$ = this.store.select(selectUsersLoadingState);
    this.usersCount$ = this.store.select(selectUsersCount);
    this.activeUsers$ = this.store.select(selectActiveUsers);
    
    this.allTodos$ = this.store.select(selectAllTodos);
    this.filteredTodos$ = this.store.select(selectFilteredTodos);
    this.todosLoadingState$ = this.store.select(selectTodosLoadingState);
    this.todosStats$ = this.store.select(selectTodosStats);
  }

  ngOnInit(): void {
    // Load initial data
    this.loadUsers();
    this.loadTodos();
  }

  // User actions
  loadUsers(): void {
    this.store.dispatch(UsersActions.loadUsers());
  }

  addSampleUser(): void {
    const sampleUser = {
      name: `User ${Date.now()}`,
      email: `user${Date.now()}@example.com`,
      role: 'user' as const,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.store.dispatch(UsersActions.addUser({ user: sampleUser }));
  }

  deleteUser(id: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.store.dispatch(UsersActions.deleteUser({ id }));
    }
  }

  // Todo actions
  loadTodos(): void {
    this.store.dispatch(TodosActions.loadTodos());
  }

  addSampleTodo(): void {
    const sampleTodo = {
      title: `Task ${Date.now()}`,
      description: 'Sample task created from demo',
      completed: false,
      priority: 'medium' as const,
      tags: ['demo', 'sample'],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.store.dispatch(TodosActions.addTodo({ todo: sampleTodo }));
  }

  toggleTodo(id: string): void {
    this.store.dispatch(TodosActions.toggleTodoCompletion({ id }));
  }

  deleteTodo(id: string): void {
    if (confirm('Are you sure you want to delete this todo?')) {
      this.store.dispatch(TodosActions.deleteTodo({ id }));
    }
  }

  setFilter(filter: 'all' | 'completed' | 'pending' | 'high-priority'): void {
    this.store.dispatch(TodosActions.setTodoFilter({ filter }));
  }
}
