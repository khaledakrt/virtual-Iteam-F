import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { ScrollToTopComponent } from './partials/scroll-to-top/scroll-to-top.component';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

@NgModule({
    declarations: [
  ],
  exports:[],

    imports: [
        CommonModule,
        PagesRoutingModule,
        FormsModule, // Import FormsModule
        QuillModule.forRoot(),
    ]
})
export class PagesModule { }
