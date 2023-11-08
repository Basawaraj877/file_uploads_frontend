import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileUploadComponent } from './file-upload-list/file-upload.component';
//import { FileListComponent } from './file-list/file-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FileService } from './file.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule


@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    //FileListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [FileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
