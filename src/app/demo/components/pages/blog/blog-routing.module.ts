import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog.component';

const routes: Routes = [
  { path: '', component: BlogComponent }

];

@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: BlogComponent }
	])],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
