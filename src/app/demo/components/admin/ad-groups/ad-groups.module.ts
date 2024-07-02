import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdGroupsComponent } from './ad-groups/ad-groups.component';
import { AdGroupsRoutingModule } from './ad-groups-routing.module';
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
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AdGroupsComponent
  ],
  imports: [
    CommonModule,
    AdGroupsRoutingModule,
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
    DropdownModule
  ],
  providers: [MessageService],
  bootstrap: [AdGroupsComponent] // Corrected bootstrap component
})
export class AdGroupsModule { }
