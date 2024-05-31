import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NewsService } from '../../services/news.service'; 
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class NewsComponent implements OnInit {
  news: any | null = null;
  slideIndex = 1;


  constructor(private newsService: NewsService, private toastr: ToastrService, private router: Router, private authService: AuthService) {
  }
  
  ngOnInit(): void {
    this.getNews();
    
  }


  getNews(): void {
    this.newsService.getNews() 
      .subscribe(news => {
        this.news = news;
        console.log("news", news)
      }); 
  }
  
  editNews(id: string): void {
    this.router.navigate(['/news/edit', id]);
  }

  deleteNews(id: string): void {
    this.newsService.deleteNews(id)
      .subscribe(() => {
        this.toastr.success('News removed successfully');  
        this.getNews();
      });
  }
}
