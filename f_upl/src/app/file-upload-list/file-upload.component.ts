import { Component, OnInit } from '@angular/core';
import { FileService } from '../file.service';
import { saveAs } from 'file-saver';//we need to install 'file-saver' from npm as -> npm install file-saver

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit{
  selectedFile: File | null = null;
  msg='';
  msgF='';
isValidFileType=true;
 files: any[] = [];
 index:number=1;
  constructor(private fileService: FileService) {}

  //list of files
  ngOnInit(): void {

    const token='eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzaXZhYmFidUBnbWFpbC5jb20iLCJpYXQiOjE3MDExNDQ3MTEsImV4cCI6MTcwMTE2MjcxMX0.8y2kDD6E-p87LtMFpNduAwKNTQuHHJF-SLQ9UabECzoiqQQ0evgdgfMwaKR1it52U_ytWtNcA0P6LTTYLFbW7g';
    localStorage.setItem('token',token);

    this.fileService.getFiles().subscribe(
      (response: any) => {
        console.log(response.response.data);
        this.files = response.response.data;
      },
      (error) => {
        console.error(error);
        
      }
    );
  }

  //downloading file
  downloadFile(fileName: string) {
    this.fileService.downloadFile(fileName).subscribe(
      (response:any) => {
        const blob = new Blob([response], { type: response.type });
        saveAs(blob, fileName);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  //uploading a file

  onFileSelect(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      if (
        this.selectedFile.type !== 'application/vnd.ms-excel' &&
        this.selectedFile.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ) {

       this.isValidFileType=false;
       console.error('Invalid file type. Only XLS and XLSX files are allowed.');

       // this.selectedFile = null;
       // this.msg='Only XLS and XLSX files are allowed'  
      }
      else{
        this.isValidFileType=true;
      }
    }
  }

  onSubmit() {
    if (this.selectedFile) {
      this.fileService.uploadFile(this.selectedFile).subscribe(
        (response) => {
          console.log(response);
          if(response.errorCode===20){
          this.msg=response.message;
          this.msgF='';
          }
          else if(response.errorCode===302){
            this.msgF=response.message;
            this.msg='';
          }
          else if(response.errorCode===51){
            this.msgF=response.message;
            this.msg='';
          }
          else{
            this.msgF='File upload failed!';
            this.msg='';
          }

          //updating file-list
          this.fileService.getFiles().subscribe(
            (response: any) => {
              this.files = response.response.data;
            })
        },
        
        (error) => {
          console.error(error);
          // if(error.status===302){
          //   this.msgF='File with same "NAME" already exist!';
          //   this.msg='';
          // }
          // else{
             this.msgF='File upload failed!';
             this.msg='';
          // }
        }
      );
    }
    
  }
  
}
