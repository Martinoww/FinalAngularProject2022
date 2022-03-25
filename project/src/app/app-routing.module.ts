import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsPageComponent } from './features/pages/contacts-page/contacts-page.component';
import { HomePageComponent } from './features/pages/home-page/home-page.component';
import { NotFoundPageComponent } from './features/pages/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
},
{
    path: 'home',
    component: HomePageComponent
},
{
    path: 'contacts',
    component: ContactsPageComponent
},
{
    path: '**',
    component: NotFoundPageComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
