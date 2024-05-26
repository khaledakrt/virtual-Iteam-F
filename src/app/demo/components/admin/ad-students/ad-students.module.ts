import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdStudentsRoutingModule } from './ad-students-routing.module';
import { AdStudentsComponent } from './ad-students/ad-students.component';


@NgModule({
  declarations: [
    AdStudentsComponent
  ],
  imports: [
    CommonModule,
    AdStudentsRoutingModule
  ]
})
export class AdStudentsModule { }
