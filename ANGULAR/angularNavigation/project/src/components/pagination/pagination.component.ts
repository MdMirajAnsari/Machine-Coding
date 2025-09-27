import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import tslib from 'tslib';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="pagination-nav" aria-label="Pagination Navigation">
      <div class="pagination-info">
        <span>Showing {{ startItem }}-{{ endItem }} of {{ totalItems }} posts</span>
      </div>
      
      <div class="pagination-controls">
        <button
          class="pagination-btn prev-btn"
          [disabled]="currentPage === 1"
          (click)="goToPage(currentPage - 1)"
          [attr.aria-label]="'Go to previous page'"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 18l-6-6 6-6"></path>
          </svg>
          Previous
        </button>
        
        <div class="page-numbers">
          <button
            *ngFor="let page of visiblePages"
            class="pagination-btn page-btn"
            [class.active]="page === currentPage"
            [class.ellipsis]="page === -1"
            [disabled]="page === -1"
            (click)="page !== -1 && goToPage(page)"
            [attr.aria-label]="page === -1 ? null : 'Go to page ' + page"
          >
            {{ page === -1 ? '...' : page }}
          </button>
        </div>
        
        <button
          class="pagination-btn next-btn"
          [disabled]="currentPage === totalPages"
          (click)="goToPage(currentPage + 1)"
          [attr.aria-label]="'Go to next page'"
        >
          Next
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18l6-6-6-6"></path>
          </svg>
        </button>
      </div>
    </nav>
  `,
  styles: [`
    .pagination-nav {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
      margin: 2rem 0;
      padding: 1.5rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    
    .pagination-info {
      color: #6B7280;
      font-size: 0.875rem;
      font-weight: 500;
    }
    
    .pagination-controls {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .page-numbers {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
    
    .pagination-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 0.75rem;
      font-size: 0.875rem;
      font-weight: 500;
      border: 1px solid #D1D5DB;
      background: white;
      color: #374151;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
      min-width: 40px;
      height: 40px;
      justify-content: center;
    }
    
    .pagination-btn:hover:not(:disabled) {
      background: #F3F4F6;
      border-color: #9CA3AF;
      transform: translateY(-1px);
    }
    
    .pagination-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }
    
    .pagination-btn.active {
      background: #3B82F6;
      color: white;
      border-color: #3B82F6;
      box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3);
    }
    
    .pagination-btn.ellipsis {
      border: none;
      background: transparent;
      cursor: default;
    }
    
    .prev-btn, .next-btn {
      padding: 0.5rem 1rem;
      font-weight: 600;
    }
    
    .prev-btn:hover:not(:disabled),
    .next-btn:hover:not(:disabled) {
      background: #3B82F6;
      color: white;
      border-color: #3B82F6;
    }
    
    @media (max-width: 640px) {
      .pagination-nav {
        padding: 1rem;
      }
      
      .pagination-controls {
        flex-wrap: wrap;
        justify-content: center;
      }
      
      .pagination-btn {
        padding: 0.5rem;
        min-width: 36px;
        height: 36px;
      }
      
      .prev-btn, .next-btn {
        flex: 1;
        max-width: 120px;
      }
    }
  `]
})
export class PaginationComponent implements OnChanges {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 10;
  
  @Output() pageChange = new EventEmitter<number>();
  
  visiblePages: number[] = [];
  startItem: number = 0;
  endItem: number = 0;
  
  ngOnChanges(changes: SimpleChanges): void {
    this.updatePagination();
  }
  
  private updatePagination(): void {
    this.visiblePages = this.calculateVisiblePages();
    this.startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
    this.endItem = Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
  }
  
  private calculateVisiblePages(): number[] {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    
    for (let i = Math.max(2, this.currentPage - delta); 
         i <= Math.min(this.totalPages - 1, this.currentPage + delta); 
         i++) {
      range.push(i);
    }
    
    if (this.currentPage - delta > 2) {
      rangeWithDots.push(1, -1);
    } else {
      rangeWithDots.push(1);
    }
    
    rangeWithDots.push(...range);
    
    if (this.currentPage + delta < this.totalPages - 1) {
      rangeWithDots.push(-1, this.totalPages);
    } else if (this.totalPages > 1) {
      rangeWithDots.push(this.totalPages);
    }
    
    return rangeWithDots;
  }
  
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }
}