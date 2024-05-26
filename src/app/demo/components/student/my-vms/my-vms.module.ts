import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyVmsRoutingModule } from './my-vms-routing.module';
import { MyVmsComponent } from './my-vms/my-vms.component';


@NgModule({
  declarations: [
    MyVmsComponent
  ],
  imports: [
    CommonModule,
    MyVmsRoutingModule
  ]
})
export class MyVmsModule { }
