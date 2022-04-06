import { Component, OnInit } from '@angular/core';
import { IGame } from 'src/app/core/interfaces';
import { GameService } from '../../../core/services/game.service';

@Component({
  selector: 'app-games-page',
  templateUrl: './games-page.component.html',
  styleUrls: ['./games-page.component.css']
})
export class GamesPageComponent implements OnInit {

  games: IGame[];

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.loadGames().subscribe(gameList => {
        this.games = gameList['results'];
    })
  }

}
