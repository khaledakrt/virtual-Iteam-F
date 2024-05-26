import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentProfilRoutingModule } from './student-profil-routing.module';
import { StudentProfilComponent } from './student-profil/student-profil.component';


@NgModule({
  declarations: [
    StudentProfilComponent
  ],
  imports: [
    CommonModule,
    StudentProfilRoutingModule
  ]
})
export class StudentProfilModule { }
