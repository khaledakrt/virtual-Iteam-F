import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyStudentRoutingModule } from './my-student-routing.module';
import { MyStudentsComponent } from './my-students/my-students.component';


@NgModule({
  declarations: [
    MyStudentsComponent
  ],
  imports: [
    CommonModule,
    MyStudentRoutingModule
  ]
})
export class MyStudentModule { }
