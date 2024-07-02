import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdGroupsComponent } from './ad-groups/ad-groups.component';

const routes: Routes = [{path:'',component:AdGroupsComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AdGroupsRoutingModule { }
