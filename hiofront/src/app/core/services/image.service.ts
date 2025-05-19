import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private IMGUR_UPLOAD_URL = 'https://api.imgur.com/3/image';
  private CLIENT_ID = '2628b8a518c0e20'; 

  constructor(private http: HttpClient) {}

  uploadImage(file: File) {
      const formData = new FormData();
      formData.append('image', file);
  
      return this.http.post<any>('http://localhost:8080/api/images/upload', formData).pipe(
        map(res => res.data.link) // res.data.link — это Imgur-ссылка от Spring Boot
    );
  }
}
