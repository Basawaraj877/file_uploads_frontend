import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { FileListComponent } from './file-list/file-list.component';
//import { FileUploadComponent } from './file-upload/file-upload.component';

const routes: Routes = [
  //{ path: 'upload', component: FileUploadComponent },
 // { path: 'list', component: FileListComponent },
  //{ path: '', redirectTo: '/upload', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
