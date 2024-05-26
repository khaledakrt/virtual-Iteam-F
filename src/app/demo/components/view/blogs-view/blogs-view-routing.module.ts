import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsViewComponent } from './blogs-view.component';

const routes: Routes = [
  { path: '', component: BlogsViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogsViewRoutingModule { }
