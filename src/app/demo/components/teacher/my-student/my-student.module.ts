import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyStudentsComponent } from './my-students/my-students.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { MyStudentRoutingModule } from './my-student-routing.module';
import { MessageService } from 'primeng/api'; // Import MessageService

@NgModule({
  declarations: [
    MyStudentsComponent
  ],
  imports: [
    CommonModule,
    MyStudentRoutingModule,
    DropdownModule,
    FormsModule,
    ToolbarModule,
    ToastModule
  ],
  providers: [
    MessageService // Ajouter MessageService aux providers
  ]
})
export class MyStudentModule { }
