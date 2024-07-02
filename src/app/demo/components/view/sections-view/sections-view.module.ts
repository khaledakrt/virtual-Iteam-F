import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionsViewRoutingModule } from './sections-view-routing.module';
import { SectionsViewComponent } from './sections-view.component';
import { StyleClassModule } from 'primeng/styleclass';
import { DividerModule } from 'primeng/divider';
import { ChartModule } from 'primeng/chart';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { LandingModule } from '../landing/landing.module';


@NgModule({
  declarations: [
    SectionsViewComponent
  ],
  imports: [
    CommonModule,
    SectionsViewRoutingModule,
    ButtonModule,
    PanelModule,
    ChartModule,
    DividerModule,
    StyleClassModule,LandingModule
  ]
})
export class SectionsViewModule { }
