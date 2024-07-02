import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersListRoutingModule } from './teachers-list-routing.module';
import { TeachersListComponent } from './teachers-list/teachers-list.component';


@NgModule({
  declarations: [
    TeachersListComponent
  ],
  imports: [
    CommonModule,
    TeachersListRoutingModule
  ]
})
export class TeachersListModule { }
