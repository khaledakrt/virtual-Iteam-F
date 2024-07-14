import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersListRoutingModule } from './teachers-list-routing.module';
import { TeachersListComponent } from './teachers-list/teachers-list.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api'; // Import MessageService

@NgModule({
  declarations: [
    TeachersListComponent
  ],
  imports: [
    CommonModule,
    TeachersListRoutingModule,
    DropdownModule,
    FormsModule,
    ToolbarModule,
    ToastModule
  ],
  providers: [
    MessageService  // Ensure MessageService is provided here
  ]
})
export class TeachersListModule { }
