import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { Post, User, PaginationInfo } from '../models/post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getPosts(page: number = 1, limit: number = 10): Observable<{ posts: Post[], pagination: PaginationInfo }> {
    const params = new HttpParams()
      .set('_page', page.toString())
      .set('_limit', limit.toString());

    return forkJoin({
      posts: this.http.get<Post[]>(`${this.apiUrl}/posts`, { params }),
      allPosts: this.http.get<Post[]>(`${this.apiUrl}/posts`)
    }).pipe(
      map(({ posts, allPosts }) => ({
        posts,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(allPosts.length / limit),
          totalItems: allPosts.length,
          itemsPerPage: limit
        }
      }))
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }
}