import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VmRequestRoutingModule } from './vm-request-routing.module';
import { VmRequestComponent } from './vm-request/vm-request.component';


@NgModule({
  declarations: [
    VmRequestComponent
  ],
  imports: [
    CommonModule,
    VmRequestRoutingModule
  ]
})
export class VmRequestModule { }
