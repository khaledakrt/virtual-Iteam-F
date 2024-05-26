import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentProfilComponent } from './student-profil/student-profil.component';

const routes: Routes = [
  {path:'',component:StudentProfilComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentProfilRoutingModule { }
