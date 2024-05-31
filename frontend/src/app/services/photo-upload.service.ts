import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoUploadService {
  private apiUrl = 'http://localhost:3000/upload';

  constructor(private http: HttpClient) { }

  uploadPhotos(images: File[]): Observable<any> {
    const formData = new FormData();
    // Добавляем каждое изображение в FormData
    images.forEach((image) => {
      formData.append('images', image);
    });
    return this.http.post<any>(this.apiUrl, formData);
  }
}
