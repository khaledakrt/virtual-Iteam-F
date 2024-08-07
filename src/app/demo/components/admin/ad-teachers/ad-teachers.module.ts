import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdTeachersComponent } from './ad-teachers/ad-teachers.component';
import { AdTeachersRoutingModule } from './ad-teachers-routing.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect'; // Added MultiSelectModule
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AdTeachersComponent
  ],
  imports: [
    CommonModule,
    AdTeachersRoutingModule,
    ConfirmDialogModule,
    FormsModule,
    DialogModule,
    TableModule,
    ButtonModule,
    ToastModule,
    ToolbarModule,
    InputTextModule,
    CheckboxModule,
    RippleModule,
    DropdownModule,
    MultiSelectModule // Added MultiSelectModule to import
  ],
  providers: [MessageService],
  bootstrap: [AdTeachersComponent] // Corrected bootstrap component
})
export class AdTeachersModule { }
