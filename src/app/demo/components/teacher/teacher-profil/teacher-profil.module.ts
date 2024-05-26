import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherProfilRoutingModule } from './teacher-profil-routing.module';
import { TeacherProfilComponent } from './teacher-profil/teacher-profil.component';


@NgModule({
  declarations: [
    TeacherProfilComponent
  ],
  imports: [
    CommonModule,
    TeacherProfilRoutingModule
  ]
})
export class TeacherProfilModule { }
