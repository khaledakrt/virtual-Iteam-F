import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { AppLayoutModule } from 'src/app/layout/app.layout.module';


@NgModule({
  declarations: [
    TeacherDashboardComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,AppLayoutModule
  ],

  
})
export class TeacherModule { }
