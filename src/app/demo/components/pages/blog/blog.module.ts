import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillService } from 'ngx-quill';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
@NgModule({
  declarations: [
    BlogComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    QuillModule.forRoot(),
    FormsModule, // Import FormsModule if you're using ngModel
    TableModule,
    FileUploadModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,StyleClassModule,
 
   
    InputTextModule,
  
   
    DialogModule


  ]
})
export class BlogModule { }
