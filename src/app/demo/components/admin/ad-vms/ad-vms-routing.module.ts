import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdVmsComponent } from './ad-vms/ad-vms.component';

const routes: Routes = [  {path:'',component:AdVmsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdVmsRoutingModule { }
