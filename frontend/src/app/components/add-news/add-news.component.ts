import { Component } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { PhotoUploadService } from '../../services/photo-upload.service';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-add-news',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './add-news.component.html',
  styleUrl: './add-news.component.css'
})
export class AddNewsComponent {
  newNews: any = { title: '', author: '', date: '', description: ''};
  selectedImages: File[] = [];

  constructor(private newsService: NewsService, private toastr: ToastrService, private photoUploadService: PhotoUploadService) { }

  addNews(): void {
    if (this.selectedImages.length === 0) {
      this.toastr.error('No images selected');
      return;
    }

    // Создаем новый FormData объект для передачи данных на сервер
    const formData = new FormData();
    formData.append('title', this.newNews.title);
    formData.append('author', this.newNews.author);
    formData.append('date', this.newNews.date);
    formData.append('description', this.newNews.description);
    
    // Добавляем каждое изображение в FormData
    this.selectedImages.forEach((image) => {
      formData.append('images', image);
    });

    // Вызываем метод сервиса для загрузки изображений
    this.photoUploadService.uploadPhotos(this.selectedImages)
      .pipe(
        catchError((error) => {
          this.toastr.error(error.error.message, 'Error uploading images');
          console.error('Error uploading images:', error);
          throw error; 
        })
      )
      .subscribe((response) => {
        // Получаем массив путей к загруженным изображениям и сохраняем его в объекте проекта
        this.newNews.imageUrls = response.imagePaths;
        
        // Вызываем метод сервиса для добавления проекта
        this.newsService.addNews(this.newNews)
          .pipe(
            catchError((error) => {
              this.toastr.error(error.error.message, 'Error adding news');
              console.error('Error adding news:', error);
              throw error; 
            })
          )
          .subscribe(() => {
            this.toastr.success('News added successfully');
            // Очищаем форму и выбранные изображения
            this.newNews = { title: '', author: '', date: '', description: ''};
            this.selectedImages = [];
          });
      });
  }

  // Обработчик события выбора изображений
  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Добавляем выбранные изображения в массив
      for (let i = 0; i < files.length; i++) {
        this.selectedImages.push(files[i]);
      }
    }
  }

}
