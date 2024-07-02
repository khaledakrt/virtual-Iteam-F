import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { AppLayoutModule } from 'src/app/layout/app.layout.module';


@NgModule({
  declarations: [
    
    StudentDashboardComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,AppLayoutModule
  ]
})
export class StudentModule { }
