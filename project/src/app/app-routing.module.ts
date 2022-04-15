import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedGuard } from './core/guards/logged.guard';
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
  path: 'games',
  loadChildren: () => import('./features/games/games.module').then(m => m.GamesModule),
},
{
  path: 'user',
  loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  canLoad: [LoggedGuard]
},
{
  path: 'home',
  loadChildren: () => import('./features/pages/pages.module').then(m => m.PagesModule),
},
{
  path: "**",
  component: NotFoundPageComponent,
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
