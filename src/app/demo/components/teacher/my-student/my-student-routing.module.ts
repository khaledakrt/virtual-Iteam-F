import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyStudentsComponent } from './my-students/my-students.component';

const routes: Routes = [
  {path:'',component:MyStudentsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyStudentRoutingModule { }
