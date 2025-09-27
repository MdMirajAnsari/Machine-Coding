import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Todo } from './todos.model';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private mockTodos: Todo[] = [
    {
      id: '1',
      title: 'Complete NgRx setup',
      description: 'Set up NgRx store with actions, reducers, selectors, and effects',
      completed: false,
      priority: 'high',
      dueDate: new Date(Date.now() + 86400000), // Tomorrow
      tags: ['development', 'angular', 'ngrx'],
      createdAt: new Date('2023-12-01'),
      updatedAt: new Date('2023-12-01'),
    },
    {
      id: '2',
      title: 'Write unit tests',
      description: 'Add comprehensive unit tests for store functionality',
      completed: false,
      priority: 'medium',
      tags: ['testing', 'development'],
      createdAt: new Date('2023-12-02'),
      updatedAt: new Date('2023-12-02'),
    },
    {
      id: '3',
      title: 'Review code',
      completed: true,
      priority: 'low',
      tags: ['review'],
      createdAt: new Date('2023-12-01'),
      updatedAt: new Date('2023-12-03'),
    },
  ];

  getAllTodos(): Observable<Todo[]> {
    // Simulate API call with delay
    return of([...this.mockTodos]).pipe(delay(1000));
  }

  getTodoById(id: string): Observable<Todo | undefined> {
    const todo = this.mockTodos.find((t) => t.id === id);
    return of(todo).pipe(delay(500));
  }

  createTodo(todoData: Omit<Todo, 'id'>): Observable<Todo> {
    const newTodo: Todo = {
      ...todoData,
      id: (this.mockTodos.length + 1).toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.mockTodos.push(newTodo);
    return of(newTodo).pipe(delay(800));
  }

  updateTodo(todo: Todo): Observable<Todo> {
    const index = this.mockTodos.findIndex((t) => t.id === todo.id);
    if (index === -1) {
      return throwError(() => new Error('Todo not found'));
    }
    const updatedTodo = { ...todo, updatedAt: new Date() };
    this.mockTodos[index] = updatedTodo;
    return of(updatedTodo).pipe(delay(800));
  }

  toggleTodoCompletion(id: string): Observable<Todo> {
    const index = this.mockTodos.findIndex((t) => t.id === id);
    if (index === -1) {
      return throwError(() => new Error('Todo not found'));
    }
    const updatedTodo = {
      ...this.mockTodos[index],
      completed: !this.mockTodos[index].completed,
      updatedAt: new Date(),
    };
    this.mockTodos[index] = updatedTodo;
    return of(updatedTodo).pipe(delay(600));
  }

  deleteTodo(id: string): Observable<void> {
    const index = this.mockTodos.findIndex((t) => t.id === id);
    if (index === -1) {
      return throwError(() => new Error('Todo not found'));
    }
    this.mockTodos.splice(index, 1);
    return of(undefined).pipe(delay(800));
  }
}
