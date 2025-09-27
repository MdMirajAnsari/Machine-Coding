import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from './users.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private mockUsers: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin',
      isActive: true,
      createdAt: new Date('2023-01-15'),
      updatedAt: new Date('2023-01-15'),
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'user',
      isActive: true,
      createdAt: new Date('2023-02-20'),
      updatedAt: new Date('2023-02-20'),
    },
    {
      id: '3',
      name: 'Bob Wilson',
      email: 'bob@example.com',
      role: 'user',
      isActive: false,
      createdAt: new Date('2023-03-10'),
      updatedAt: new Date('2023-03-10'),
    },
  ];

  getAllUsers(): Observable<User[]> {
    // Simulate API call with delay
    return of([...this.mockUsers]).pipe(delay(1000));
  }

  getUserById(id: string): Observable<User | undefined> {
    const user = this.mockUsers.find((u) => u.id === id);
    return of(user).pipe(delay(500));
  }

  createUser(userData: Omit<User, 'id'>): Observable<User> {
    const newUser: User = {
      ...userData,
      id: (this.mockUsers.length + 1).toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.mockUsers.push(newUser);
    return of(newUser).pipe(delay(800));
  }

  updateUser(user: User): Observable<User> {
    const index = this.mockUsers.findIndex((u) => u.id === user.id);
    if (index === -1) {
      return throwError(() => new Error('User not found'));
    }
    const updatedUser = { ...user, updatedAt: new Date() };
    this.mockUsers[index] = updatedUser;
    return of(updatedUser).pipe(delay(800));
  }

  deleteUser(id: string): Observable<void> {
    const index = this.mockUsers.findIndex((u) => u.id === id);
    if (index === -1) {
      return throwError(() => new Error('User not found'));
    }
    this.mockUsers.splice(index, 1);
    return of(undefined).pipe(delay(800));
  }
}
