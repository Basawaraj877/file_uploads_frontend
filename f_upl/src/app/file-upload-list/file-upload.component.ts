import { Component, OnInit } from '@angular/core';
import { FileService } from '../file.service';
import { saveAs } from 'file-saver';

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

  constructor(private fileService: FileService) {}

  //list of files
  ngOnInit(): void {
    this.fileService.getFiles().subscribe(
      (data: any) => {
        this.files = data;
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
       // this.selectedFile = null;
        console.error('Invalid file type. Only XLS and XLSX files are allowed.');
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
          this.msg='File uploaded successfully...'
          this.msgF='';
          

          //updating file-list
          this.fileService.getFiles().subscribe(
            (data: any) => {
              this.files = data;
            })
        },
        
        (error) => {
          console.error(error);
          if(error.status===302){
            this.msgF='File with same "NAME" already exist!';
            this.msg='';
          }
          else{
            this.msgF='File upload failed!';
            this.msg='';
          }
        }
      );
    }
    
  }
  
}
