import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdVmsRoutingModule } from './ad-vms-routing.module';
import { AdVmsComponent } from './ad-vms/ad-vms.component';


@NgModule({
  declarations: [
    AdVmsComponent
  ],
  imports: [
    CommonModule,
    AdVmsRoutingModule
  ]
})
export class AdVmsModule { }
