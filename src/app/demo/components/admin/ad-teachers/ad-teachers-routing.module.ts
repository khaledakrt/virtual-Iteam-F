import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdTeachersComponent } from './ad-teachers/ad-teachers.component';

const routes: Routes = [
  {path:'',component:AdTeachersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdTeachersRoutingModule { }
