import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from '../pages/home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { ContactsPageComponent } from './contacts-page/contacts-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { PagesRoutingModule } from './pages-routing.module';



@NgModule({
  declarations: [
    HomePageComponent,
    ContactsPageComponent,
    NotFoundPageComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    RouterModule
  ]
})
export class PagesModule { }
