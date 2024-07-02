// ad-add-users-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdAddUsersComponent } from './ad-add-users/ad-add-users.component';

const routes: Routes = [ { path: '', component: AdAddUsersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdAddUsersRoutingModule { }
