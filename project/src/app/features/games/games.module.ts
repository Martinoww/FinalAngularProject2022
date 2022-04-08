import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GamesPageComponent } from './games-page/games-page.component';
import { GamesRoutingModule } from './games-routing.module';
import { MyGamesComponent } from './my-games/my-games.component';
import { GameDetailPageComponent } from './game-detail-page/game-detail-page.component';
import { RouterModule } from '@angular/router';
import { CreateGamePageComponent } from './create-game-page/create-game-page.component';
import { EditGamePageComponent } from './edit-game-page/edit-game-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    GamesPageComponent,
       MyGamesComponent,
       GameDetailPageComponent,
       CreateGamePageComponent,
       EditGamePageComponent,
      ],
      imports: [
        CommonModule,
        GamesRoutingModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        MatProgressSpinnerModule,
  ]
})
export class GamesModule { }
