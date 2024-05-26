import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { AuthDialogComponent } from './demo/components/view/auth-dialog/auth-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TeacherModule } from './demo/components/teacher/teacher.module';
import { StudentModule } from './demo/components/student/student.module';
import { AdminModule } from './demo/components/admin/admin.module';

@NgModule({
    declarations: [
        AppComponent,
        AuthDialogComponent,
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,  TeacherModule,StudentModule,AdminModule, ReactiveFormsModule, BrowserAnimationsModule ,    MatDialogModule,


    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,    
        PhotoService, ProductService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
