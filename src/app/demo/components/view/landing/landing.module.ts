import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { StyleClassModule } from 'primeng/styleclass';
import { DividerModule } from 'primeng/divider';
import { ChartModule } from 'primeng/chart';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { ScrollToTopComponent } from '../../pages/partials/scroll-to-top/scroll-to-top.component';
import { CarouselModule } from 'primeng/carousel';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    imports: [
        CommonModule,
        LandingRoutingModule,
        DividerModule,
        StyleClassModule,
        ChartModule,
        PanelModule,
        ButtonModule,CarouselModule,FormsModule ,ReactiveFormsModule,    MatDialogModule,


    ],
    
    declarations: [LandingComponent,ScrollToTopComponent],
    exports:[ScrollToTopComponent],
})
export class LandingModule { }
