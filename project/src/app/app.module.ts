import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { HeaderComponent } from './core/header/header.component';
import { GamesRoutingModule } from './features/games/games-routing.module';
import { GamesModule } from './features/games/games.module';
import { PagesModule } from './features/pages/pages.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GamesModule,
    GamesRoutingModule,
    AuthRoutingModule,
    AppRoutingModule,
    RouterModule,
    CoreModule,
    PagesModule,
    AuthModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent,
    HeaderComponent
  ]
})
export class AppModule { }
