import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdTeachersRoutingModule } from './ad-teachers-routing.module';
import { AdTeachersComponent } from './ad-teachers/ad-teachers.component';


@NgModule({
  declarations: [
    AdTeachersComponent
  ],
  imports: [
    CommonModule,
    AdTeachersRoutingModule
  ]
})
export class AdTeachersModule { }
