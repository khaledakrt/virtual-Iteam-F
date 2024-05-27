import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyVmsComponent } from './my-vms/my-vms.component';

const routes: Routes = [
  {path:'',component:MyVmsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyVmsRoutingModule { }
