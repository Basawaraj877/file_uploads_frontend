import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private apiUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('f', file, file.name);

    return this.http.post(`${this.apiUrl}/files/upload`, formData);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/files/getFiles`);
  }

  
  downloadFile(fileName: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/files/download/${fileName}`, {
      responseType: 'blob',
    });
  }
}
