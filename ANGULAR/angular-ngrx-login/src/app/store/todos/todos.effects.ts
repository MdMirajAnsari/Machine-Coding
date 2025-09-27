import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import * as TodosActions from './todos.actions';
import { TodosService } from './todos.service';

@Injectable()
export class TodosEffects {
  private actions$ = inject(Actions);
  private todosService = inject(TodosService);

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.loadTodos),
      switchMap(() =>
        this.todosService.getAllTodos().pipe(
          map((todos) => TodosActions.loadTodosSuccess({ todos })),
          catchError((error) => of(TodosActions.loadTodosFailure({ error: error.message })))
        )
      )
    )
  );

  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.addTodo),
      switchMap(({ todo }) =>
        this.todosService.createTodo(todo).pipe(
          map((createdTodo) => TodosActions.addTodoSuccess({ todo: createdTodo })),
          catchError((error) => of(TodosActions.addTodoFailure({ error: error.message })))
        )
      )
    )
  );

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.updateTodo),
      switchMap(({ todo }) =>
        this.todosService.updateTodo(todo).pipe(
          map((updatedTodo) => TodosActions.updateTodoSuccess({ todo: updatedTodo })),
          catchError((error) => of(TodosActions.updateTodoFailure({ error: error.message })))
        )
      )
    )
  );

  toggleTodoCompletion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.toggleTodoCompletion),
      switchMap(({ id }) =>
        this.todosService.toggleTodoCompletion(id).pipe(
          map((updatedTodo) => TodosActions.toggleTodoCompletionSuccess({ todo: updatedTodo })),
          catchError((error) =>
            of(TodosActions.toggleTodoCompletionFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.deleteTodo),
      switchMap(({ id }) =>
        this.todosService.deleteTodo(id).pipe(
          map(() => TodosActions.deleteTodoSuccess({ id })),
          catchError((error) => of(TodosActions.deleteTodoFailure({ error: error.message })))
        )
      )
    )
  );

  // Side effects (like showing notifications)
  addTodoSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TodosActions.addTodoSuccess),
        tap(() => console.log('Todo added successfully!'))
      ),
    { dispatch: false }
  );

  updateTodoSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TodosActions.updateTodoSuccess),
        tap(() => console.log('Todo updated successfully!'))
      ),
    { dispatch: false }
  );

  deleteTodoSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TodosActions.deleteTodoSuccess),
        tap(() => console.log('Todo deleted successfully!'))
      ),
    { dispatch: false }
  );

  toggleTodoCompletionSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TodosActions.toggleTodoCompletionSuccess),
        tap(({ todo }) =>
          console.log(`Todo ${todo.completed ? 'completed' : 'marked as pending'}!`)
        )
      ),
    { dispatch: false }
  );
}
