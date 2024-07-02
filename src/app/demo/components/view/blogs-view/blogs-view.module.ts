import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogsViewRoutingModule } from './blogs-view-routing.module';
import { BlogsViewComponent } from './blogs-view.component';


@NgModule({
  declarations: [
    BlogsViewComponent
  ],
  imports: [
    CommonModule,
    BlogsViewRoutingModule
  ]
})
export class BlogsViewModule { }
