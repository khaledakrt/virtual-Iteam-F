// ad-add-users-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdRequestsComponent } from './ad-requests/ad-requests.component';

const routes: Routes = [ { path: '', component: AdRequestsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdRequestsRoutingModule { }
