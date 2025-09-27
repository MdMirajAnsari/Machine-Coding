import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <div class="app-container">
      <header class="app-header">
        <div class="container">
          <h1 class="app-title">Angular Pagination Demo</h1>
          <p class="app-subtitle">Consuming JSONPlaceholder API with elegant pagination</p>
        </div>
      </header>
      
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
      
      <footer class="app-footer">
        <div class="container">
          <p>&copy; 2025 Angular Pagination Demo. Built with Angular 20.</p>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    
    .app-header {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      padding: 2rem 0;
      color: white;
      text-align: center;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }
    
    .app-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin: 0 0 0.5rem 0;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
    
    .app-subtitle {
      font-size: 1.2rem;
      margin: 0;
      opacity: 0.9;
    }
    
    .main-content {
      flex: 1;
      padding: 3rem 0;
    }
    
    .app-footer {
      background: rgba(0, 0, 0, 0.1);
      color: white;
      text-align: center;
      padding: 1rem 0;
    }
    
    .app-footer p {
      margin: 0;
      opacity: 0.8;
    }
    
    @media (max-width: 768px) {
      .app-title {
        font-size: 2rem;
      }
      
      .app-subtitle {
        font-size: 1rem;
      }
      
      .main-content {
        padding: 2rem 0;
      }
    }
  `]
})
export class AppComponent {
  title = 'Angular Pagination Demo';
}