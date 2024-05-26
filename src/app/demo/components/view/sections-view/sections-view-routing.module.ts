import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionsViewComponent } from './sections-view.component';

const routes: Routes = [ { path: '', component: SectionsViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectionsViewRoutingModule { }
