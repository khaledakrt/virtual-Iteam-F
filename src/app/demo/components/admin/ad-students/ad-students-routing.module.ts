import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdStudentsComponent } from './ad-students/ad-students.component';

const routes: Routes = [  {path:'',component:AdStudentsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdStudentsRoutingModule { }
