import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private apiUrl = 'http://localhost:8383'; 

  constructor(private http: HttpClient) {}
  
  //creating headers
   getHeaders():HttpHeaders{
    const token=localStorage.getItem('token');
    return new HttpHeaders().set('Authorization',`Bearer ${token}`);
   }

  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('f', file, file.name);
    
    const headers=this.getHeaders();

    return this.http.post(`${this.apiUrl}/files/upload`, formData,{headers});
  }

  getFiles(): Observable<any> {

  //  let token=localStorage.getItem('token');
  //  const headerOption={
  //   headers:new HttpHeaders({
  //     'Authorization':'Bearer '+token
  //   })
  //  }
  const headers=this.getHeaders();
    return this.http.get(`${this.apiUrl}/files/getFiles`,{headers});
  }

  
  downloadFile(fileName: string): Observable<Blob> {
    const headers=this.getHeaders();
    
    return this.http.get(`${this.apiUrl}/files/download/${fileName}`, {
      responseType: 'blob',headers
    });
  }
}
