import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil, finalize } from 'rxjs';
import { PostsService } from '../../services/posts.service';
import { PaginationComponent } from '../pagination/pagination.component';
import { Post, User, PaginationInfo } from '../../models/post.interface';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  template: `
    <div class="posts-container">
      <div class="container">
        <!-- Loading State -->
        <div *ngIf="isLoading" class="loading-state">
          <div class="loading-spinner"></div>
          <p>Loading posts...</p>
        </div>
        
        <!-- Error State -->
        <div *ngIf="error && !isLoading" class="error-state">
          <div class="error-icon">⚠️</div>
          <h3>Oops! Something went wrong</h3>
          <p>{{ error }}</p>
          <button class="retry-btn" (click)="loadPosts()">Try Again</button>
        </div>
        
        <!-- Posts Grid -->
        <div *ngIf="!isLoading && !error" class="posts-content">
          <div class="posts-header">
            <h2>Latest Posts</h2>
            <p class="posts-description">
              Explore our collection of engaging posts from the community
            </p>
          </div>
          
          <div class="posts-grid">
            <article 
              *ngFor="let post of posts; trackBy: trackByPostId"
              class="post-card"
            >
              <div class="post-header">
                <div class="post-meta">
                  <div class="author-info">
                    <div class="author-avatar">
                      {{ getUserInitials(post.userId) }}
                    </div>
                    <div class="author-details">
                      <span class="author-name">{{ getUserName(post.userId) }}</span>
                      <span class="post-id">Post #{{ post.id }}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="post-content">
                <h3 class="post-title">{{ post.title | titlecase }}</h3>
                <p class="post-excerpt">{{ post.body }}</p>
              </div>
              
              <div class="post-footer">
                <button class="read-more-btn">
                  Read More
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17"></path>
                  </svg>
                </button>
              </div>
            </article>
          </div>
          
          <!-- Pagination -->
          <app-pagination
            [currentPage]="pagination.currentPage"
            [totalPages]="pagination.totalPages"
            [totalItems]="pagination.totalItems"
            [itemsPerPage]="pagination.itemsPerPage"
            (pageChange)="onPageChange($event)"
          ></app-pagination>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .posts-container {
      min-height: 100vh;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }
    
    .loading-state,
    .error-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 400px;
      text-align: center;
      background: white;
      border-radius: 16px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      margin: 2rem 0;
      padding: 3rem;
    }
    
    .loading-spinner {
      width: 48px;
      height: 48px;
      border: 4px solid #E5E7EB;
      border-left-color: #3B82F6;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 1rem;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    .error-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    
    .error-state h3 {
      color: #DC2626;
      margin: 0 0 0.5rem 0;
    }
    
    .error-state p {
      color: #6B7280;
      margin: 0 0 1.5rem 0;
    }
    
    .retry-btn {
      background: #3B82F6;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .retry-btn:hover {
      background: #2563EB;
      transform: translateY(-1px);
    }
    
    .posts-content {
      margin: 2rem 0;
    }
    
    .posts-header {
      text-align: center;
      margin-bottom: 3rem;
      background: white;
      padding: 2rem;
      border-radius: 16px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    
    .posts-header h2 {
      font-size: 2.25rem;
      font-weight: 700;
      color: #1F2937;
      margin: 0 0 0.5rem 0;
    }
    
    .posts-description {
      font-size: 1.125rem;
      color: #6B7280;
      margin: 0;
    }
    
    .posts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1.5rem;
      margin-bottom: 3rem;
    }
    
    .post-card {
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      transition: all 0.3s ease;
      border: 1px solid #E5E7EB;
    }
    
    .post-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    }
    
    .post-header {
      padding: 1.5rem 1.5rem 0 1.5rem;
    }
    
    .post-meta {
      margin-bottom: 1rem;
    }
    
    .author-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    
    .author-avatar {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 0.875rem;
    }
    
    .author-details {
      display: flex;
      flex-direction: column;
    }
    
    .author-name {
      font-weight: 600;
      color: #1F2937;
      font-size: 0.875rem;
    }
    
    .post-id {
      color: #6B7280;
      font-size: 0.75rem;
    }
    
    .post-content {
      padding: 0 1.5rem 1rem 1.5rem;
    }
    
    .post-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1F2937;
      margin: 0 0 0.75rem 0;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .post-excerpt {
      color: #6B7280;
      line-height: 1.6;
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .post-footer {
      padding: 0 1.5rem 1.5rem 1.5rem;
    }
    
    .read-more-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: #3B82F6;
      background: transparent;
      border: none;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      padding: 0.5rem 0;
    }
    
    .read-more-btn:hover {
      color: #2563EB;
      transform: translateX(4px);
    }
    
    @media (max-width: 768px) {
      .posts-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
      
      .posts-header h2 {
        font-size: 1.875rem;
      }
      
      .posts-header {
        padding: 1.5rem;
      }
    }
  `]
})
export class PostsComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  users: User[] = [];
  pagination: PaginationInfo = {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  };
  
  isLoading = false;
  error: string | null = null;
  
  private destroy$ = new Subject<void>();
  
  constructor(private postsService: PostsService) {}
  
  ngOnInit(): void {
    this.loadUsers();
    this.loadPosts();
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  loadPosts(page: number = 1): void {
    this.isLoading = true;
    this.error = null;
    
    this.postsService.getPosts(page, 10)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (response) => {
          this.posts = response.posts;
          this.pagination = response.pagination;
        },
        error: (error) => {
          this.error = 'Failed to load posts. Please try again later.';
          console.error('Error loading posts:', error);
        }
      });
  }
  
  private loadUsers(): void {
    this.postsService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (users) => {
          this.users = users;
        },
        error: (error) => {
          console.error('Error loading users:', error);
        }
      });
  }
  
  onPageChange(page: number): void {
    this.loadPosts(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  trackByPostId(index: number, post: Post): number {
    return post.id;
  }
  
  getUserName(userId: number): string {
    const user = this.users.find(u => u.id === userId);
    return user ? user.name : `User ${userId}`;
  }
  
  getUserInitials(userId: number): string {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      return user.name
        .split(' ')
        .map(name => name.charAt(0))
        .join('')
        .toUpperCase()
        .substring(0, 2);
    }
    return 'U' + userId;
  }
}