import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NewsService } from '../../services/news.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { PhotoUploadService } from '../../services/photo-upload.service';


@Component({
  selector: 'app-edit-news',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './edit-news.component.html',
  styleUrl: './edit-news.component.css'
})
export class EditNewsComponent implements OnInit {
  editedNews: any = {};
  newsId: string = '';
  selectedImages: File[] = [];

  constructor(private router: Router, private route: ActivatedRoute,  private toastr: ToastrService, private newsService: NewsService, private photoUploadService: PhotoUploadService) { }

  ngOnInit(): void {
    const newsIdParam = this.route.snapshot.paramMap.get('newsId'); 
    if (newsIdParam !== null) {
      this.newsId = newsIdParam;
      this.getNewsDetails();
    } else {
      console.error('News ID is missing from URL');
    }
  }
  

  getNewsDetails(): void {
    this.newsService.getNewsById(this.newsId)
      .subscribe(news => {
        this.editedNews = news;
        this.selectedImages = news.imageUrls;

      });
  }

  updateThisNews(): void {
    this.photoUploadService.uploadPhotos(this.selectedImages)
      .pipe(
        catchError((error) => {
          this.toastr.error(error.error.message, 'Error uploading images');
          console.error('Error uploading images:', error);
          throw error; 
        })
      )
      .subscribe((response) => {
        if(Object.keys(response.imagePaths).length > 0){
          console.log("images path", response.imagePaths)
          this.editedNews.imageUrls = response.imagePaths;
        }else{
          console.log("selected images")
          this.editedNews.imageUrls = this.selectedImages;
        }
        
        // Вызываем метод сервиса для редактирования проекта
        this.newsService.updateNews(this.newsId, this.editedNews)
      .subscribe({
        next: () => {
          this.toastr.success('News has been edited successfully');
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.toastr.error(error.error.message, 'Error when editing news');
          console.error('Error updating task:', error);
        }
      });
      });
  }

  onFileSelected(event: any): void {
    this.selectedImages = []
    const files = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        this.selectedImages.push(files[i]);
      }
    }
  }
}
